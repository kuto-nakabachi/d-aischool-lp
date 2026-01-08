'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import CalendarView from '@/components/booking/CalendarView';
import TimeSlotSelector from '@/components/booking/TimeSlotSelector';
import BookingForm from '@/components/booking/BookingForm';
import ConfirmationModal from '@/components/booking/ConfirmationModal';

interface TimeSlot {
    start: string;
    end: string;
    datetime: string;
}

interface AvailableSlots {
    [date: string]: TimeSlot[];
}

interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface BookingResult {
    datetime: string;
    endDatetime: string;
    meetLink: string;
    calendarLink: string;
}

// API URLの設定（環境に応じて変更）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function BookingPage() {
    const [availableSlots, setAvailableSlots] = useState<AvailableSlots>({});
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [maxDate, setMaxDate] = useState<Date | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

    // 空き時間を取得
    useEffect(() => {
        fetchAvailableSlots();
    }, []);

    const fetchAvailableSlots = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/available-slots.php`);

            if (!response.ok) {
                throw new Error('スケジュールの取得に失敗しました');
            }

            const data = await response.json();

            if (data.success) {
                setAvailableSlots(data.slots);
                if (data.period?.end) {
                    setMaxDate(new Date(`${data.period.end}T00:00:00`));
                }
            } else {
                throw new Error(data.error || 'スケジュールの取得に失敗しました');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleSlotSelect = (slot: TimeSlot) => {
        setSelectedSlot(slot);
    };

    const handleFormSubmit = async (formData: BookingFormData) => {
        if (!selectedSlot) return;

        try {
            setIsSubmitting(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/create-booking.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    datetime: selectedSlot.datetime,
                    ...formData,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setBookingResult(data.booking);
                setShowConfirmation(true);
                // フォームをリセット
                setSelectedDate(null);
                setSelectedSlot(null);
                // 空き時間を再取得
                fetchAvailableSlots();
            } else {
                throw new Error(data.error || '予約の作成に失敗しました');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    const availableDates = new Set(Object.keys(availableSlots));
    const selectedDateSlots = selectedDate
        ? availableSlots[format(selectedDate, 'yyyy-MM-dd')] || []
        : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            {/* ヘッダー */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>トップページに戻る</span>
                    </Link>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* タイトル */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        【無料】AIキャリア診断を予約する
                    </h1>
                    <p className="text-lg text-gray-600">
                        ご希望の日時を選択して、予約を完了してください
                    </p>
                </div>

                {/* エラー表示 */}
                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                {/* ローディング */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <p className="text-gray-600">スケジュールを読み込んでいます...</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* 左カラム: カレンダーと時間選択 */}
                        <div className="space-y-8">
                            {/* ステップ1: 日付選択 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">日付を選択</h2>
                                </div>
                                <CalendarView
                                    selectedDate={selectedDate}
                                    onSelectDate={handleDateSelect}
                                    availableDates={availableDates}
                                    maxDate={maxDate}
                                />
                            </div>

                            {/* ステップ2: 時間選択 */}
                            {selectedDate && (
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                            2
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">時間を選択</h2>
                                    </div>
                                    <TimeSlotSelector
                                        selectedDate={selectedDate}
                                        slots={selectedDateSlots}
                                        selectedSlot={selectedSlot}
                                        onSelectSlot={handleSlotSelect}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 右カラム: 予約フォーム */}
                        {selectedSlot && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">情報を入力</h2>
                                </div>
                                <BookingForm
                                    onSubmit={handleFormSubmit}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* 確認モーダル */}
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                bookingData={bookingResult}
            />

            {/* アニメーション用のスタイル */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
