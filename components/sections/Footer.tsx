"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${theme.footer.bg} ${theme.footer.text} py-8 pb-20 text-center text-xs md:text-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4 mb-4">
          <Link href="/privacy" className="hover:text-slate-800 transition-colors">
            プライバシーポリシー
          </Link>
          <span className="text-slate-400">|</span>
          <Link href="/legal" className="hover:text-slate-800 transition-colors">
            特定商取引法に基づく表記
          </Link>
        </div>
        <p>&copy; 2024 D-AI School. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
