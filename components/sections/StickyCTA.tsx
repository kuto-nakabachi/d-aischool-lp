"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const StickyCTA = () => {
  const { theme } = useTheme();
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
          className={`w-full ${theme.stickyCta.bg} text-white font-bold py-4 rounded-full shadow-2xl hover:${theme.stickyCta.shadow} transition-all flex items-center justify-center gap-2 text-[15px]`}
        >
          個別相談を予約する
          <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </div>

      {/* PC版 - 常に表示 */}
      <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Link
          href="/booking"
          className={`${theme.stickyCta.bg} text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:${theme.stickyCta.shadow} hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg`}
        >
          【無料】個別相談を予約する
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
};
