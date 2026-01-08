"use client";

import React from "react";
import { TrendingUp, Clock, ShieldCheck } from "lucide-react";
import { BenefitCategory } from "../ui";

export const Benefits = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-yellow-500 text-slate-900 font-bold px-4 py-1 rounded-full mb-4 shadow-lg transform -rotate-2">
            参加者限定 無料プレゼント
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-500 drop-shadow-sm">
            総額29,800円相当
            <br />
            豪華15大特典
          </h2>
          <p className="mt-4 text-slate-300">
            通常は有料講座で配布している資料を含みます。
            <br className="md:hidden" />
            個別相談に参加された方に
            <span className="text-white font-bold border-b border-yellow-500">無料</span>
            で差し上げます。
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 特典カテゴリ1 */}
          <BenefitCategory
            icon={<TrendingUp className="w-6 h-6 text-yellow-900" />}
            step="第1弾"
            title="即金・マネタイズ・副業セット"
            subtitle="すぐに成果を出したいあなたへ（最も引きの強い「お金」に関する特典）"
            color="bg-gradient-to-r from-yellow-400 to-yellow-600"
            items={[
              "初心者でも月5万〜目指せる「AI副業案件」獲得ロードマップ",
              "採用率3倍！クラウドソーシング「AI提案文」テンプレート",
              "【コピペでOK】SNS運用代行で使える「バズる投稿生成」プロンプト",
              "0→1を最速突破「AIマネタイズ」ジャンル選定チェックリスト",
              "競合不在！「AI×〇〇」掛け合わせブルーオーシャン事例集20選",
            ]}
          />

          {/* 特典カテゴリ2 */}
          <BenefitCategory
            icon={<Clock className="w-6 h-6 text-blue-900" />}
            step="第2弾"
            title="残業ゼロ・業務効率化セット"
            subtitle="面倒な作業から解放されたいあなたへ（「楽をする」ための本能的特典）"
            color="bg-gradient-to-r from-blue-400 to-blue-600"
            items={[
              "Excel/スプレッドシート×AI「自動化関数」完全マニュアル",
              "資料作成10倍速！パワポ「構成〜デザイン」一発出力ガイド",
              "議事録・メール作成を3分で終わらせる「即戦力」プロンプト集",
              "情報の信憑性を担保する「AI検索・分析」テクニック",
              "長文・動画を一瞬で要約「超・要約」魔法の命令文",
            ]}
          />

          {/* 特典カテゴリ3 */}
          <BenefitCategory
            icon={<ShieldCheck className="w-6 h-6 text-emerald-900" />}
            step="第3弾"
            title="キャリア武装・スキルアップセット"
            subtitle="時代に置いていかれたくないあなたへ（「権威性」と「将来の安心」）"
            color="bg-gradient-to-r from-emerald-400 to-emerald-600"
            items={[
              "AIから120%の回答を引き出す「深津式・7つの公式」解説BOOK",
              "生き残る職種・消える職種「AI時代未来予測レポート」",
              "プロンプトエンジニア愛用「神AIツール」カオスマップ",
              "独学100時間を1時間に。「Chrome拡張機能」厳選10選",
            ]}
          />

          {/* Last Special Gift */}
          <div className="transform md:scale-105">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-1 rounded-2xl shadow-2xl">
              <div className="bg-slate-900 rounded-xl p-6 md:p-8 text-center border border-white/10">
                <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-4">
                  Special Gift
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                  【当日作成】あなたの強みをAIで換金する
                  <br />
                  <span className="text-yellow-400">『職種別 AIキャリアロードマップ』</span>
                </h3>
                <p className="text-slate-300 text-sm md:text-base mt-4">
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
