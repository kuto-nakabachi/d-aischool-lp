import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "D-AIスクール | AIキャリア・年収診断",
  description: "AIを「学ぶ」から、AIで「稼ぐ」へ。プロが算出するAIキャリア・年収診断で、あなただけの戦略を個別に提示します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
