'use client';

import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Clock } from 'lucide-react';

interface TimeSlot {
    start: string;
    end: string;
    datetime: string;
}

interface TimeSlotSelectorProps {
    selectedDate: Date;
    slots: TimeSlot[];
    selectedSlot: TimeSlot | null;
    onSelectSlot: (slot: TimeSlot) => void;
}

export default function TimeSlotSelector({ selectedDate, slots, selectedSlot, onSelectSlot }: TimeSlotSelectorProps) {
    if (slots.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                    <Clock className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-600">この日は空き時間がありません</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
                {format(selectedDate, 'M月d日(E)', { locale: ja })} の空き時間
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot) => {
                    const isSelected = selectedSlot?.datetime === slot.datetime;

                    return (
                        <button
                            key={slot.datetime}
                            onClick={() => onSelectSlot(slot)}
                            className={`
                px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${isSelected
                                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                                    : 'bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:scale-105'
                                }
              `}
                        >
                            <div className="flex items-center justify-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{slot.start} - {slot.end}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
