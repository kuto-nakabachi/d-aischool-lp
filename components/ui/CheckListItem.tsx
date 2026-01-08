"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface CheckListItemProps {
  text: string;
}

export const CheckListItem = ({ text }: CheckListItemProps) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
    <span className="text-slate-700 font-bold text-sm md:text-base leading-snug">{text}</span>
  </li>
);
