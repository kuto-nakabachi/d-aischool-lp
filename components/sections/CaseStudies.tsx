"use client";

import React from "react";
import { Star } from "lucide-react";
import { CaseCard } from "../ui";

export const CaseStudies = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            この診断を受けて、
            <br className="md:hidden" />
            人生が変わった人たち
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="font-bold text-slate-800 text-lg">4.8</span>
            <span className="text-slate-500 text-sm">(参加者の声)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <CaseCard
            badge="会社員 × 副業"
            name="佐藤さん (28歳・営業)"
            before="残業続きで時間がない"
            after="隙間時間のAI活用で月15万円達成！"
            color="blue"
            imageSrc="/images/case-sato.jpg"
          />
          <CaseCard
            badge="フリーランス"
            name="田中さん (31歳・ライター)"
            before="低単価で疲弊"
            after="作業時間半減・月商25万→55万に倍増！"
            color="purple"
            imageSrc="/images/case-tanaka.jpg"
          />
          <CaseCard
            badge="未経験"
            name="山本さん (34歳・製造業)"
            before="PCスキル人並み以下"
            after="動画生成スキルで、開始2ヶ月で初収益！"
            color="orange"
            imageSrc="/images/case-yamamoto.jpg"
          />
        </div>
      </div>
    </section>
  );
};
