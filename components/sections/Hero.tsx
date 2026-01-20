"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export const Hero = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <>
      {/* PC表示用 */}
      <section className="hidden md:block relative min-h-[50rem] h-[95vh]">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src={`${basePath}/images/firstview_pc.webp`}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* コンテンツラッパー */}
        <div className="relative z-10 h-full container mx-auto px-8 lg:px-16 flex items-center justify-start">
          <div className="text-center mt-[5vh]" style={{ marginLeft: "-100px" }}>
            {/* メインキャッチコピー */}
            <h1 className="font-black text-slate-800 leading-[1.3]" style={{ fontSize: "clamp(1.875rem, 1rem + 3vw, 3rem)" }}>
              あなた専用の
              <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,_#1e40af,_#3b82f6)]">
                AI×キャリアロードマップ
              </span>
              <br />
              <span className="whitespace-nowrap">プロが無料で作成</span>
            </h1>

            {/* サブキャッチコピー */}
            <p className="mt-4 text-slate-600 tracking-wide" style={{ fontSize: "clamp(0.875rem, 0.5rem + 1vw, 1.125rem)" }}>
              プロのメンターがあなただけのAIキャリアロードマップを作成
            </p>

            {/* CTAボタン */}
            <div className="mt-8">
              <Link
                href="/booking"
                data-hero-cta
                className="inline-flex flex-col items-center bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[2px] transition-all"
                style={{ fontSize: "clamp(1rem, 0.5rem + 1.5vw, 1.375rem)" }}
              >
                <span className="flex items-center gap-2 tracking-wider">
                  【無料】まずは話を聞いてみる
                  <Play className="w-5 h-5 fill-current" />
                </span>
              </Link>
            </div>

            {/* 注記 */}
            <p className="mt-6 text-base text-slate-500 leading-relaxed">
              ※総額29,800円相当の豪華10大特典
              <br />
              【個別相談参加者限定】無料配布中
            </p>
          </div>
        </div>
      </section>

      {/* スマホ表示用 */}
      <section className="md:hidden relative">
        {/* 背景画像 */}
        <Image
          src={`${basePath}/images/firstview_sp.webp`}
          alt=""
          width={750}
          height={1334}
          className="w-full h-auto"
          priority
        />

        {/* オーバーレイコンテンツ（下半分） */}
        <div className="absolute left-0 right-0 h-1/2 flex flex-col justify-end px-4 pb-8" style={{ bottom: "60px", marginLeft: "20px" }}>
          <div className="text-center">
            <h1 className="text-[6.5vw] font-black text-slate-800 leading-[1.3]">
              あなた専用の
              <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,_#1e40af,_#3b82f6)]">
                AI×キャリアロードマップ
              </span>
              <br />
              プロが無料で作成
            </h1>
            <p className="mt-2 text-[3.5vw] text-slate-600">
              プロのメンターがあなただけの
              <br />
              AIキャリアロードマップを作成
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col items-center">
              <Link
                href="/booking"
                data-hero-cta
                className="w-full max-w-xs bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex flex-col items-center"
              >
                <span className="flex items-center gap-2 text-base tracking-wider">
                  【無料】まずは話を聞いてみる
                  <Play className="w-4 h-4 fill-current" />
                </span>
              </Link>
              <p className="mt-4 text-base text-slate-500 text-center leading-relaxed">
                ※総額29,800円相当の豪華10大特典
                <br />
                【個別相談参加者限定】無料配布中
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
