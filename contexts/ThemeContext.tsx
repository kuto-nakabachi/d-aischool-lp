"use client";

import { createContext, useContext, ReactNode } from "react";

// クリーンブルー（信頼感・プロフェッショナル）
export const theme = {
  name: "クリーンブルー",
  description: "信頼感・プロフェッショナル",
  hero: {
    bg: "bg-gradient-to-br from-blue-50 via-white to-sky-50",
    text: "text-slate-800",
    accent: "text-blue-600",
    gradientText: "bg-gradient-to-r from-blue-600 to-cyan-500",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    button: "bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30",
    buttonShadow: "shadow-[0_4px_0_rgb(29,78,216)]",
  },
  pain: {
    bg: "bg-white",
    text: "text-slate-700",
    accent: "text-blue-600",
    bubble: "bg-blue-50 border-blue-100",
    icon: "bg-blue-100 text-blue-600",
  },
  agitation: {
    bg: "bg-gradient-to-b from-slate-50 to-white",
    text: "text-slate-700",
    accent: "text-blue-600",
    highlight: "bg-blue-50 text-blue-700",
    graphBar: "from-blue-400 to-blue-600",
  },
  target: {
    bg: "bg-white",
    container: "bg-blue-50 border-blue-100",
    text: "text-slate-700",
    check: "text-blue-500",
  },
  caseStudies: {
    bg: "bg-gradient-to-b from-white to-slate-50",
    text: "text-slate-700",
    card: "bg-white border-slate-200",
  },
  benefits: {
    bg: "bg-gradient-to-b from-blue-50 via-white to-slate-50",
    text: "text-slate-800",
    card: "bg-white border-slate-200 shadow-sm",
    accent: "text-blue-600",
  },
  faq: {
    bg: "bg-white",
    text: "text-slate-700",
    item: "bg-slate-50 border-slate-200",
  },
  footer: {
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
  stickyCta: {
    bg: "bg-gradient-to-r from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/40",
  },
} as const;

export type Theme = typeof theme;

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
