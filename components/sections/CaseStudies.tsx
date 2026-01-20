"use client";

import React from "react";
import { Star } from "lucide-react";
import { CaseCard } from "../ui";

export const CaseStudies = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">
            実際に「個別無料相談」を受けた方の声
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="font-black text-slate-800 text-lg">4.8</span>
            <span className="text-slate-500 text-sm">(1326)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <CaseCard
            badge="会社員 × 副業"
            name="佐藤さん (28歳・営業)"
            before="AIを自分の仕事でどう使えば良いのか分からない"
            after="隙間時間のAI活用で月15万円達成！"
            color="blue"
            imageSrc="/images/case-sato.png"
          />
          <CaseCard
            badge="フリーランス"
            name="田中さん (31歳・ライター)"
            before="世の中にAIツールが多すぎて何を使ったら良いか分からない"
            after="作業時間半減・月商25万→55万に倍増！"
            color="purple"
            imageSrc="/images/case-tanaka.png"
          />
          <CaseCard
            badge="未経験"
            name="山本さん (34歳・製造業)"
            before="AIはIT系の人が使うものだと思っていた"
            after="動画生成スキルで、開始2ヶ月で初収益！"
            color="orange"
            imageSrc="/images/case-yamamoto.png"
          />
        </div>
      </div>
    </section>
  );
};
