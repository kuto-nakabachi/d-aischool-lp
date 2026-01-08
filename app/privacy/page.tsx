"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  Clock,
  MapPin,
  Building2,
} from "lucide-react";

// サブコンポーネント: セクションラッパー
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="scroll-mt-20">
    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
      {title}
    </h2>
    <div className="text-slate-700">{children}</div>
  </section>
);

// サブコンポーネント: サブセクション
const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h5 className="font-bold text-slate-900 mb-1">{title}</h5>
    <div className="pl-4 border-l-2 border-slate-100">{children}</div>
  </div>
);

export default function PrivacyPolicyPage() {
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
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* タイトルエリア */}
          <div className="bg-slate-900 text-white p-8 md:p-12 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              プライバシーポリシー
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              お客様の個人情報の取り扱いについて
            </p>
          </div>

          {/* 本文エリア */}
          <div className="p-6 md:p-12 space-y-10 leading-relaxed">
            <section>
              <p className="mb-4">
                このプライバシーポリシー（以下「本ポリシー」といいます。）は、D株式会社（〒169-0075
                東京都新宿区高田馬場1-24-16
                内田ビル6階　代表取締役　堀田航真　以下「当社」といいます。）が運営するAIスクール事業「D-AIスクール」およびそれに関連するサービス（以下「本サービス」といいます。）におけるお客様に関する情報の取り扱いについて説明させていただくものです。
              </p>
              <p>
                当社は、本ウェブサイト上で提供するサービスにおける、ユーザーの個人情報の取扱いについて以下のとおりプライバシーポリシーを定めます。
              </p>
            </section>

            <Section title="1. 適用範囲">
              <p className="mb-4">
                本ポリシーは、本サービスの利用に関し適用されます。また、当社が、本サービス上に掲載するプライバシーポリシーその他の個人情報保護方針又は利用規約等においてユーザー情報の取扱いについて規定する場合、当該規定も適用されるものとし、当該規定が本ポリシーと抵触する場合には、本ポリシーが優先されるものとします。
              </p>
              <p>
                当社が本サービスに関して提携する外部のサービスその他当社以外の者が提供するサービス（以下「提携サービス等」といいます。）については、本ポリシーの規定は適用されません。提携サービス等におけるお客様情報の取扱いについては、当該提携サービス等を提供する事業者が別途定めるプライバシーポリシー等をご参照ください。
              </p>
            </Section>

            <Section title="2. 当社が取得する情報">
              <p className="mb-4">
                当社は、次条に定める利用目的を達成するため、本サービスのお客様及び受講希望者（以下「お客様」といいます。）に関する個人情報（個人情報保護法第2条第1項により定義された「個人情報」をいい、以下同様とします。）を含む次に定める情報（以下「お客様情報」といいます。）を取得します。
              </p>

              <h4 className="font-bold text-slate-900 mb-2 mt-6">
                (1) 本サービスの利用にあたりお客様にご提供いただく情報
              </h4>
              <ul className="list-disc pl-5 space-y-1 mb-4 text-sm md:text-base">
                <li>氏名、生年月日、性別、職業</li>
                <li>メールアドレス、電話番号、郵便番号、住所</li>
                <li>
                  クレジットカード情報、銀行口座情報（有料サービスの利用時）
                </li>
                <li>
                  その他本サービスにおいて当社が指定する情報（アンケート回答、ヒアリングシート等）
                </li>
              </ul>

              <h4 className="font-bold text-slate-900 mb-2 mt-6">
                (2) 本サービスの利用にあたり当社が収集する情報
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                <li>
                  端末ID（デバイスID）、IPアドレス、端末位置情報、サーバーアクセスログ情報、Cookie
                </li>
                <li>
                  その他本サービスにおいてユーザーが送信する情報（検索履歴、テキストデータ、画像、動画、本サービスへの投稿、学習進捗データ等）
                </li>
                <li>
                  ユーザーの同意に基づき提携サービス等から取得する情報（提携サービス等におけるユーザーのID等）
                </li>
              </ul>
            </Section>

            <Section title="3. 利用目的">
              <h4 className="font-bold text-slate-900 mb-2">
                (1)
                当社は、ユーザー情報を、次の各号に定める目的の範囲内で、適正に取り扱います。
              </h4>
              <ul className="list-disc pl-5 space-y-1 mb-6 text-sm md:text-base">
                <li>お客様の本人確認のため</li>
                <li>
                  本サービス（スクール受講、個別診断、セミナー等）の提供・運営のため
                </li>
                <li>
                  有料サービスにおいて、ユーザーに利用料金を請求するため
                </li>
                <li>
                  本サービスに関するご案内、お問い合わせ等への対応のため
                </li>
                <li>
                  本サービスに関する利用規約又は本ポリシーの変更、本サービスの停止・中止・契約解除その他本サービスに関する重要なお知らせ等の通知のため
                </li>
                <li>
                  本サービスの維持、改善及び新たなサービス等を検討するため
                </li>
                <li>本サービスの利用状況等を調査及び分析するため</li>
                <li>
                  以下の方法による広告配信を行うため
                  <ul className="list-circle pl-5 mt-1 text-slate-600">
                    <li>
                      本サービスで取り扱う当社又は第三者の商品・サービスに関する広告
                    </li>
                    <li>
                      当社以外の第三者からCookieにより収集されたウェブの閲覧履歴及びその分析結果を取得し、これを当社が取得したお客様個人データを結び付けた広告
                    </li>
                    <li>
                      GoogleやYahoo!等の広告配信事業者を利用した行動ターゲティング広告
                    </li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-bold text-slate-900 mb-2">
                (2) 利用目的の変更
              </h4>
              <p>
                当社は、前項の利用目的を、変更前の利用目的と関連性を有すると合理的に認められる範囲内において変更することがあり、変更した場合には、ユーザーに対し、通知又は本サービス上若しくは当社の運営するウェブサイトでの掲示その他分かりやすい方法により公表します。
              </p>
            </Section>

            <Section title="4. 情報収集モジュールの利用について">
              <p className="mb-4">
                本サービスには、本サービスの利用状況及び広告効果等の情報を解析するため、当社が選定する以下の情報収集モジュールが組み込まれています。これに伴い、当社は、以下の情報収集モジュールの提供者（日本国外にある者を含みます。）に対しお客様情報の提供を行う場合があります。これらの情報収集モジュールは、個人を特定する情報を含むことなくユーザー情報を収集し、収集された情報は、各情報収集モジュール提供者の定めるプライバシーポリシーその他の規定に基づき管理されます。
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h5 className="font-bold text-slate-900 mb-2">
                  Google Analytics
                </h5>
                <ul className="text-sm space-y-1">
                  <li>提供者：Google Inc.</li>
                  <li>
                    <a
                      href="http://www.google.com/analytics/terms/jp.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      利用規約 <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.google.com/intl/ja/policies/privacy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      プライバシーポリシー <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                </ul>
              </div>
            </Section>

            <Section title="5. 行動ターゲティング広告">
              <p className="mb-4">
                当社では、下記の広告配信事業者が提供するプログラムを利用し、特定のサイトにおいて行動ターゲティング広告を行っています。当該広告の配信のために、広告配信事業者は、お客様のサイト訪問履歴情報を採取するため情報収集モジュールとしてCookieを使用し、お客様の当ウェブサイトへの過去のアクセス情報に基づいて広告を配信します。
                <br />
                なお、当該広告事業者における当該情報の利用目的等は後掲1「行動ターゲティング広告について」記載のとおりです。広告の無効化等については各広告事業者の取扱いをご覧ください。
              </p>
            </Section>

            <Section title="6. 第三者提供">
              <ol className="list-decimal pl-5 space-y-2 text-sm md:text-base">
                <li>
                  当社は、本人の同意を得ずに、個人データ（個人情報保護法により定義された「個人データ」をいい、以下同様とします。）を第三者に提供しません。
                </li>
                <li>
                  次に掲げる場合において、当該個人データの提供を受ける者は、前項の規定の適用については、第三者に該当しないものとします。
                  <ul className="list-disc pl-5 mt-1 text-slate-600">
                    <li>
                      個人情報取扱事業者が利用目的の達成に必要な範囲内において個人データの取扱いの全部又は一部を委託することに伴って当該個人データが提供される場合
                    </li>
                    <li>
                      合併その他の事由による事業の承継に伴って個人データが提供される場合
                    </li>
                  </ul>
                </li>
              </ol>
            </Section>

            <Section title="7. 外国の第三者への提供">
              <p>
                当社は、個人情報保護法その他の法令に基づく場合を除き、本人の同意を得ずに、個人データ（個人情報保護法により定義された「個人データ」をいい、以下同様とします。）を外国に提供しません。
              </p>
            </Section>

            <Section title="8. 保有個人データの開示・訂正等の権利">
              <p>
                当社は、お客様から、保有個人データ（個人情報保護法第2条第7項により定義された「保有個人データ」をいい、以下同様とします。）の利用目的の通知、保有個人データの開示、保有個人データの内容の訂正、追加又は削除、保有個人データの利用の停止又は消去（以下「開示等」といいます。）を求められたときは、お客様ご本人からのご請求であることを確認の上で、遅滞なく対応いたします。但し、個人情報保護法を含む法令により当社がこれらの義務を負わない場合については、この限りではありません。
              </p>
            </Section>

            <Section title="9. 開示等の手続きの方法">
              <ol className="list-decimal pl-5 space-y-2 text-sm md:text-base">
                <li>
                  お客様による前条の開示等の請求は、後記のお問い合わせ窓口宛に、当社指定の「個人情報開示等申請書」を送付する方法でのみ行うものとします。
                </li>
                <li>
                  当社は、個人情報開示等申請書を受領後、当社所有のお客様情報をもとに、本人確認を実施致します。代理人からのお問い合わせの場合、委任状や印鑑証明をもって代理人であることを確認させて頂きます。
                </li>
                <li>
                  保有個人データの利用目的の通知、又は保有個人データの開示の請求若しくは第三者提供記録の開示の請求につきましては、1件あたり1,080円の手数料を頂戴いたします。この手数料は、個人情報開示等申請書に1,080円分の郵便切手を同封していただく方法でお支払い頂きます。
                </li>
                <li>
                  「個人情報開示等申請書」により頂いた個人情報は、お問合わせをいただいたお客様との連絡に使用いたします。それ以外の使用はいたしません。
                </li>
              </ol>
            </Section>

            <Section title="10. 安全管理措置">
              <p className="mb-4">
                当社は、個人データ及び保有個人データ（以下「個人データ等」）について、漏えい、滅失又はき損の防止等、その管理のために必要かつ適切な安全管理措置として以下の措置を講じます。また、個人データを取り扱う従業者や委託先（再委託先等を含みます。）に対して、必要かつ適切な監督を行います。
              </p>

              <div className="space-y-4 text-sm md:text-base">
                <SubSection title="(1) 個人情報保護指針の策定">
                  個人データ等の適正な取扱いの確保のため、個人情報保護方針及び本ポリシーを策定しています。
                </SubSection>
                <SubSection title="(2) 個人データの取扱いに係る規律の整備">
                  個人データ等の取得、利用、保存等を行う場合の基本的な取扱方法を整備しております。
                </SubSection>
                <SubSection title="(3) 組織的安全管理措置">
                  整備した取扱方法に従って個人データ等が取り扱われていることを責任者が確認しております。また、従業者から責任者に対する報告連絡体制を整備しております。
                </SubSection>
                <SubSection title="(4) 人的安全管理措置">
                  個人データ等の取扱いに関する留意事項について、従業者に定期的な研修を実施しています。個人データ等についての秘密保持に関する事項を就業規則に記載しています。
                </SubSection>
                <SubSection title="(5) 物理的安全管理措置">
                  個人データ等を取り扱うことのできる従業者を限定し及び本人以外が容易に個人データを閲覧等できない措置を講じています。個人データ等を取り扱う機器、電子媒体及び書類等の盗難又は紛失等を防止するための措置を講じるとともに、事業所内の移動を含め、当該機器、電子媒体等を持ち運ぶ場合、容易に個人データ等が判明しないよう措置を実施しております。
                </SubSection>
                <SubSection title="(6) 技術的安全管理措置">
                  個人データ等を取り扱うことのできる機器及び当該機器を取り扱う従業者を明確化し、個人データへの不要なアクセスを防止しております。個人データ等を取り扱う機器を外部からの不正アクセス又は不正ソフトウェアから保護する仕組みを導入しております。
                </SubSection>
                <SubSection title="(7) 外的環境の把握">
                  <p className="mb-2">
                    当社では、お客様の個人データ等をGoogle
                    LLCが提供するGoogle Driveにて保管しております。
                    <br />
                    Google
                    LLCはアメリカ合衆国デラウェア州の法律に基づいて設立され、アメリカ合衆国の法律に基づき運営される法人です。
                    <br />
                    当社は、以下の利用規約等に基づき、Google
                    LLCのサービスを利用しています。
                    <br />
                    なお、アメリカ合衆国の個人情報に関する法制度は後掲2「外国の個人情報の保護に関する制度」記載のとおりです。
                  </p>
                  <ul className="text-sm bg-slate-50 p-3 rounded border border-slate-100">
                    <li className="font-bold mb-1">Google LLC</li>
                    <li>
                      <a
                        href="https://policies.google.com/terms"
                        className="text-blue-600 hover:underline"
                      >
                        利用規約
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        プライバシーポリシー
                      </a>
                    </li>
                  </ul>
                </SubSection>
              </div>
            </Section>

            <Section title="11. お問い合わせ">
              <p className="mb-4">
                当社の取り扱うお客様情報に関するご意見、ご質問、開示等の要求、苦情のお申出その他ユーザー情報の取扱いに関するお問い合わせは、以下のお問い合わせ窓口へご連絡ください。
              </p>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-slate-400" />
                  D株式会社　個人情報お問合せ窓口
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-400">
                        メールアドレス
                      </span>
                      <a
                        href="mailto:legal@decentralizedpro.io"
                        className="text-blue-600 font-bold hover:underline"
                      >
                        legal@decentralizedpro.io
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-400">
                        対応可能時間
                      </span>
                      <span className="text-slate-700">
                        平日午前10時～午後5時
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-slate-400">
                        所在地
                      </span>
                      <span className="text-slate-700">
                        〒169-0075 東京都新宿区高田馬場1-24-16 内田ビル6階
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <hr className="border-slate-200 my-10" />

            {/* 補足情報 */}
            <div className="space-y-8 bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200 text-sm">
              <div>
                <h4 className="font-bold text-slate-900 mb-2 border-b border-slate-200 pb-2">
                  後掲1「行動ターゲティング広告について」
                </h4>
                <p className="mb-2">
                  当社の提携先である広告配信事業者は以下のとおりです。広告の無効化等については各広告事業者の取扱いをご覧ください。
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <a
                      href="https://policies.google.com/technologies/ads"
                      className="text-blue-600 hover:underline"
                    >
                      Google LLC
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://btoptout.yahoo.co.jp/optout/index.html"
                      className="text-blue-600 hover:underline"
                    >
                      ヤフー株式会社
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/about/ads"
                      className="text-blue-600 hover:underline"
                    >
                      Meta Platforms, Inc.（Facebook/Instagram）
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 border-b border-slate-200 pb-2">
                  後掲2「外国の個人情報の保護に関する制度」
                </h4>
                <h5 className="font-bold text-slate-800 mt-2 mb-1">
                  1. アメリカ合衆国
                </h5>

                <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-1">
                  <div>
                    <span className="font-bold block text-slate-700">
                      個人情報の保護に関する制度の有無
                    </span>
                    <p className="text-slate-600">
                      包括的な法令は存在しない。個別の分野に適用される法令のうち代表的なものとして、以下の法令が存在する。
                    </p>
                    <ul className="list-disc pl-5 text-slate-600 mt-1">
                      <li>電子通信プライバシー法（ECPA）</li>
                      <li>グラム・リーチ・ブライリー法（GLBA）</li>
                      <li>医療保険の携行性と責任に関する法律（HIPAA）</li>
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold block text-slate-700">
                      個人情報の保護に関する制度についての指標となり得る情報
                    </span>
                    <ul className="list-disc pl-5 text-slate-600">
                      <li>EU の十分性認定：なし</li>
                      <li>APEC の CBPR システム：2012 年 7 月 25 日参加</li>
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold block text-slate-700">
                      OECDプライバシーガイドライン8原則に対応する事業者等の義務または本人の権利
                    </span>
                    <ul className="list-disc pl-5 text-slate-600">
                      <li>
                        収集制限の原則：HIPAA に一部規定されている。
                      </li>
                      <li>
                        利用制限の原則：ECPA及びHIPAAに一部規定されている。
                      </li>
                      <li>安全保護の原則：HIPAAに一部規定されている。</li>
                      <li>個人参加の原則：HIPAA に一部規定されている。</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
