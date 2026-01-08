"use client";

import React from "react";
import { AlertTriangle, TrendingUp, Clock, Briefcase } from "lucide-react";
import { PainBubble } from "../ui";

export const Pain = () => {
  return (
    <section className="py-16 bg-gray-900 text-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          こんな<span className="text-red-400 border-b-2 border-red-400">「見えない悩み」</span>を
          <br className="md:hidden" />
          抱えていませんか？
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <PainBubble
            icon={<AlertTriangle className="text-yellow-400 w-6 h-6 shrink-0" />}
            title="ただの「検索ツール」になっている"
            text="ChatGPT、すごいのは分かるけど…結局、Google検索の代わりくらいにしか使えていない。業務が劇的に楽になった実感がない。"
            align="left"
          />
          <PainBubble
            icon={<TrendingUp className="text-blue-400 w-6 h-6 shrink-0" />}
            title="稼げるイメージが湧かない"
            text="『AI副業で月◯万！』という広告はよく見るけど、具体的にどうやって案件を取るの？怪しい情報ばかりで、正しい一歩目が分からない。"
            align="right"
          />
          <PainBubble
            icon={<Clock className="text-red-400 w-6 h-6 shrink-0" />}
            title="情報の落とし込み方が分からない"
            text="情報は追ってるけど、自分の仕事への活かし方が分からない。『もっと上手く使えそう』という感覚だけが残ってモヤモヤする。"
            align="left"
          />
          <PainBubble
            icon={<Briefcase className="text-purple-400 w-6 h-6 shrink-0" />}
            title="将来性への漠然とした不安"
            text="「AI時代に仕事がなくなる」というニュースを見て、自分の職種の将来性に不安を感じている。このままでいいのか確認したい。"
            align="right"
          />
        </div>

        <div className="text-center max-w-2xl mx-auto bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <p className="text-lg md:text-xl leading-relaxed font-medium text-slate-200">
            その悩み、決してあなたの能力不足ではありません。
            <br />
            ただ、<span className="text-yellow-400 font-bold text-2xl">「正しい勝ちパターン」</span>
            を知らないだけです。
          </p>
        </div>
      </div>
    </section>
  );
};
