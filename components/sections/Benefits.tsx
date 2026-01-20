"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp, Clock, ShieldCheck } from "lucide-react";
import { BenefitCategory } from "../ui";
import { useTheme } from "@/contexts/ThemeContext";

export const Benefits = () => {
  const { theme } = useTheme();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className={`py-20 ${theme.benefits.bg} overflow-hidden relative`}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-4 py-1 rounded-full mb-4 shadow-lg">
            参加者限定 無料プレゼント
          </span>
          {/* モバイル表示: 画像1つ + テキスト縦並び */}
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
              <p className="mt-4 text-slate-600">
                通常は有料講座で配布している資料を含みます。
                <br />
                個別相談の参加者に
                <span className="text-blue-600 font-bold border-b-2 border-blue-400">無料</span>
                でプレゼント。
              </p>
            </div>
          </div>

          {/* PC表示: 両サイドに画像、中央にテキスト */}
          <div className="hidden md:block">
            <div className="text-center">
              <div className="relative inline-block">
                {/* 左のプレゼントボックス */}
                <div
                  className="absolute"
                  style={{
                    width: "115px",
                    height: "115px",
                    transform: "rotate(-10deg)",
                    top: "50%",
                    right: "100%",
                    marginTop: "-57.5px",
                    marginRight: "0.5em"
                  }}
                >
                  <Image
                    src={`${basePath}/images/2.png`}
                    alt="プレゼントボックス"
                    fill
                    className="object-contain"
                  />
                </div>
                {/* 右のプレゼントボックス */}
                <div
                  className="absolute"
                  style={{
                    width: "115px",
                    height: "115px",
                    transform: "rotate(10deg)",
                    top: "50%",
                    left: "100%",
                    marginTop: "-57.5px",
                    marginLeft: "0.5em"
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
              <p className="mt-4 text-slate-600">
                通常は有料講座で配布している資料を含みます。
                個別相談の参加者に
                <span className="text-blue-600 font-bold border-b-2 border-blue-400">無料</span>
                でプレゼント。
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 特典カテゴリ1 */}
          <BenefitCategory
            icon={<TrendingUp className="w-6 h-6 text-sky-900" />}
            step="第1弾"
            title="即金・マネタイズ・副業セット"
            subtitle="すぐに成果を出したいあなたへ（最も引きの強い「お金」に関する特典）"
            color="bg-gradient-to-r from-sky-400 to-cyan-500"
            items={[
              <>初心者でも<b>月5万</b>〜目指せる「AI副業案件」獲得ロードマップ</>,
              <><b>採用率3倍！</b>クラウドソーシング「AI提案文」テンプレート</>,
              <><b>【コピペでOK】</b>SNS運用代行で使える「バズる投稿生成」プロンプト</>,
              <>0→1を最速突破<b>「AIマネタイズ」</b>ジャンル選定チェックリスト</>,
              <>競合不在！「AI×〇〇」掛け合わせ<b>ブルーオーシャン事例集20選</b></>,
            ]}
          />

          {/* 特典カテゴリ2 */}
          <BenefitCategory
            icon={<Clock className="w-6 h-6 text-blue-900" />}
            step="第2弾"
            title="残業ゼロ・業務効率化セット"
            subtitle="面倒な作業から解放されたいあなたへ（「楽をする」ための本能的特典）"
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            items={[
              <>Excel/スプレッドシート×AI<b>「自動化関数」</b>完全マニュアル</>,
              <><b>資料作成10倍速！</b>パワポ「構成〜デザイン」一発出力ガイド</>,
              <>議事録・メール作成を<b>3分で終わらせる</b>「即戦力」プロンプト集</>,
              <>情報の信憑性を担保する<b>「AI検索・分析」テクニック</b></>,
              <>長文・動画を一瞬で要約「超・要約」<b>魔法の命令文</b></>,
            ]}
          />

          {/* 特典カテゴリ3 */}
          <BenefitCategory
            icon={<ShieldCheck className="w-6 h-6 text-indigo-900" />}
            step="第3弾"
            title="キャリア武装・スキルアップセット"
            subtitle="時代に置いていかれたくないあなたへ（「権威性」と「将来の安心」）"
            color="bg-gradient-to-r from-indigo-500 to-violet-500"
            items={[
              <>AIから120%の回答を引き出す<b>「深津式・7つの公式」解説</b>BOOK</>,
              <>生き残る職種・消える職種<b>「AI時代未来予測レポート」</b></>,
              <>プロンプトエンジニア愛用<b>「神AIツール」</b>カオスマップ</>,
              <><b>独学100時間を1時間に。</b>「Chrome拡張機能」厳選10選</>,
            ]}
          />

          {/* Last Special Gift */}
          <div className="transform md:scale-105">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-1 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-6 md:p-8 text-center border border-blue-100 relative">
                {/* PC表示のみ: 左側の画像（lg以上で表示） */}
                <div
                  className="hidden lg:block absolute"
                  style={{
                    width: "189px",
                    height: "216px",
                    left: "-9px",
                    top: "50%",
                    marginTop: "-90px"
                  }}
                >
                  <Image
                    src={`${basePath}/images/1.png`}
                    alt="AIキャリアロードマップ"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded mb-4">
                  Special Gift
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-slate-800 mb-2">
                  【当日作成】あなたの強みをAIで換金する
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">『職種別 AIキャリアロードマップ』</span>
                </h3>
                <p className="text-slate-600 text-sm md:text-base mt-4">
                  ※今の仕事ですぐに使える具体的なプロンプト事例も、その場で伝授します。
                  <br />
                  あなたのお話を聞かないと作れないため、個別相談限定となります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
