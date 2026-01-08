'use client';

import { useState } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfToday } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarViewProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    availableDates: Set<string>;
}

export default function CalendarView({ selectedDate, onSelectDate, availableDates }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = startOfToday();

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // カレンダーの開始日（月曜日から開始）
    const startDay = monthStart.getDay();
    const paddingDays = startDay === 0 ? 6 : startDay - 1;

    const handlePrevMonth = () => {
        const prevMonth = addMonths(currentMonth, -1);
        if (prevMonth >= today) {
            setCurrentMonth(prevMonth);
        }
    };

    const handleNextMonth = () => {
        const nextMonth = addMonths(currentMonth, 1);
        const maxMonth = addMonths(today, 1);
        if (nextMonth <= maxMonth) {
            setCurrentMonth(nextMonth);
        }
    };

    const isDateAvailable = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return availableDates.has(dateStr);
    };

    const isDateDisabled = (date: Date) => {
        return isBefore(date, today) || !isDateAvailable(date);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePrevMonth}
                    disabled={currentMonth <= today}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <h2 className="text-xl font-bold text-gray-900">
                    {format(currentMonth, 'yyyy年M月', { locale: ja })}
                </h2>

                <button
                    onClick={handleNextMonth}
                    disabled={currentMonth >= addMonths(today, 1)}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            {/* 曜日ヘッダー */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* 日付グリッド */}
            <div className="grid grid-cols-7 gap-2">
                {/* パディング */}
                {Array.from({ length: paddingDays }).map((_, i) => (
                    <div key={`padding-${i}`} />
                ))}

                {/* 日付 */}
                {daysInMonth.map((date) => {
                    const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                    const isAvailable = isDateAvailable(date);
                    const isDisabled = isDateDisabled(date);
                    const isTodayDate = isToday(date);

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => !isDisabled && onSelectDate(date)}
                            disabled={isDisabled}
                            className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${isSelected
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                                    : isAvailable
                                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-105'
                                        : 'text-gray-400 cursor-not-allowed'
                                }
                ${isTodayDate && !isSelected ? 'ring-2 ring-blue-400' : ''}
                disabled:opacity-40 disabled:hover:scale-100
              `}
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <span>{format(date, 'd')}</span>
                                {isAvailable && !isSelected && (
                                    <span className="text-xs mt-0.5">●</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* 凡例 */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-50 border border-blue-200" />
                    <span>空きあり</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-100" />
                    <span>予約不可</span>
                </div>
            </div>
        </div>
    );
}
