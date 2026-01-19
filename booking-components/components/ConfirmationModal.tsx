"use client";

import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { CheckCircle, Calendar, Clock, Video, Copy, Check, X } from "lucide-react";
import { BookingResult } from "../types/booking";

interface ConfirmationModalProps {
  booking: BookingResult;
  onClose: () => void;
  primaryColor?: string;
  title?: string;
  description?: string;
}

export const ConfirmationModal = ({
  booking,
  onClose,
  primaryColor = "blue",
  title = "予約が完了しました",
  description = "ご予約ありがとうございます。確認メールをお送りしましたのでご確認ください。",
}: ConfirmationModalProps) => {
  const [copied, setCopied] = useState(false);

  const startDate = parseISO(booking.datetime);
  const endDate = parseISO(booking.endDatetime);

  const handleCopyLink = async () => {
    if (booking.meetLink) {
      await navigator.clipboard.writeText(booking.meetLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className={`bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-600 p-6 text-center rounded-t-2xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className={`w-10 h-10 text-${primaryColor}-500`} />
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-white/80 text-sm mt-2">{description}</p>
        </div>

        {/* 予約詳細 */}
        <div className="p-6 space-y-4">
          {/* 日時 */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
            <Calendar className={`w-5 h-5 text-${primaryColor}-500 mt-0.5`} />
            <div>
              <p className="font-bold text-slate-800">
                {format(startDate, "yyyy年M月d日(E)", { locale: ja })}
              </p>
              <p className="text-slate-600 flex items-center gap-1 mt-1">
                <Clock className="w-4 h-4" />
                {format(startDate, "HH:mm")} 〜 {format(endDate, "HH:mm")}
              </p>
            </div>
          </div>

          {/* オンライン会議リンク */}
          {booking.meetLink && (
            <div className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Video className={`w-5 h-5 text-${primaryColor}-500`} />
                <span className="font-bold text-slate-800">オンライン会議</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={booking.meetLink}
                  readOnly
                  className="flex-1 text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-600"
                />
                <button
                  onClick={handleCopyLink}
                  className={`p-2 rounded-lg transition-colors ${
                    copied
                      ? "bg-green-100 text-green-600"
                      : `bg-${primaryColor}-100 text-${primaryColor}-600 hover:bg-${primaryColor}-200`
                  }`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* カレンダー登録 */}
          {booking.calendarLink && (
            <a
              href={booking.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center gap-2 w-full py-3 rounded-xl
                bg-${primaryColor}-50 text-${primaryColor}-700 font-medium
                hover:bg-${primaryColor}-100 transition-colors
              `}
            >
              <Calendar className="w-5 h-5" />
              Googleカレンダーに追加
            </a>
          )}

          {/* 注意事項 */}
          <div className="text-xs text-slate-500 space-y-1 pt-4 border-t border-slate-100">
            <p>・確認メールが届かない場合は、迷惑メールフォルダをご確認ください。</p>
            <p>・ご変更・キャンセルの場合は、メールにてご連絡ください。</p>
          </div>
        </div>

        {/* 閉じるボタン */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
