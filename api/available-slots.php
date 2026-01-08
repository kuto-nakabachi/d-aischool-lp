<?php
/**
 * 空き時間取得API
 * nakabachi@とkazuma@のスケジュールをマージして空き時間を返す
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();

try {
    // Google Clientの初期化
    $client = getGoogleClient();
    $service = new Google_Service_Calendar($client);
    
    // 期間設定（今日から1ヶ月）
    $timeMin = new DateTime('today');
    $timeMax = new DateTime('+' . BOOKING_DAYS_AHEAD . ' days');
    
    // nakabachi@のイベント取得
    $nakabachiEvents = getCalendarEvents($service, CALENDAR_NAKABACHI, $timeMin, $timeMax);
    
    // kazuma@のイベント取得
    $kazumaEvents = getCalendarEvents($service, CALENDAR_KAZUMA, $timeMin, $timeMax);
    
    // イベントをマージ
    $allEvents = array_merge($nakabachiEvents, $kazumaEvents);
    
    // 空き時間スロットを計算
    $availableSlots = calculateAvailableSlots($allEvents, $timeMin, $timeMax);
    
    sendJsonResponse([
        'success' => true,
        'slots' => $availableSlots,
        'period' => [
            'start' => $timeMin->format('Y-m-d'),
            'end' => $timeMax->format('Y-m-d'),
        ],
    ]);
    
} catch (Exception $e) {
    logError('空き時間取得エラー: ' . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'error' => 'スケジュールの取得に失敗しました',
    ], 500);
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
        $start = $event->start->dateTime ?: $event->start->date;
        $end = $event->end->dateTime ?: $event->end->date;
        
        // 終日イベントや透明度が設定されているイベントはスキップ
        if ($event->transparency === 'transparent' || !$event->start->dateTime) {
            continue;
        }
        
        $events[] = [
            'start' => new DateTime($start),
            'end' => new DateTime($end),
        ];
    }
    
    return $events;
}

/**
 * 空き時間スロットを計算
 */
function calculateAvailableSlots($events, $timeMin, $timeMax) {
    $slots = [];
    $currentDate = clone $timeMin;
    
    while ($currentDate <= $timeMax) {
        $dayOfWeek = (int)$currentDate->format('N');
        
        // 営業日のみ処理
        if (in_array($dayOfWeek, BUSINESS_DAYS)) {
            $daySlots = generateDaySlots($currentDate, $events);
            
            if (!empty($daySlots)) {
                $slots[$currentDate->format('Y-m-d')] = $daySlots;
            }
        }
        
        $currentDate->modify('+1 day');
    }
    
    return $slots;
}

/**
 * 1日分の空き時間スロットを生成
 */
function generateDaySlots($date, $events) {
    $slots = [];
    $slotStart = clone $date;
    $slotStart->setTime(BUSINESS_START_HOUR, 0, 0);
    
    $dayEnd = clone $date;
    $dayEnd->setTime(BUSINESS_END_HOUR, 0, 0);
    
    while ($slotStart < $dayEnd) {
        $slotEnd = clone $slotStart;
        $slotEnd->modify('+' . SLOT_DURATION_MINUTES . ' minutes');
        
        // このスロットが予定と重複していないかチェック
        if (!isSlotOccupied($slotStart, $slotEnd, $events)) {
            $slots[] = [
                'start' => $slotStart->format('H:i'),
                'end' => $slotEnd->format('H:i'),
                'datetime' => $slotStart->format(DateTime::RFC3339),
            ];
        }
        
        $slotStart = $slotEnd;
    }
    
    return $slots;
}

/**
 * スロットが予定で埋まっているかチェック
 */
function isSlotOccupied($slotStart, $slotEnd, $events) {
    foreach ($events as $event) {
        // イベントとスロットが重複しているかチェック
        if ($slotStart < $event['end'] && $slotEnd > $event['start']) {
            return true;
        }
    }
    
    return false;
}
