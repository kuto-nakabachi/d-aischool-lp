"use client";

import React from "react";

interface PainBubbleProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  align: "left" | "right";
}

export const PainBubble = ({ icon, title, text, align }: PainBubbleProps) => (
  <div className={`flex items-start gap-4 mb-6 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
    <div className="bg-slate-800 p-3 rounded-full shrink-0 border border-slate-700 mt-2">
      {icon}
    </div>
    <div className={`bg-white text-slate-800 p-5 rounded-2xl relative text-sm md:text-base font-medium shadow-lg max-w-[90%] ${align === 'right' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
      <h4 className="font-bold text-orange-600 mb-1 text-sm">{title}</h4>
      <p className="leading-relaxed">{text}</p>
      <div
        className={`absolute top-4 w-4 h-4 bg-white transform rotate-45 ${
          align === 'right' ? '-right-2' : '-left-2'
        }`}
      ></div>
    </div>
  </div>
);
