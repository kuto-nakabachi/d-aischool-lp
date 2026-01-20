"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Theme } from "@/contexts/ThemeContext";

interface FaqItemProps {
  q: string;
  a: string;
  theme?: Theme;
  delay?: number;
  isVisible?: boolean;
}

export const FaqItem = ({ q, a, theme, delay = 0, isVisible = true }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [a]);

  return (
    <div
      className={`border ${theme?.faq.item || 'border-slate-200 bg-slate-50'} rounded-xl overflow-hidden transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 text-left hover:bg-slate-100/50 transition-colors duration-200 ${
          isOpen ? "bg-slate-100/30" : ""
        }`}
        aria-expanded={isOpen}
      >
        <span className={`font-bold ${theme?.faq.text || 'text-slate-800'} pr-4 flex gap-2`}>
          <span className={`${theme?.pain.accent || 'text-blue-600'} transition-transform duration-300 ${isOpen ? "scale-110" : ""}`}>
            Q.
          </span>
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ease-out flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          ref={contentRef}
          className="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100"
        >
          <span className={`font-bold ${theme?.pain.accent || 'text-blue-600'} mr-2`}>A.</span>
          {a}
        </div>
      </div>
    </div>
  );
};
