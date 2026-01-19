/**
 * 予約システム 型定義
 */

// 時間スロット
export interface TimeSlot {
  start: string;      // "10:00" 形式
  end: string;        // "11:00" 形式
  datetime: string;   // ISO 8601形式 "2024-01-15T10:00:00+09:00"
}

// 日付ごとの空きスロット
export interface AvailableSlots {
  [date: string]: TimeSlot[];  // キー: "2024-01-15" 形式
}

// 予約フォームデータ
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

// 予約結果
export interface BookingResult {
  datetime: string;
  endDatetime: string;
  meetLink?: string;        // オンライン会議URL（任意）
  calendarLink?: string;    // カレンダー登録URL（任意）
  eventId?: string;
}

// API レスポンス: 空きスロット取得
export interface AvailableSlotsResponse {
  success: boolean;
  slots?: AvailableSlots;
  period?: {
    start: string;
    end: string;
  };
  error?: string;
}

// API レスポンス: 予約作成
export interface CreateBookingResponse {
  success: boolean;
  message?: string;
  booking?: BookingResult;
  error?: string;
}
