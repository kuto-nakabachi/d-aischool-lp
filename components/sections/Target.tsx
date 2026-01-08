"use client";

import React from "react";
import { CheckListItem, ArrowDown } from "../ui";

export const Target = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-3xl p-8 md:p-12 shadow-sm border border-blue-100">
          <div className="text-center mb-8">
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Target
            </span>
            <h3 className="text-xl md:text-3xl font-bold text-slate-800 mt-2">
              この個別相談は
              <br className="md:hidden" />
              次のような方におすすめです
            </h3>
          </div>

          <ul className="space-y-4 md:space-y-5">
            <CheckListItem text="今の年収や働き方に限界を感じており、AIスキルで「収入の柱」をもう一つ作りたい人" />
            <CheckListItem text="ChatGPTを触ってはみたものの、「遊び」の域を出ず、仕事やビジネスに繋げる方法がわからない人" />
            <CheckListItem text="毎日のルーチンワークに追われているため、AIに仕事を丸投げして「自由な時間」を取り戻したい人" />
            <CheckListItem text="今の自分にあったAI活用の進め方を、プロの目線で「最短ルート」で知りたい人" />
            <CheckListItem text="AI時代に生き残るために、自分の市場価値を客観的に診断してほしい人" />
          </ul>

          <div className="mt-10 text-center">
            <p className="font-bold text-slate-700 mb-4">
              セミナーでは聞けない「あなたの職種」に特化した
              <br className="md:hidden" />
              AI活用法を伝授します
            </p>
            <ArrowDown className="mx-auto text-blue-300 w-8 h-8 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
