"use client";

import React from "react";
import Image from "next/image";

export const Hero = () => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section className="relative w-full">
      {/* PC表示用 */}
      <div className="hidden md:block">
        <Image
          src={`${basePath}/images/firstview_pc.webp`}
          alt="AI時代に、あなたの市場価値はいくら上がる？プロが算出「AIキャリア・年収診断」"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
      {/* スマホ表示用 */}
      <div className="md:hidden">
        <Image
          src={`${basePath}/images/firstview_sp.webp`}
          alt="AI時代に、あなたの市場価値はいくら上がる？プロが算出「AIキャリア・年収診断」"
          width={750}
          height={1334}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
};
