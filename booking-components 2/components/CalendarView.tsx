"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isAfter,
  isBefore,
  startOfToday,
} from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  availableDates: string[];      // 予約可能な日付リスト ["2024-01-15", ...]
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  maxDate?: Date | null;         // 予約可能な最終日
  primaryColor?: string;         // プライマリカラー（Tailwindクラス）
}

export const CalendarView = ({
  availableDates,
  selectedDate,
  onSelectDate,
  maxDate,
  primaryColor = "blue",
}: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const canGoPrev = isAfter(monthStart, today);
  const canGoNext = !maxDate || isBefore(endOfMonth(currentMonth), maxDate);

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availableDates.includes(dateStr);
  };

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => canGoPrev && setCurrentMonth(subMonths(currentMonth, 1))}
          disabled={!canGoPrev}
          className={`p-2 rounded-full transition-colors ${
            canGoPrev
              ? "hover:bg-slate-100 text-slate-600"
              : "text-slate-300 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-slate-800">
          {format(currentMonth, "yyyy年 M月", { locale: ja })}
        </h3>
        <button
          onClick={() => canGoNext && setCurrentMonth(addMonths(currentMonth, 1))}
          disabled={!canGoNext}
          className={`p-2 rounded-full transition-colors ${
            canGoNext
              ? "hover:bg-slate-100 text-slate-600"
              : "text-slate-300 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`text-center text-xs font-medium py-2 ${
              i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-slate-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* カレンダーグリッド */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isAvailable = isDateAvailable(day) && isCurrentMonth;
          const isToday = isSameDay(day, today);
          const dayOfWeek = day.getDay();

          return (
            <button
              key={day.toISOString()}
              onClick={() => isAvailable && onSelectDate(day)}
              disabled={!isAvailable}
              className={`
                aspect-square p-1 rounded-lg text-sm font-medium transition-all relative
                ${!isCurrentMonth ? "text-slate-300" : ""}
                ${isSelected
                  ? `bg-${primaryColor}-600 text-white shadow-lg scale-105`
                  : isAvailable
                    ? `bg-${primaryColor}-50 text-${primaryColor}-700 hover:bg-${primaryColor}-100 cursor-pointer`
                    : "text-slate-400 cursor-not-allowed"
                }
                ${isToday && !isSelected ? `ring-2 ring-${primaryColor}-400` : ""}
                ${dayOfWeek === 0 && isCurrentMonth && !isSelected ? "text-red-500" : ""}
                ${dayOfWeek === 6 && isCurrentMonth && !isSelected ? "text-blue-500" : ""}
              `}
            >
              <span className="relative z-10">{format(day, "d")}</span>
              {isAvailable && !isSelected && (
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-${primaryColor}-500 rounded-full`}></span>
              )}
            </button>
          );
        })}
      </div>

      {/* 凡例 */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded bg-${primaryColor}-50 border border-${primaryColor}-200`}></div>
          <span>空きあり</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-slate-100"></div>
          <span>予約不可</span>
        </div>
      </div>
    </div>
  );
};
