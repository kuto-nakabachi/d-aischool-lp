"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-slate-900 text-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-6 animate-fade-in-up">
          \ 参加者満足度98%！あなたの市場価値を再定義 /
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
          AI時代に、あなたの<br className="md:hidden" />
          市場価値はいくら上がる？
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 block mt-2">
            プロが算出「AIキャリア・年収診断」
          </span>
        </h1>

        <p className="text-slate-300 text-sm md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
          AIを「学ぶ」から、AIで「稼ぐ」へ。
          <br />
          ただ学ぶだけでは稼げない。×AIで、
          <br className="md:hidden" />
          最短で年収を上げる
          <span className="text-white border-b border-orange-500">「あなただけの戦略」</span>
          を個別に提示します。
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto mb-10 relative overflow-hidden group hover:bg-white/10 transition-colors">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-lg z-10">
            先着30名限定
          </div>
          <p className="text-base md:text-lg font-bold text-slate-200 mb-2">
            通常は有料講座で配布している資料を含む
          </p>
          <div className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 mb-2">
            豪華15大特典 無料配布中
          </div>
          <p className="text-xs text-slate-400 mt-2">
            ※AIを触っている状態から、業務に組み込める状態へ引き上げます
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            data-hero-cta
            onClick={() => {
              const ctaSection = document.getElementById("cta-section");
              if (ctaSection) {
                ctaSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full md:w-auto bg-gradient-to-b from-orange-400 to-orange-600 text-white text-xl md:text-2xl font-bold py-4 px-8 md:px-12 rounded-full shadow-[0_4px_0_rgb(194,65,12)] hover:shadow-[0_2px_0_rgb(194,65,12)] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 group"
          >
            <span>無料で診断を受ける</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-slate-400">※60分で今後のキャリアプランが明確になります</p>
        </div>
      </div>
    </section>
  );
};
