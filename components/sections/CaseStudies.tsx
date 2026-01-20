"use client";

import React from "react";
import { Star } from "lucide-react";
import { CaseCard } from "../ui";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const CaseStudies = () => {
  const [headerRef, isHeaderVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [cardsRef, isCardsVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  const cases = [
    {
      badge: "会社員 × 副業",
      name: "佐藤さん (28歳・営業)",
      before: "AIを自分の仕事でどう使えば良いのか分からない",
      after: "隙間時間のAI活用で月15万円達成！",
      color: "blue" as const,
      imageSrc: "/images/case-sato.png",
    },
    {
      badge: "フリーランス",
      name: "田中さん (31歳・ライター)",
      before: "世の中にAIツールが多すぎて何を使ったら良いか分からない",
      after: "作業時間半減・月商25万→55万に倍増！",
      color: "purple" as const,
      imageSrc: "/images/case-tanaka.png",
    },
    {
      badge: "未経験",
      name: "山本さん (34歳・製造業)",
      before: "AIはIT系の人が使うものだと思っていた",
      after: "動画生成スキルで、開始2ヶ月で初収益！",
      color: "orange" as const,
      imageSrc: "/images/case-yamamoto.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
            実際に「個別無料相談」を受けた方の声
          </h2>
          <div
            className={`flex items-center justify-center gap-2 mb-2 transition-all duration-700 ease-out delay-200 ${
              isHeaderVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 fill-current transition-all duration-300`}
                  style={{ transitionDelay: `${300 + i * 50}ms` }}
                />
              ))}
            </div>
            <span className="font-black text-slate-800 text-lg">4.8</span>
            <span className="text-slate-500 text-sm">(1326)</span>
          </div>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                isCardsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <CaseCard
                badge={caseItem.badge}
                name={caseItem.name}
                before={caseItem.before}
                after={caseItem.after}
                color={caseItem.color}
                imageSrc={caseItem.imageSrc}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
