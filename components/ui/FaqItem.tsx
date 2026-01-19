"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Theme } from "@/contexts/ThemeContext";

interface FaqItemProps {
  q: string;
  a: string;
  theme?: Theme;
}

export const FaqItem = ({ q, a, theme }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border ${theme?.faq.item || 'border-slate-200 bg-slate-50'} rounded-xl overflow-hidden`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100 transition-colors"
      >
        <span className={`font-bold ${theme?.faq.text || 'text-slate-800'} pr-4 flex gap-2`}>
          <span className={theme?.pain.accent || 'text-blue-600'}>Q.</span>
          {q}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
          <span className={`font-bold ${theme?.pain.accent || 'text-blue-600'} mr-2`}>A.</span>
          {a}
        </div>
      )}
    </div>
  );
};
