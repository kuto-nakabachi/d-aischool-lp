"use client";

import React from "react";
import { Theme } from "@/contexts/ThemeContext";

interface PainBubbleProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  text: string;
  align: "left" | "right";
  theme?: Theme;
}

export const PainBubble = ({ icon, title, text, align, theme }: PainBubbleProps) => (
  <div className={`flex items-start gap-4 mb-6 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
    <div className={`${theme?.pain.icon || 'bg-slate-100'} p-3 rounded-full shrink-0 border border-slate-200 mt-2`}>
      {icon}
    </div>
    <div className={`${theme?.pain.bubble || 'bg-white'} border text-slate-700 p-5 rounded-2xl relative text-sm md:text-base font-medium shadow-md max-w-[90%] ${align === 'right' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
      <h4 className={`font-bold ${theme?.pain.accent || 'text-blue-600'} mb-1 text-sm`}>{title}</h4>
      <p className="leading-relaxed">{text}</p>
      <div
        className={`absolute top-4 w-4 h-4 bg-inherit transform rotate-45 ${
          align === 'right' ? '-right-2' : '-left-2'
        }`}
      ></div>
    </div>
  </div>
);
