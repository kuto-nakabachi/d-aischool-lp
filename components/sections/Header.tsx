"use client";

import React from "react";

export const Header = () => {
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-xl md:text-2xl text-slate-900 tracking-tighter">
          D-AI<span className="text-orange-500">スクール</span>
        </div>
        <button
          onClick={() => {
            const ctaSection = document.getElementById("cta-section");
            if (ctaSection) {
              ctaSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="hidden md:flex bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
        >
          無料診断を受ける
        </button>
        <div className="md:hidden text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 animate-pulse">
          残り3枠
        </div>
      </div>
    </header>
  );
};
