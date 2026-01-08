"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface MobileCTAProps {
  scrollToCta: () => void;
}

export const MobileCTA = ({ scrollToCta }: MobileCTAProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <button
        onClick={scrollToCta}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 text-sm"
      >
        <span className="bg-white text-red-500 text-xs px-2 py-0.5 rounded-full font-extrabold animate-pulse">
          残りわずか
        </span>
        無料で診断を予約する
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
