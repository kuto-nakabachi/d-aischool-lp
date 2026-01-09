"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero内のCTAボタンを探す
      const heroCta = document.querySelector('[data-hero-cta]');

      if (heroCta) {
        const rect = heroCta.getBoundingClientRect();
        // ボタンが画面から完全に隠れたら表示
        const isHeroCtaHidden = rect.bottom < 0;
        setIsVisible(isHeroCtaHidden);
      } else {
        // フォールバック: 300px以上スクロールしたら表示
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期チェック

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* モバイル版 - スクロールで表示 */}
      <div
        className={`md:hidden fixed bottom-6 left-4 right-4 z-50 transition-all duration-300 ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <Link
          href="/booking"
          className="relative w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-full shadow-2xl hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2 text-[15px]"
        >
          {/* 残り枠バッジ */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse whitespace-nowrap">
            残り3枠
          </span>

          AIキャリア診断を予約する
          <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </div>

      {/* PC版 - 常に表示 */}
      <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Link
          href="/booking"
          className="relative bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
        >
          {/* 残り枠バッジ */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse whitespace-nowrap">
            残り3枠
          </span>

          【無料】AIキャリア診断を予約する
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
};
