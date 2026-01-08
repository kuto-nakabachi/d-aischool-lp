"use client";

import React from "react";
import { User } from "lucide-react";

interface CaseCardProps {
  badge: string;
  name: string;
  before: string;
  after: string;
  color: "blue" | "purple" | "orange";
  imageSrc?: string;
}

export const CaseCard = ({
  badge,
  name,
  before,
  after,
  color,
  imageSrc,
}: CaseCardProps) => {
  const colorClasses = {
    blue: {
      badge: "bg-blue-600",
      border: "border-blue-100",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    purple: {
      badge: "bg-purple-600",
      border: "border-purple-100",
      text: "text-purple-600",
      bg: "bg-purple-50",
    },
    orange: {
      badge: "bg-orange-500",
      border: "border-orange-100",
      text: "text-orange-500",
      bg: "bg-orange-50",
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border ${colors.border} overflow-hidden hover:shadow-lg transition-shadow`}
    >
      {/* バッジ */}
      <div className={`${colors.badge} text-white text-xs font-bold px-4 py-2`}>
        {badge}
      </div>

      <div className="p-6">
        {/* 写真 & 名前 */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full bg-slate-200 shrink-0 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={`${name}の写真`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-slate-400" />
            )}
          </div>
          <p className="text-sm text-slate-700 font-bold">{name}</p>
        </div>

        {/* Before */}
        <div className="mb-3">
          <span className="text-xs font-bold text-slate-400 block mb-1">Before</span>
          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{before}</p>
        </div>

        {/* 矢印 */}
        <div className="text-center my-2">
          <svg
            className={`w-6 h-6 mx-auto ${colors.text}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>

        {/* After */}
        <div>
          <span className={`text-xs font-bold ${colors.text} block mb-1`}>After</span>
          <p
            className={`text-sm font-bold ${colors.text} ${colors.bg} p-3 rounded-lg border border-current`}
          >
            {after}
          </p>
        </div>
      </div>
    </div>
  );
};
