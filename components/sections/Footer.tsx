"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Footer = () => {
  const { theme } = useTheme();
  const [footerRef, isFooterVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.3 });

  return (
    <footer
      ref={footerRef}
      className={`${theme.footer.bg} ${theme.footer.text} py-8 pb-20 text-center text-xs md:text-sm`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex justify-center gap-4 mb-4 transition-all duration-700 ease-out ${
            isFooterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link href="/privacy" className="hover:text-slate-800 transition-colors">
            プライバシーポリシー
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/legal" className="hover:text-slate-800 transition-colors">
            特定商取引法に基づく表記
          </Link>
        </div>
        <p
          className={`transition-all duration-700 ease-out delay-100 ${
            isFooterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          &copy; 2024 D-AI School. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
