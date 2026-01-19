"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { MessageCircle, TrendingUp, Map } from "lucide-react";

export const Consultation = () => {
  const { theme } = useTheme();

  const items = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "ヒアリング",
      description: "あなたの職種・業務内容・実現したい未来をヒアリング",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "市場価値の整理",
      description: "AIを使うことで収入や市場価値はどれだけ上がるのかを整理",
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "ロードマップ作成",
      description: "今後のキャリアロードマップを作成",
    },
  ];

  return (
    <section className={`py-16 ${theme.target.bg}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className={`bg-gradient-to-r ${theme.agitation.graphBar} text-white text-xs font-bold px-3 py-1 rounded-full`}>
              What We Do
            </span>
            <h3 className="text-xl md:text-3xl font-bold text-slate-800 mt-3">
              この個別相談では
              <br className="md:hidden" />
              以下のようなことを行います
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={`${theme.target.container} rounded-2xl p-6 text-center border shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${theme.pain.icon} ${theme.target.check} mb-4`}>
                  {item.icon}
                </div>
                <div className={`text-xs font-bold ${theme.target.check} mb-2`}>
                  STEP {index + 1}
                </div>
                <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
