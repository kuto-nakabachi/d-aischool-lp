<?php
/**
 * Google Calendar API設定ファイル
 */

// タイムゾーン設定
define('APP_TIMEZONE', 'Asia/Tokyo');
date_default_timezone_set(APP_TIMEZONE);

// カレンダーID
define('CALENDAR_NAKABACHI', 'nakabachi@decentralizedpro.io');
define('CALENDAR_KAZUMA', 'kazuma@decentralizedpro.io');
define('CALENDAR_HORITA', 'horita@decentralizedpro.io');

// 営業時間設定
define('BUSINESS_START_HOUR', 10);  // 10:00
define('BUSINESS_END_HOUR', 19);    // 19:00
define('SLOT_DURATION_MINUTES', 60); // 1時間単位

// 営業日設定（月曜日=1, 日曜日=7）
define('BUSINESS_DAYS', [1, 2, 3, 4, 5]); // 平日のみ

// 予約期間設定
define('BOOKING_DAYS_AHEAD', 30); // 今日から30日先まで予約可能

// 予約対象カレンダー
define('BOOKING_CALENDARS', [
    CALENDAR_HORITA,
    CALENDAR_NAKABACHI,
]);

// スロット選定のシード値（変更すると割当が変わります）
define('BOOKING_SLOT_SEED', 'booking-slot-v1');

// 認証情報ファイルパス
define('CREDENTIALS_PATH', __DIR__ . '/calendar-booking-system-483704-3ba0696aeab4.json');

// CORS設定
define('ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://yourdomain.com', // 本番環境のドメインに変更してください
]);

// エラーログ設定
define('ERROR_LOG_PATH', __DIR__ . '/error.log');

// 通知メール送信元（運用環境に合わせて変更）
define('NOTIFICATION_FROM_EMAIL', 'no-reply@example.com');

// ドメイン全体の委任を使う場合は対象ユーザーを指定（空の場合は招待を送らない）
define('GOOGLE_DELEGATED_USER', 'nakabachi@decentralizedpro.io');

/**
 * CORSヘッダーを設定
 */
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
    
    // OPTIONSリクエストの場合は終了
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

/**
 * エラーログを記録
 */
function logError($message) {
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message\n";
    error_log($logMessage, 3, ERROR_LOG_PATH);
}

/**
 * JSONレスポンスを返す
 */
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Google Calendar APIクライアントを初期化
 */
function getGoogleClient() {
    if (!file_exists(CREDENTIALS_PATH)) {
        throw new Exception('認証情報ファイルが見つかりません');
    }
    
    $client = new Google_Client();
    $client->setApplicationName('Calendar Booking System');
    $client->setScopes(Google_Service_Calendar::CALENDAR);
    $client->setAuthConfig(CREDENTIALS_PATH);
    
    return $client;
}
