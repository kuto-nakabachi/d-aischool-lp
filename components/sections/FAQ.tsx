"use client";

import React from "react";
import { FaqItem } from "../ui";
import { useTheme } from "@/contexts/ThemeContext";

export const FAQ = () => {
  const { theme } = useTheme();

  return (
    <section id="cta-section" className={`py-16 ${theme.faq.bg}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className={`text-2xl md:text-3xl font-bold text-center ${theme.faq.text} mb-10`}>
          よくあるご質問
        </h2>
        <div className="space-y-4">
          <FaqItem
            q="AIの知識が全くない初心者ですが、参加しても大丈夫ですか？"
            a="はい、大歓迎です。むしろ、変な癖がついていない未経験の方のほうが、AIのコツを素早く吸収できる傾向にあります。専門用語を使わず、基礎から丁寧にお話ししますのでご安心ください。"
            theme={theme}
          />
          <FaqItem
            q="本当に無料ですか？ 後から高額な請求をされませんか？"
            a="相談会は完全無料です。最後に弊社のスクールのご案内はさせていただきますが、あなたに必要がないと判断された場合は断っていただいて構いません。無理な勧誘は一切行いません。"
            theme={theme}
          />
          <FaqItem
            q="どのような形式で行われますか？"
            a="Zoom（オンライン）を使用した1対1の対話形式で行います。カメラはオン推奨ですが、事情がある場合はオフでも可能です。ご自宅からリラックスしてご参加ください。"
            theme={theme}
          />
          <FaqItem
            q="特典の資料だけもらうことはできますか？"
            a="申し訳ありませんが、特典は個別相談に参加された方への限定プレゼントとなっております。相談会の中で、資料の最も効果的な使い方も解説させていただくためです。"
            theme={theme}
          />
        </div>
      </div>
    </section>
  );
};
