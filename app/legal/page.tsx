"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Building2,
  User,
  Phone,
  Globe,
  CreditCard,
  RefreshCw,
  AlertCircle,
  Laptop,
  Clock,
} from "lucide-react";

// サブコンポーネント: リストアイテム
const LegalItem = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col md:flex-row p-6 md:p-8 hover:bg-slate-50/50 transition-colors">
    <div className="md:w-1/3 flex items-start gap-3 mb-3 md:mb-0">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <h3 className="font-bold text-slate-900 text-sm md:text-base">{title}</h3>
    </div>
    <div className="md:w-2/3 text-sm md:text-base leading-relaxed text-slate-700">
      {children}
    </div>
  </div>
);

export default function LegalPage() {
  return (
    <div className="font-sans text-slate-700 bg-slate-50 antialiased min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl md:text-2xl text-slate-900 tracking-tighter">
            D-AI<span className="text-orange-500">スクール</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            TOPへ戻る
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* タイトルエリア */}
          <div className="bg-slate-900 text-white p-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              特定商取引法に基づく表記
            </h1>
            <p className="text-slate-400 text-xs md:text-sm">
              Law concerning examination of Specific Commercial Transactions
            </p>
          </div>

          {/* 表記エリア */}
          <div className="divide-y divide-slate-100">
            <LegalItem
              icon={<Building2 className="w-5 h-5 text-slate-400" />}
              title="販売業者"
            >
              D株式会社
            </LegalItem>

            <LegalItem
              icon={<User className="w-5 h-5 text-slate-400" />}
              title="運営統括責任者"
            >
              堀田 航真
            </LegalItem>

            <LegalItem
              icon={<MapPin className="w-5 h-5 text-slate-400" />}
              title="所在地"
            >
              〒169-0075
              <br />
              東京都新宿区高田馬場1-24-16 内田ビル6階
            </LegalItem>

            <LegalItem
              icon={<Phone className="w-5 h-5 text-slate-400" />}
              title="電話番号"
            >
              <span className="text-slate-500 text-sm">
                ※電話番号については、下記お問い合わせ先メールアドレスにご請求いただければ、遅滞なく開示いたします。
              </span>
            </LegalItem>

            <LegalItem
              icon={<Mail className="w-5 h-5 text-slate-400" />}
              title="メールアドレス"
            >
              <a
                href="mailto:contact@decentralizedpro.io"
                className="text-blue-600 font-medium hover:underline"
              >
                contact@decentralizedpro.io
              </a>
              <p className="text-xs text-slate-500 mt-1">
                ※お問い合わせはメールにて受け付けております。
              </p>
            </LegalItem>

            <LegalItem
              icon={<Globe className="w-5 h-5 text-slate-400" />}
              title="販売価格"
            >
              各商品ページに記載されている価格とします。
              <br />
              <span className="text-xs text-slate-500">
                ※表示価格は消費税を含みます。
              </span>
            </LegalItem>

            <LegalItem
              icon={<AlertCircle className="w-5 h-5 text-slate-400" />}
              title="商品代金以外の必要料金"
            >
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>銀行振込の場合：振込手数料</li>
                <li>
                  クレジットカードの分割決済を選択された場合：カード会社所定の分割手数料
                </li>
                <li>
                  当社のサービスを利用するために必要なインターネット接続料金、通信料金、およびPC・スマートフォン等の機器代金
                </li>
              </ul>
            </LegalItem>

            <LegalItem
              icon={<CreditCard className="w-5 h-5 text-slate-400" />}
              title="お支払い方法"
            >
              <div className="space-y-4">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">
                    クレジットカード決済
                  </span>
                  <p className="text-sm text-slate-600">
                    VISA / Master / JCB / AMEX / Diners がご利用いただけます。
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-1">
                    銀行振込
                  </span>
                  <p className="text-sm text-slate-600">
                    当社指定の銀行口座へお振込みください。
                  </p>
                </div>
              </div>
            </LegalItem>

            <LegalItem
              icon={<Clock className="w-5 h-5 text-slate-400" />}
              title="お支払い時期"
            >
              <div className="space-y-2">
                <p>
                  <span className="font-bold text-xs text-slate-500 uppercase mr-2">
                    クレジットカード
                  </span>
                  各カード会社の引き落とし日となります。
                </p>
                <p>
                  <span className="font-bold text-xs text-slate-500 uppercase mr-2">
                    銀行振込
                  </span>
                  お申し込みから3営業日以内にお振込みください。
                </p>
              </div>
            </LegalItem>

            <LegalItem
              icon={<Laptop className="w-5 h-5 text-slate-400" />}
              title="引渡し時期"
            >
              決済完了（または入金確認）後、即時に受講案内メールをお送りし、会員サイト等のご利用が可能になります。
              <br />
              <span className="text-xs text-slate-500">
                ※個別診断等の役務については、ご予約いただいた日時に提供いたします。
              </span>
            </LegalItem>

            <LegalItem
              icon={<RefreshCw className="w-5 h-5 text-slate-400" />}
              title="返品・キャンセル"
            >
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-slate-800 text-sm block mb-1">
                    クーリングオフについて
                  </span>
                  <p className="text-sm text-slate-600">
                    特定商取引法に規定されているクーリングオフが適用されるサービスではありません。
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 text-sm block mb-1">
                    返品・返金について
                  </span>
                  <p className="text-sm text-slate-600">
                    本サービスはデジタルコンテンツおよび情報提供サービスという性質上、原則として決済完了後の返品・キャンセル・返金はお受けできません。ご不明な点は、お申し込み前に無料個別診断等にて十分にご確認ください。
                  </p>
                </div>
              </div>
            </LegalItem>

            <LegalItem
              icon={<Laptop className="w-5 h-5 text-slate-400" />}
              title="動作環境"
            >
              本サービスの受講には、インターネットに接続されたPC（Windows/Mac）またはスマートフォン・タブレットが必要です。
              <br />
              <span className="text-xs text-slate-500">
                推奨環境：Google Chrome 最新版、Zoomアプリ等
              </span>
            </LegalItem>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-xs md:text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 D-AI School. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
