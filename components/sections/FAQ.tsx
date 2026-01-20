"use client";

import React from "react";
import { FaqItem } from "../ui";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const FAQ = () => {
  const { theme } = useTheme();
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const [itemsRef, isItemsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const faqItems = [
    {
      q: "AIの知識が全くない初心者ですが、参加しても大丈夫ですか？",
      a: "はい、大歓迎です。むしろ、変な癖がついていない未経験の方のほうが、AIのコツを素早く吸収できる傾向にあります。専門用語を使わず、基礎から丁寧にお話ししますのでご安心ください。",
    },
    {
      q: "本当に無料ですか？ 後から高額な請求をされませんか？",
      a: "相談会は完全無料です。最後に弊社のスクールのご案内はさせていただきますが、あなたに必要がないと判断された場合は断っていただいて構いません。無理な勧誘は一切行いません。",
    },
    {
      q: "どのような形式で行われますか？",
      a: "Zoom（オンライン）を使用した1対1の対話形式で行います。カメラはオン推奨ですが、事情がある場合はオフでも可能です。ご自宅からリラックスしてご参加ください。",
    },
    {
      q: "特典の資料だけもらうことはできますか？",
      a: "申し訳ありませんが、特典は個別相談に参加された方への限定プレゼントとなっております。相談会の中で、資料の最も効果的な使い方も解説させていただくためです。",
    },
  ];

  return (
    <section id="cta-section" className={`py-16 ${theme.faq.bg}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h2
          ref={headerRef}
          className={`text-2xl md:text-3xl font-black text-center ${theme.faq.text} mb-10 transition-all duration-700 ease-out ${
            isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          よくあるご質問
        </h2>
        <div ref={itemsRef} className="space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              q={item.q}
              a={item.a}
              theme={theme}
              delay={index * 100}
              isVisible={isItemsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
