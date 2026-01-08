<?php
/**
 * 予約作成API
 * horita@とnakabachi@のカレンダーに予定を追加
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
    $startTime = new DateTime($input['datetime']);
    $endTime = clone $startTime;
    $endTime->modify('+' . SLOT_DURATION_MINUTES . ' minutes');
    
    // Google Clientの初期化
    $client = getGoogleClient();
    $service = new Google_Service_Calendar($client);
    
    // イベントの作成
    $event = new Google_Service_Calendar_Event([
        'summary' => 'AIキャリア診断セッション',
        'description' => createEventDescription($input),
        'start' => [
            'dateTime' => $startTime->format(DateTime::RFC3339),
            'timeZone' => 'Asia/Tokyo',
        ],
        'end' => [
            'dateTime' => $endTime->format(DateTime::RFC3339),
            'timeZone' => 'Asia/Tokyo',
        ],
        'attendees' => [
            ['email' => $input['email']],
            ['email' => CALENDAR_HORITA],
            ['email' => CALENDAR_NAKABACHI],
        ],
        'conferenceData' => [
            'createRequest' => [
                'requestId' => uniqid(),
                'conferenceSolutionKey' => [
                    'type' => 'hangoutsMeet',
                ],
            ],
        ],
        'reminders' => [
            'useDefault' => false,
            'overrides' => [
                ['method' => 'email', 'minutes' => 24 * 60],
                ['method' => 'popup', 'minutes' => 30],
            ],
        ],
    ]);
    
    // horita@のカレンダーに追加
    $horitaEvent = $service->events->insert(
        CALENDAR_HORITA,
        $event,
        ['conferenceDataVersion' => 1, 'sendUpdates' => 'all']
    );
    
    // nakabachi@のカレンダーに追加
    $nakabachiEvent = $service->events->insert(
        CALENDAR_NAKABACHI,
        $event,
        ['conferenceDataVersion' => 1, 'sendUpdates' => 'all']
    );
    
    // Google Meetリンクを取得
    $meetLink = $horitaEvent->getHangoutLink() ?? '';
    
    sendJsonResponse([
        'success' => true,
        'message' => '予約が完了しました',
        'booking' => [
            'datetime' => $startTime->format('Y年m月d日 H:i'),
            'meetLink' => $meetLink,
            'eventId' => $horitaEvent->getId(),
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
    $description = "【予約者情報】\n";
    $description .= "お名前: {$input['name']}\n";
    $description .= "メールアドレス: {$input['email']}\n";
    $description .= "電話番号: {$input['phone']}\n";
    
    if (!empty($input['message'])) {
        $description .= "\n【メッセージ】\n";
        $description .= $input['message'];
    }
    
    return $description;
}
