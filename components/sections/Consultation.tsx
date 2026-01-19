"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

export const Consultation = () => {
  const { theme } = useTheme();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const items = [
    {
      image: `${basePath}/images/step1.png`,
      title: "ヒアリング",
      description: "あなたの職種・業務内容・実現したい未来をヒアリング",
      delay: "0.2s",
    },
    {
      image: `${basePath}/images/step2.png`,
      title: "市場価値の整理",
      description: "AIを使うことで収入や市場価値はどれだけ上がるのかを整理",
      delay: "0.4s",
    },
    {
      image: `${basePath}/images/step3.png`,
      title: "ロードマップ作成",
      description: "今後のキャリアロードマップを作成",
      delay: "0.6s",
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
            <h2 className="text-xl md:text-3xl font-bold text-slate-800 mt-3">
              個別相談で
              <br className="md:hidden" />
              行うこと
            </h2>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              3ステップであなたのAIキャリアを明確にします
            </p>
          </div>

          <ul className="grid md:grid-cols-3 gap-6 md:gap-8">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: item.delay }}
              >
                <div className="relative w-40 h-48 md:w-48 md:h-56 mb-1">
                  <Image
                    src={item.image}
                    alt={`ステップ${index + 1}: ${item.title}`}
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
