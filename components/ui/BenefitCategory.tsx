"use client";

import React from "react";
import { Gift } from "lucide-react";

interface BenefitCategoryProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  subtitle: string;
  color: string;
  items: string[];
}

export const BenefitCategory = ({
  icon,
  step,
  title,
  subtitle,
  color,
  items,
}: BenefitCategoryProps) => (
  <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
    <div className={`p-4 ${color} text-white`}>
      <div className="flex items-center gap-3 mb-1">
        <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
        <div className="text-xs font-bold bg-black/20 px-2 py-0.5 rounded uppercase tracking-wider">
          {step}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg leading-tight">{title}</h3>
        <p className="text-xs opacity-90">{subtitle}</p>
      </div>
    </div>
    <div className="p-5">
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
            <Gift className="w-4 h-4 text-yellow-500 shrink-0 mt-1" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
