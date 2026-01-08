<?php
/**
 * 予約作成API
 * 空いている担当者のカレンダーに予定を追加
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();

// POSTリクエストのみ受け付ける
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse([
        'success' => false,
        'error' => 'POSTリクエストのみ受け付けます',
    ], 405);
}

try {
    // リクエストボディを取得
    $input = json_decode(file_get_contents('php://input'), true);
    
    // バリデーション
    $requiredFields = ['datetime', 'name', 'email', 'phone'];
    foreach ($requiredFields as $field) {
        if (empty($input[$field])) {
            sendJsonResponse([
                'success' => false,
                'error' => "必須項目が不足しています: $field",
            ], 400);
        }
    }
    
    // 日時のパース
    $startTime = new DateTime($input['datetime'], new DateTimeZone(APP_TIMEZONE));
    $endTime = clone $startTime;
    $endTime->modify('+' . SLOT_DURATION_MINUTES . ' minutes');
    $now = new DateTime('now', new DateTimeZone(APP_TIMEZONE));
    
    if ($startTime <= $now) {
        sendJsonResponse([
            'success' => false,
            'error' => '過去の時間は予約できません',
        ], 400);
    }
    
    // Google Clientの初期化
    $client = getGoogleClient();
    if (!empty(GOOGLE_DELEGATED_USER)) {
        $client->setSubject(GOOGLE_DELEGATED_USER);
    }
    $service = new Google_Service_Calendar($client);
    
    // スロットに割り当てる担当カレンダーを決定
    $targetCalendar = pickCalendarForSlot(BOOKING_CALENDARS, $startTime);
    if (!isCalendarAvailable($service, $targetCalendar, $startTime, $endTime)) {
        sendJsonResponse([
            'success' => false,
            'error' => 'この時間はすでに予約されています',
        ], 409);
    }
    
    $inviteAttendees = !empty(GOOGLE_DELEGATED_USER);
    
    // イベントの作成
    $event = new Google_Service_Calendar_Event([
        'summary' => "【無料】AIキャリア診断 {$input['name']}",
        'description' => createEventDescription($input),
        'start' => [
            'dateTime' => $startTime->format(DateTime::RFC3339),
            'timeZone' => APP_TIMEZONE,
        ],
        'end' => [
            'dateTime' => $endTime->format(DateTime::RFC3339),
            'timeZone' => APP_TIMEZONE,
        ],
        'attendees' => $inviteAttendees ? [
            ['email' => $input['email']],
        ] : [],
        'reminders' => [
            'useDefault' => false,
            'overrides' => [
                ['method' => 'email', 'minutes' => 24 * 60],
                ['method' => 'popup', 'minutes' => 30],
            ],
        ],
    ]);
    
    if ($inviteAttendees) {
        $conference = new Google_Service_Calendar_ConferenceData();
        $createRequest = new Google_Service_Calendar_CreateConferenceRequest();
        $solutionKey = new Google_Service_Calendar_ConferenceSolutionKey();
        $solutionKey->setType('hangoutsMeet');
        $createRequest->setRequestId(uniqid());
        $createRequest->setConferenceSolutionKey($solutionKey);
        $conference->setCreateRequest($createRequest);
        $event->setConferenceData($conference);
    }
    
    // 予約対象のカレンダーに追加
    $insertOptions = ['conferenceDataVersion' => 1];
    if ($inviteAttendees) {
        $insertOptions['sendUpdates'] = 'all';
    }
    
    $createdEvent = $service->events->insert(
        $targetCalendar,
        $event,
        $insertOptions
    );
    
    // Google Meetリンクを取得
    $meetLink = $createdEvent->getHangoutLink() ?? '';
    $calendarLink = createCalendarTemplateLink($input, $startTime, $endTime, $meetLink);
    
    // 招待が送れない場合は予約者へ案内メール送信
    if (!$inviteAttendees) {
        sendBookingConfirmationEmail($input['email'], $input, $startTime, $endTime, $meetLink, $calendarLink);
    }
    
    // 担当者へ通知メール送信
    sendBookingNotificationEmail($targetCalendar, $input, $startTime, $endTime, $meetLink);
    
    sendJsonResponse([
        'success' => true,
        'message' => '予約が完了しました',
        'booking' => [
            'datetime' => $startTime->format(DateTime::RFC3339),
            'endDatetime' => $endTime->format(DateTime::RFC3339),
            'meetLink' => $meetLink,
            'calendarLink' => $calendarLink,
            'eventId' => $createdEvent->getId(),
        ],
    ]);
    
} catch (Exception $e) {
    logError('予約作成エラー: ' . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'error' => '予約の作成に失敗しました',
    ], 500);
}

/**
 * イベントの説明文を作成
 */
function createEventDescription($input) {
    $message = trim($input['message'] ?? '');
    return "お名前：{$input['name']}\n" .
        "メールアドレス：{$input['email']}\n" .
        "電話番号：{$input['phone']}\n" .
        "ご質問・ご要望：{$message}";
}

/**
 * 空き状況を確認して空いているカレンダーを返す
 */
function isCalendarAvailable($service, $calendarId, $startTime, $endTime) {
    $events = getCalendarEvents($service, $calendarId, $startTime, $endTime);
    return !isSlotOccupied($startTime, $endTime, $events);
}

/**
 * カレンダーからイベントを取得
 */
function getCalendarEvents($service, $calendarId, $timeMin, $timeMax) {
    $optParams = [
        'orderBy' => 'startTime',
        'singleEvents' => true,
        'timeMin' => $timeMin->format(DateTime::RFC3339),
        'timeMax' => $timeMax->format(DateTime::RFC3339),
    ];
    
    $results = $service->events->listEvents($calendarId, $optParams);
    $events = [];
    
    foreach ($results->getItems() as $event) {
        if ($event->transparency === 'transparent') {
            continue;
        }
        
        $timezone = new DateTimeZone(APP_TIMEZONE);
        
        if ($event->start->dateTime) {
            $start = new DateTime($event->start->dateTime, $timezone);
            $end = new DateTime($event->end->dateTime, $timezone);
        } else {
            $start = new DateTime($event->start->date, $timezone);
            $end = new DateTime($event->end->date, $timezone);
        }
        
        $events[] = [
            'start' => $start,
            'end' => $end,
        ];
    }
    
    return $events;
}

/**
 * スロットが予定で埋まっているかチェック
 */
function isSlotOccupied($slotStart, $slotEnd, $events) {
    foreach ($events as $event) {
        if ($slotStart < $event['end'] && $slotEnd > $event['start']) {
            return true;
        }
    }
    return false;
}

/**
 * スロットごとの担当カレンダーを決める（疑似ランダム）
 */
function pickCalendarForSlot($calendarIds, $slotStart) {
    $seed = BOOKING_SLOT_SEED . '|' . $slotStart->format(DateTime::RFC3339);
    $hash = hash('sha256', $seed);
    $index = hexdec(substr($hash, 0, 8)) % count($calendarIds);
    return $calendarIds[$index];
}

/**
 * Googleカレンダー登録用リンクを作成
 */
function createCalendarTemplateLink($input, $startTime, $endTime, $meetLink) {
    $title = "【無料】AIキャリア診断 {$input['name']}";
    $details = createEventDescription($input);
    if (!empty($meetLink)) {
        $details .= "\n\nGoogle Meet: {$meetLink}";
    }
    
    $params = [
        'action' => 'TEMPLATE',
        'text' => $title,
        'dates' => $startTime->format('Ymd\\THis') . '/' . $endTime->format('Ymd\\THis'),
        'details' => $details,
        'location' => $meetLink,
        'ctz' => APP_TIMEZONE,
    ];
    
    return 'https://calendar.google.com/calendar/render?' . http_build_query($params);
}

/**
 * 担当者へ面談確定メールを送信
 */
function sendBookingNotificationEmail($to, $input, $startTime, $endTime, $meetLink) {
    $subject = '面談確定のお知らせ';
    $message = trim($input['message'] ?? '');
    $body = "以下の内容で面談が確定しました。\n\n";
    $body .= "日時：{$startTime->format('Y-m-d H:i')} 〜 {$endTime->format('H:i')}\n";
    $body .= "お名前：{$input['name']}\n";
    $body .= "メールアドレス：{$input['email']}\n";
    $body .= "電話番号：{$input['phone']}\n";
    $body .= "ご質問・ご要望：{$message}\n";
    if (!empty($meetLink)) {
        $body .= "\nGoogle Meet: {$meetLink}\n";
    }
    
    $headers = [
        'From: ' . NOTIFICATION_FROM_EMAIL,
        'Content-Type: text/plain; charset=UTF-8',
    ];
    
    if (function_exists('mb_send_mail')) {
        mb_language('Japanese');
        mb_internal_encoding('UTF-8');
        mb_send_mail($to, $subject, $body, implode("\r\n", $headers));
        return;
    }
    
    mail($to, $subject, $body, implode("\r\n", $headers));
}

/**
 * 予約者へ確認メールを送信
 */
function sendBookingConfirmationEmail($to, $input, $startTime, $endTime, $meetLink, $calendarLink) {
    $subject = 'ご予約ありがとうございます';
    $message = trim($input['message'] ?? '');
    $body = "ご予約が完了しました。\n\n";
    $body .= "日時：{$startTime->format('Y-m-d H:i')} 〜 {$endTime->format('H:i')}\n";
    $body .= "お名前：{$input['name']}\n";
    $body .= "メールアドレス：{$input['email']}\n";
    $body .= "電話番号：{$input['phone']}\n";
    $body .= "ご質問・ご要望：{$message}\n";
    if (!empty($meetLink)) {
        $body .= "\nGoogle Meet: {$meetLink}\n";
    }
    if (!empty($calendarLink)) {
        $body .= "Googleカレンダー登録: {$calendarLink}\n";
    }
    
    $headers = [
        'From: ' . NOTIFICATION_FROM_EMAIL,
        'Content-Type: text/plain; charset=UTF-8',
    ];
    
    if (function_exists('mb_send_mail')) {
        mb_language('Japanese');
        mb_internal_encoding('UTF-8');
        mb_send_mail($to, $subject, $body, implode("\r\n", $headers));
        return;
    }
    
    mail($to, $subject, $body, implode("\r\n", $headers));
}
