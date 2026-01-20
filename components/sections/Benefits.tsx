"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Gift, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Smooth Reveal Component (アニメーション用)
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const Benefits = () => {
  const { theme } = useTheme();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const benefitSets = [
    {
      title: "即金・マネタイズセット",
      color: "from-blue-400 to-cyan-400",
      items: [
        "初心者向けAI副業案件ロードマップ",
        "採用率3倍！AI提案文テンプレート",
        "SNSバズ投稿生成プロンプト",
      ],
    },
    {
      title: "業務効率化・時短セット",
      color: "from-purple-400 to-indigo-400",
      items: [
        "Excel×AI 自動化関数マニュアル",
        "パワポ一発出力ガイド",
        "議事録・メール作成3分時短術",
      ],
    },
    {
      title: "キャリア武装セット",
      color: "from-orange-400 to-red-400",
      items: [
        "深津式プロンプト解説BOOK",
        "AI時代未来予測レポート",
        "神AIツール カオスマップ",
      ],
    },
  ];

  return (
    <section className={`py-20 ${theme.benefits.bg} overflow-hidden relative`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* ヘッダー部分 */}
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-4 py-1 rounded-full mb-4 shadow-lg">
            参加者限定 無料プレゼント
          </span>
          {/* モバイル表示 */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="relative w-32 h-32 flex-shrink-0">
              <Image
                src={`${basePath}/images/2.png`}
                alt="プレゼントボックス"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                総額29,800円相当
                <br />
                豪華15大特典
              </h2>
            </div>
          </div>

          {/* PC表示 */}
          <div className="hidden md:block">
            <div className="text-center">
              <div className="relative inline-block">
                <div
                  className="absolute"
                  style={{
                    width: "115px",
                    height: "115px",
                    transform: "rotate(-10deg)",
                    top: "50%",
                    right: "100%",
                    marginTop: "-57.5px",
                    marginRight: "0.5em",
                  }}
                >
                  <Image
                    src={`${basePath}/images/2.png`}
                    alt="プレゼントボックス"
                    fill
                    className="object-contain"
                  />
                </div>
                <div
                  className="absolute"
                  style={{
                    width: "115px",
                    height: "115px",
                    transform: "rotate(10deg)",
                    top: "50%",
                    left: "100%",
                    marginTop: "-57.5px",
                    marginLeft: "0.5em",
                  }}
                >
                  <Image
                    src={`${basePath}/images/2.png`}
                    alt="プレゼントボックス"
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                  総額29,800円相当
                  <br />
                  豪華15大特典
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* メインコンテンツ: 2カラムグリッド */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 左側：特典リスト */}
          <div className="space-y-4">
            {benefitSets.map((set, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div
                    className={`px-6 py-3 bg-gradient-to-r ${set.color} text-white font-bold flex items-center gap-2`}
                  >
                    <Gift className="w-5 h-5" />
                    {set.title}
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {set.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-slate-600 text-sm"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 右側：Special Gift */}
          <Reveal delay={400} className="flex flex-col justify-center h-full">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center relative overflow-hidden group shadow-lg h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4">
                  <div className="inline-block bg-yellow-400 text-slate-900 text-xs font-black px-3 py-1 rounded mb-4 uppercase tracking-wider">
                    Special Gift
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    【当日作成】
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                      あなた専用 職種別AIロードマップ
                    </span>
                  </h3>
                </div>

                {/* 画像エリア */}
                <div className="w-full max-w-sm mx-auto my-6 relative rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={`${basePath}/images/1.png`}
                    alt="あなた専用 職種別AIロードマップ イメージ"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <p className="text-sm text-slate-500 mt-auto">
                  ※あなたのお話を聞かないと作れないため、
                  <br />
                  個別相談限定でのプレゼントとなります。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
