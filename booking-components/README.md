# 予約システム コンポーネント

日程調整・予約機能のReactコンポーネント集です。

## 必要な依存パッケージ

```bash
npm install date-fns lucide-react
```

## ファイル構成

```
booking-components/
├── README.md              # このファイル
├── components/
│   ├── CalendarView.tsx      # カレンダーUI
│   ├── TimeSlotSelector.tsx  # 時間スロット選択
│   ├── BookingForm.tsx       # 予約フォーム
│   └── ConfirmationModal.tsx # 確認モーダル
├── types/
│   └── booking.ts            # 型定義
└── example/
    └── page.tsx              # 実装例
```

## 使い方

### 1. ファイルをコピー

`components/`, `types/` フォルダを自分のプロジェクトにコピーしてください。

### 2. 依存パッケージをインストール

```bash
npm install date-fns lucide-react
```

### 3. APIエンドポイントを設定

環境変数 `NEXT_PUBLIC_API_URL` でAPIのベースURLを設定します。

```env
NEXT_PUBLIC_API_URL=https://your-api-server.com/api
```

### 4. 実装例を参考に組み込み

`example/page.tsx` を参考に、自分のプロジェクトに組み込んでください。

---

## API仕様

このコンポーネントを使用するには、以下の2つのAPIエンドポイントを実装する必要があります。

### 1. 空きスロット取得 API

```
GET /available-slots.php
```

#### レスポンス（成功時）

```json
{
  "success": true,
  "slots": {
    "2024-01-15": [
      {
        "start": "10:00",
        "end": "11:00",
        "datetime": "2024-01-15T10:00:00+09:00"
      },
      {
        "start": "11:00",
        "end": "12:00",
        "datetime": "2024-01-15T11:00:00+09:00"
      }
    ],
    "2024-01-16": [
      {
        "start": "14:00",
        "end": "15:00",
        "datetime": "2024-01-16T14:00:00+09:00"
      }
    ]
  },
  "period": {
    "start": "2024-01-15",
    "end": "2024-02-14"
  }
}
```

#### レスポンス（エラー時）

```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

### 2. 予約作成 API

```
POST /create-booking.php
Content-Type: application/json
```

#### リクエストボディ

```json
{
  "datetime": "2024-01-15T10:00:00+09:00",
  "name": "山田 太郎",
  "email": "yamada@example.com",
  "phone": "090-1234-5678",
  "message": "よろしくお願いします"  // 任意
}
```

#### レスポンス（成功時）

```json
{
  "success": true,
  "message": "予約が完了しました",
  "booking": {
    "datetime": "2024-01-15T10:00:00+09:00",
    "endDatetime": "2024-01-15T11:00:00+09:00",
    "meetLink": "https://meet.google.com/xxx-xxxx-xxx",  // 任意
    "calendarLink": "https://calendar.google.com/...",   // 任意
    "eventId": "abc123"  // 任意
  }
}
```

#### レスポンス（エラー時）

```json
{
  "success": false,
  "error": "この時間はすでに予約されています"
}
```

---

## コンポーネント詳細

### CalendarView

カレンダーUIコンポーネント

```tsx
<CalendarView
  availableDates={["2024-01-15", "2024-01-16"]}  // 予約可能な日付
  selectedDate={selectedDate}                     // 選択中の日付
  onSelectDate={(date) => setSelectedDate(date)} // 日付選択時のコールバック
  maxDate={maxDate}                               // 予約可能な最終日
  primaryColor="blue"                             // テーマカラー
/>
```

### TimeSlotSelector

時間スロット選択コンポーネント

```tsx
<TimeSlotSelector
  selectedDate={selectedDate}           // 選択中の日付
  slots={slotsForSelectedDate}          // その日の空きスロット
  selectedSlot={selectedSlot}           // 選択中のスロット
  onSelectSlot={(slot) => setSelectedSlot(slot)}
  primaryColor="blue"
/>
```

### BookingForm

予約フォームコンポーネント

```tsx
<BookingForm
  onSubmit={(data) => handleSubmit(data)}  // 送信時のコールバック
  isSubmitting={isSubmitting}               // 送信中フラグ
  primaryColor="blue"
  submitButtonText="予約を確定する"
/>
```

### ConfirmationModal

予約完了モーダル

```tsx
<ConfirmationModal
  booking={bookingResult}          // 予約結果
  onClose={() => setShowModal(false)}
  primaryColor="blue"
  title="予約が完了しました"
  description="確認メールをお送りしました"
/>
```

---

## カスタマイズ

### カラーテーマ

各コンポーネントの `primaryColor` プロップでテーマカラーを変更できます。

Tailwind CSSのカラー名を指定してください。

```tsx
// 青（デフォルト）
primaryColor="blue"

// 緑
primaryColor="green"

// オレンジ
primaryColor="orange"
```

### バリデーション

`BookingForm` のバリデーションロジックは、必要に応じてカスタマイズしてください。

---

## 動作環境

- React 18+
- Next.js 13+ (App Router)
- Tailwind CSS 3+

---

## ライセンス

このコンポーネントは自由にお使いください。
