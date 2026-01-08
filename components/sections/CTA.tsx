"use client";

import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section id="cta-section" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            1年後、「あの時動いておけば」と
            <br />
            後悔しますか？
          </h2>
          <p className="text-slate-600 text-lg">
            それとも、AIを味方につけて
            <br />
            <span className="font-bold text-slate-900">「自由な働き方」</span>を手に入れますか？
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 mb-8">
          <div className="flex justify-center items-center gap-2 text-red-600 font-bold mb-2 animate-pulse">
            <AlertTriangle className="w-5 h-5" />
            <span>本日の残り枠：あと3名</span>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            ※個別対応の質を保つため、
            <span className="font-bold text-slate-800">毎月先着30名様限定</span>
            とさせていただいております。
            <br />
            特典の配布は予告なく終了する場合があります。
          </p>

          <button className="w-full bg-gradient-to-b from-green-500 to-green-600 text-white text-xl md:text-3xl font-bold py-6 px-4 rounded-xl shadow-[0_4px_0_rgb(21,128,61)] hover:shadow-[0_2px_0_rgb(21,128,61)] hover:translate-y-[2px] transition-all flex flex-col items-center justify-center gap-1 group relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1 bg-white/20"></span>
            <span className="flex items-center gap-2">
              無料でAIキャリア診断を予約する
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-sm md:text-base font-normal opacity-90">
              15大特典もすべて受け取る
            </span>
          </button>
          <p className="text-xs text-slate-400 mt-4">
            所要時間：1分で完了 / キャンセル料なし / 枠数限定・完全予約制
          </p>
        </div>
      </div>
    </section>
  );
};
