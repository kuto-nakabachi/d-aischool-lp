"use client";

import React from "react";
import Image from "next/image";
import { AlertTriangle, TrendingUp, Clock, Briefcase } from "lucide-react";
import { PainBubble } from "../ui";
import { useTheme } from "@/contexts/ThemeContext";

export const Pain = () => {
  const { theme } = useTheme();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className={`py-16 ${theme.pain.bg} ${theme.pain.text} relative overflow-hidden`}>
      {/* 背景画像 - PC用 */}
      <div
        className="hidden md:block absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          bottom: "170px"
        }}
      >
        <Image
          src={`${basePath}/images/image_010.svg`}
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>
      {/* 背景画像 - スマホ用 */}
      <div
        className="md:hidden absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          bottom: "240px"
        }}
      >
        <Image
          src={`${basePath}/images/image_011.svg`}
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          こんな<span className={`${theme.pain.accent} border-b-2`} style={{ borderColor: 'currentColor' }}>「見えない悩み」</span>を
          <br className="md:hidden" />
          抱えていませんか？
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <PainBubble
            icon={<AlertTriangle className={`${theme.pain.accent} w-6 h-6 shrink-0`} />}
            title={<span className="bg-blue-100 text-blue-700 px-1 rounded font-bold">ただの「検索ツール」になっている</span>}
            text="ChatGPT、すごいのは分かるけど…結局、Google検索の代わりくらいにしか使えていない。業務が劇的に楽になった実感がない。"
            align="left"
            theme={theme}
          />
          <PainBubble
            icon={<TrendingUp className={`${theme.pain.accent} w-6 h-6 shrink-0`} />}
            title={<span className="bg-blue-100 text-blue-700 px-1 rounded font-bold">稼げるイメージが湧かない</span>}
            text="『AI副業で月◯万！』という広告はよく見るけど、具体的にどうやって案件を取るの？怪しい情報ばかりで、正しい一歩目が分からない。"
            align="right"
            theme={theme}
          />
          <PainBubble
            icon={<Clock className={`${theme.pain.accent} w-6 h-6 shrink-0`} />}
            title={<span className="bg-blue-100 text-blue-700 px-1 rounded font-bold">情報の落とし込み方が分からない</span>}
            text="情報は追ってるけど、自分の仕事への活かし方が分からない。『もっと上手く使えそう』という感覚だけが残ってモヤモヤする。"
            align="left"
            theme={theme}
          />
          <PainBubble
            icon={<Briefcase className={`${theme.pain.accent} w-6 h-6 shrink-0`} />}
            title={<span className="bg-blue-100 text-blue-700 px-1 rounded font-bold">将来性への漠然とした不安</span>}
            text="「AI時代に仕事がなくなる」というニュースを見て、自分の職種の将来性に不安を感じている。このままでいいのか確認したい。"
            align="right"
            theme={theme}
          />
        </div>

        <div className={`text-center max-w-2xl mx-auto ${theme.pain.bubble} p-6 rounded-2xl border`}>
          <p className="text-lg md:text-xl leading-relaxed font-medium">
            その悩み、決してあなたの能力不足ではありません。
            <br />
            ただ、<span className="bg-blue-100 text-blue-700 px-1 rounded font-bold text-2xl">「正しい勝ちパターン」</span>
            を知らないだけです。
          </p>
        </div>
      </div>
    </section>
  );
};
