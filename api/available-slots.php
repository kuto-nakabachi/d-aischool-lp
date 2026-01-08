<?php
/**
 * 空き時間取得API
 * 共有された複数カレンダーの空き時間を統合して返す
 */

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

setCorsHeaders();

try {
    // Google Clientの初期化
    $client = getGoogleClient();
    $service = new Google_Service_Calendar($client);
    
    // 期間設定（今日から30日）
    $timeMin = new DateTime('today', new DateTimeZone(APP_TIMEZONE));
    $timeMax = new DateTime('+' . BOOKING_DAYS_AHEAD . ' days', new DateTimeZone(APP_TIMEZONE));
    $now = new DateTime('now', new DateTimeZone(APP_TIMEZONE));
    
    // 各カレンダーのイベント取得
    $calendarEvents = [];
    foreach (BOOKING_CALENDARS as $calendarId) {
        $calendarEvents[$calendarId] = getCalendarEvents($service, $calendarId, $timeMin, $timeMax);
    }
    
    // 空き時間スロットを計算
    $availableSlots = calculateAvailableSlots($calendarEvents, $timeMin, $timeMax, $now);
    
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
        if ($event->transparency === 'transparent') {
            continue;
        }
        
        $timezone = new DateTimeZone(APP_TIMEZONE);
        
        if ($event->start->dateTime) {
            $start = new DateTime($event->start->dateTime, $timezone);
            $end = new DateTime($event->end->dateTime, $timezone);
        } else {
            // 終日予定は1日すべて埋まっている扱いにする
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
 * 空き時間スロットを計算
 */
function calculateAvailableSlots($calendarEvents, $timeMin, $timeMax, $now) {
    $slots = [];
    $currentDate = clone $timeMin;
    
    while ($currentDate <= $timeMax) {
        $dayOfWeek = (int)$currentDate->format('N');
        
        // 営業日のみ処理
        if (in_array($dayOfWeek, BUSINESS_DAYS)) {
            $daySlots = generateDaySlots($currentDate, $calendarEvents, $now);
            
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
function generateDaySlots($date, $calendarEvents, $now) {
    $slots = [];
    $slotStart = clone $date;
    $slotStart->setTime(BUSINESS_START_HOUR, 0, 0);
    
    $dayEnd = clone $date;
    $dayEnd->setTime(BUSINESS_END_HOUR, 0, 0);
    
    while ($slotStart < $dayEnd) {
        $slotEnd = clone $slotStart;
        $slotEnd->modify('+' . SLOT_DURATION_MINUTES . ' minutes');
        
        // 当日の過去時間は除外
        if ($slotStart <= $now) {
            $slotStart = $slotEnd;
            continue;
        }
        
        $assignedCalendar = pickCalendarForSlot(BOOKING_CALENDARS, $slotStart);
        $assignedEvents = $calendarEvents[$assignedCalendar] ?? [];
        
        if (!isSlotOccupied($slotStart, $slotEnd, $assignedEvents)) {
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

/**
 * スロットごとの担当カレンダーを決める（疑似ランダム）
 */
function pickCalendarForSlot($calendarIds, $slotStart) {
    $seed = BOOKING_SLOT_SEED . '|' . $slotStart->format(DateTime::RFC3339);
    $hash = hash('sha256', $seed);
    $index = hexdec(substr($hash, 0, 8)) % count($calendarIds);
    return $calendarIds[$index];
}
