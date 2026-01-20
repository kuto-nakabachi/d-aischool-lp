"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Theme } from "@/contexts/ThemeContext";

interface CheckListItemProps {
  text: string;
  theme?: Theme;
}

export const CheckListItem = ({ text, theme }: CheckListItemProps) => (
  <li className="flex items-center gap-3">
    <CheckCircle2 className={`w-6 h-6 ${theme?.target.check || 'text-blue-500'} shrink-0`} />
    <span className={`${theme?.target.text || 'text-slate-700'} font-bold text-sm md:text-base whitespace-nowrap`}>{text}</span>
  </li>
);
