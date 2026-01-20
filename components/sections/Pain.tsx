"use client";

import React from "react";
import Image from "next/image";
import { Search, Wallet, Puzzle, TrendingDown, LucideIcon } from "lucide-react";

export const Pain = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const content = {
    items: [
      {
        icon: Search,
        title: "ただの「検索ツール」止まり",
        desc: "ChatGPT、すごいのは分かるけど…結局、Google検索の代わりくらいにしか使えていない。業務が劇的に楽になった実感がない。",
      },
      {
        icon: Wallet,
        title: "稼げるイメージが湧かない",
        desc: "『AI副業で月◯万！』という広告はよく見るけど、具体的にどうやって案件を取るの？怪しい情報ばかりで、正しい一歩目が分からない。",
      },
      {
        icon: Puzzle,
        title: "情報の落とし込み方が不明",
        desc: "情報は追ってるけど、自分の仕事への活かし方が分からない。『もっと上手く使えそう』という感覚だけが残ってモヤモヤする。",
      },
      {
        icon: TrendingDown,
        title: "将来性への漠然とした不安",
        desc: "「AI時代に仕事がなくなる」というニュースを見て、自分の職種の将来性に不安を感じている。このままでいいのか確認したい。",
      }
    ] as { icon: LucideIcon; title: string; desc: string }[],
    footer: {
      main: "その悩み、決してあなたの能力不足ではありません。",
      sub: "ただ、「正しい勝ちパターン」を知らないだけです。"
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-800 relative overflow-hidden">
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
        <div className="max-w-4xl mx-auto">

          {/* ヘッダーセクション */}
          <div className="text-center mb-12">
            <span className="bg-blue-50 text-blue-700 font-bold px-4 py-1 rounded-full text-sm inline-block mb-4">
              Warning
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">
              AIのこんな「見えない悩み」を<br className="md:hidden" />抱えていませんか？
            </h2>
          </div>

          {/* カードセクション（背景アイコン付き） */}
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {content.items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-50 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* 背景アイコン */}
                  <IconComponent className="absolute right-4 top-4 w-24 h-24 text-slate-200/50 group-hover:text-blue-200/50 transition-colors duration-300" />

                  {/* コンテンツ */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl font-black text-slate-200 group-hover:text-blue-300 transition-colors duration-300">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* フッターセクション */}
          <div className="text-center">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20"></div>
              <div className="relative bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
                  {content.footer.main}
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto my-3 rounded-full"></div>
                <p className="text-blue-600 font-bold text-base">
                  {content.footer.sub}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
