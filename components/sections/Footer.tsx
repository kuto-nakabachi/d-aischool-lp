"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-500 py-8 pb-20 text-center text-xs md:text-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4 mb-4">
          <Link href="/privacy" className="hover:text-slate-300">
            プライバシーポリシー
          </Link>
          <span className="text-slate-700">|</span>
          <Link href="/legal" className="hover:text-slate-300">
            特定商取引法に基づく表記
          </Link>
        </div>
        <p>&copy; 2024 D-AI School. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
