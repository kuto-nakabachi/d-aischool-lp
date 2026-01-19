"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarView } from "../components/CalendarView";
import { TimeSlotSelector } from "../components/TimeSlotSelector";
import { BookingForm } from "../components/BookingForm";
import { ConfirmationModal } from "../components/ConfirmationModal";
import {
  TimeSlot,
  AvailableSlots,
  BookingFormData,
  BookingResult,
  AvailableSlotsResponse,
  CreateBookingResponse,
} from "../types/booking";

// ========================================
// API設定 - ここを自分の環境に合わせて変更
// ========================================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * 予約ページの実装例
 *
 * このファイルを参考に、自分のプロジェクトに組み込んでください。
 */
export default function BookingPage() {
  // ========================================
  // State管理
  // ========================================
  const [availableSlots, setAvailableSlots] = useState<AvailableSlots>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

  // ========================================
  // 空きスロット取得
  // ========================================
  const fetchAvailableSlots = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/available-slots.php`);
      const data: AvailableSlotsResponse = await response.json();

      if (data.success && data.slots) {
        setAvailableSlots(data.slots);
        if (data.period?.end) {
          setMaxDate(new Date(data.period.end));
        }
      } else {
        setError(data.error || "空き時間の取得に失敗しました");
      }
    } catch (err) {
      console.error("Failed to fetch slots:", err);
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  // ========================================
  // 予約送信
  // ========================================
  const handleFormSubmit = async (formData: BookingFormData) => {
    if (!selectedSlot) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/create-booking.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          datetime: selectedSlot.datetime,
          ...formData,
        }),
      });

      const data: CreateBookingResponse = await response.json();

      if (data.success && data.booking) {
        setBookingResult(data.booking);
        setShowConfirmation(true);
        // 予約成功後、スロットを再取得
        await fetchAvailableSlots();
      } else {
        setError(data.error || "予約の作成に失敗しました");
      }
    } catch (err) {
      console.error("Failed to create booking:", err);
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================================
  // UI表示
  // ========================================
  const availableDates = Object.keys(availableSlots);
  const slotsForSelectedDate = selectedDate
    ? availableSlots[format(selectedDate, "yyyy-MM-dd")] || []
    : [];

  // 現在のステップを判定
  const currentStep = !selectedDate ? 1 : !selectedSlot ? 2 : 3;

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            予約フォーム
          </h1>
          <p className="text-slate-600">
            ご希望の日時を選択してください
          </p>
        </div>

        {/* ステップインジケーター */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-sm">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 rounded ${
                      step < currentStep ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* ローディング */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">読み込み中...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* 左側: カレンダー */}
            <div>
              <CalendarView
                availableDates={availableDates}
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
                maxDate={maxDate}
                primaryColor="blue"
              />
            </div>

            {/* 右側: 時間選択 or フォーム */}
            <div className="space-y-6">
              {selectedDate && (
                <TimeSlotSelector
                  selectedDate={selectedDate}
                  slots={slotsForSelectedDate}
                  selectedSlot={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                  primaryColor="blue"
                />
              )}

              {selectedSlot && (
                <BookingForm
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                  primaryColor="blue"
                  submitButtonText="予約を確定する"
                />
              )}
            </div>
          </div>
        )}

        {/* 確認モーダル */}
        {showConfirmation && bookingResult && (
          <ConfirmationModal
            booking={bookingResult}
            onClose={() => {
              setShowConfirmation(false);
              setSelectedDate(null);
              setSelectedSlot(null);
              setBookingResult(null);
            }}
            primaryColor="blue"
          />
        )}
      </div>
    </div>
  );
}
