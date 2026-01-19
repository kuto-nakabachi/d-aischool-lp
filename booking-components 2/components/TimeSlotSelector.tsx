"use client";

import React from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { TimeSlot } from "../types/booking";

interface TimeSlotSelectorProps {
  selectedDate: Date;
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  primaryColor?: string;
}

export const TimeSlotSelector = ({
  selectedDate,
  slots,
  selectedSlot,
  onSelectSlot,
  primaryColor = "blue",
}: TimeSlotSelectorProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        {format(selectedDate, "M月d日(E)", { locale: ja })}の空き時間
      </h3>

      {slots.length === 0 ? (
        <p className="text-slate-500 text-center py-8">
          この日は空き時間がありません
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {slots.map((slot) => {
            const isSelected =
              selectedSlot && selectedSlot.datetime === slot.datetime;

            return (
              <button
                key={slot.datetime}
                onClick={() => onSelectSlot(slot)}
                className={`
                  py-3 px-4 rounded-lg text-sm font-medium transition-all
                  ${isSelected
                    ? `bg-${primaryColor}-600 text-white shadow-md scale-[1.02]`
                    : `bg-slate-50 text-slate-700 hover:bg-${primaryColor}-50 hover:text-${primaryColor}-700`
                  }
                `}
              >
                {slot.start} - {slot.end}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
