"use client";

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const Agitation = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 ${theme.agitation.bg} border-t border-b border-slate-200`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className={`${theme.agitation.highlight} font-bold px-4 py-1 rounded-full text-sm inline-block mb-4`}>
              Warning
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight">
              「様子見」をしている間に、
              <br />
              あなたの市場価値は暴落し始めています。
            </h2>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-10">
            {/* グラフ表現 */}
            <div className="w-full md:w-1/2">
              <h3 className="text-sm font-bold text-slate-500 mb-4 text-center">
                生成AI市場規模の推移予測
              </h3>
              <div className="h-64 flex items-end justify-between gap-2 px-4 border-b-2 border-slate-200 relative">
                {/* 背景グリッド */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full h-px bg-slate-400"></div>
                  <div className="w-full h-px bg-slate-400"></div>
                  <div className="w-full h-px bg-slate-400"></div>
                </div>

                {/* 棒グラフ */}
                <div className="w-1/5 bg-slate-300 rounded-t-lg h-[10%] relative group">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">
                    2023
                  </span>
                </div>
                <div className="w-1/5 bg-slate-400 rounded-t-lg h-[25%] relative group">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">
                    2025
                  </span>
                </div>
                <div className="w-1/5 bg-gradient-to-t from-sky-300 to-blue-400 rounded-t-lg h-[50%] relative group">
                  <span className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold ${theme.agitation.accent}`}>
                    2027
                  </span>
                </div>
                <div className="w-1/5 bg-gradient-to-t from-blue-500 to-blue-700 rounded-t-lg h-[90%] relative group shadow-lg">
                  <span className={`absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold ${theme.agitation.accent} whitespace-nowrap bg-white px-2 py-0.5 rounded shadow`}>
                    15倍以上
                  </span>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold">
                    2030
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <p className={`text-lg leading-relaxed ${theme.agitation.text}`}>
                この爆発的な成長の中で、AIを「使いこなす人」と「使えない人」の間には、
                <span className={`font-bold ${theme.agitation.highlight} px-1`}>
                  生涯年収で1億円近くの差
                </span>
                が生まれると言われています。
              </p>
              <p className={`text-lg leading-relaxed ${theme.agitation.text}`}>
                「なんとなく興味はあるけど、周りがやってから...」その姿勢でいると、気づいた時には
                <span className={`font-bold border-b-2 ${theme.agitation.accent.replace('text-', 'border-')}`}>
                  「AIを使える人材」にあなたの仕事が奪われている
                </span>
                かもしれません。
              </p>
              <p className="text-xl font-bold text-slate-800 mt-4">
                だからこそ、
                <span className={`text-white bg-gradient-to-r ${theme.agitation.graphBar} px-3 py-1 rounded`}>&quot;今&quot;</span>{" "}
                動くべきなのです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
