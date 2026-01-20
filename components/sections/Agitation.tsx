"use client";

import React, { useEffect, useRef, useState } from "react";

export const Agitation = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (graphRef.current) {
      observer.observe(graphRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const barBaseStyle = {
    transition: "height 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* テキストエリア */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-black leading-snug">
              「様子見」の間に、
              <br />
              市場価値の格差は
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                取り返しのつかないレベル
              </span>
              <br />
              に拡大しています。
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              生成AI市場は爆発的に成長しています。
              <br />
              AIを「使いこなす人」と「使えない人」の間には、
              <span className="text-white font-bold border-b border-orange-500">
                生涯年収で1億円近くの差
              </span>
              が生まれると言われています。
            </p>
            <p className="text-xl font-bold text-white mt-4">
              だからこそ、
              <span className="text-white bg-gradient-to-r from-blue-400 to-blue-600 px-3 py-1 rounded shadow-lg">
                &quot;今&quot;
              </span>{" "}
              動くべきなのです。
            </p>
          </div>

          {/* グラフエリア */}
          <div
            ref={graphRef}
            className="lg:w-1/2 w-full bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative"
          >
            <h3 className="text-center font-bold text-slate-400 mb-8 text-sm">
              生成AI市場規模と人材価値の推移予測
            </h3>
            <div className="flex items-end justify-between h-64 relative z-10 gap-4 px-2">
              {/* Y軸ライン */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="w-full h-px bg-slate-400"></div>
                <div className="w-full h-px bg-slate-400"></div>
                <div className="w-full h-px bg-slate-400"></div>
              </div>

              {/* 2023年 棒グラフ */}
              <div className="w-1/4 flex flex-col justify-end items-center group h-full">
                <div
                  className="w-full bg-slate-600 rounded-t-md hover:bg-slate-500"
                  style={{
                    ...barBaseStyle,
                    height: isVisible ? "15%" : "0%",
                    transitionDelay: "0ms",
                  }}
                />
                <span className="mt-4 text-xs font-bold text-slate-500">2023</span>
              </div>

              {/* 2025年 棒グラフ */}
              <div className="w-1/4 flex flex-col justify-end items-center group h-full">
                <div
                  className="w-full bg-blue-900 rounded-t-md hover:bg-blue-800"
                  style={{
                    ...barBaseStyle,
                    height: isVisible ? "35%" : "0%",
                    transitionDelay: "200ms",
                  }}
                />
                <span className="mt-4 text-xs font-bold text-slate-500">2025</span>
              </div>

              {/* 2027年 棒グラフ */}
              <div className="w-1/4 flex flex-col justify-end items-center group h-full">
                <div
                  className="w-full bg-blue-600 rounded-t-md hover:bg-blue-500"
                  style={{
                    ...barBaseStyle,
                    height: isVisible ? "65%" : "0%",
                    transitionDelay: "400ms",
                  }}
                />
                <span className="mt-4 text-xs font-bold text-blue-400">2027</span>
              </div>

              {/* 2030年 棒グラフ（メイン） */}
              <div className="w-1/4 flex flex-col justify-end items-center group h-full">
                <div
                  className="w-full bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-md relative shadow-lg shadow-orange-500/50"
                  style={{
                    ...barBaseStyle,
                    height: isVisible ? "95%" : "0%",
                    transitionDelay: "600ms",
                  }}
                >
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap hover:scale-110 transition-transform"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out 1.5s",
                    }}
                  >
                    15倍以上
                  </div>
                </div>
                <span className="mt-4 text-sm font-bold text-orange-400">2030</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
