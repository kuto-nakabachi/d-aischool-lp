"use client";

import React from "react";
import { CheckCircle2, Target, Sparkles, TrendingUp, Cpu, ShieldCheck, UserCheck } from "lucide-react";

export const TargetSection = () => {
  const checkList = [
    {
      text: "AIスキルで「収入の柱」をもう一つ作りたい",
      icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
      sub: "副業・キャリアアップ志向の方"
    },
    {
      text: "ChatGPTはもっと仕事に活かせる気がする",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      sub: "現状の活用に満足していない方"
    },
    {
      text: "ルーティンワークをAIで自動化したい",
      icon: <Cpu className="w-6 h-6 text-indigo-600" />,
      sub: "業務効率化・時短を目指す方"
    },
    {
      text: "AIに仕事を取られたくない！自分の価値を診断してほしい",
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      sub: "将来のキャリアに不安がある方"
    },
    {
      text: "今の自分に合ったAIの活用方法をプロ目線でアドバイスして欲しい",
      icon: <UserCheck className="w-6 h-6 text-indigo-600" />,
      sub: "独学に限界を感じている方"
    }
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              <Target className="w-4 h-4 mr-1" />
              Target
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">
              こんな方に<span className="text-indigo-600">おすすめ</span>です
            </h2>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="p-6 md:p-8">
              <div className="grid gap-4">
                {checkList.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start p-3 rounded-xl hover:bg-indigo-50 transition-colors duration-300 border border-transparent hover:border-indigo-100"
                  >
                    <div className="flex-shrink-0 mr-3">
                      <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm md:text-base font-bold text-slate-800 mb-0.5 group-hover:text-indigo-700 transition-colors">
                        {item.text}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.sub}
                      </p>
                    </div>
                    <div className="hidden sm:block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-indigo-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Highlight Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 md:p-8 text-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-8 translate-y-8"></div>

              <p className="relative z-10 text-base md:text-lg font-bold text-white leading-relaxed">
                個別面談ならではの<br className="md:hidden" />
                <span className="bg-white/20 px-2 py-0.5 rounded mx-1 text-yellow-300">「あなた」に特化した</span>
                <br className="md:hidden" />
                AI活用を伝授します
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Keep the old export name for backwards compatibility
export { TargetSection as Target };
