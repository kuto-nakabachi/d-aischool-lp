"use client";

import React from "react";
import { User, Star, Quote } from "lucide-react";
import { ArrowDown } from "./ArrowDown";

interface DetailedCaseCardProps {
  badge: string;
  title: string;
  profile: string;
  before: string;
  after: string;
  secret: string;
  comment: string;
  color: "blue" | "purple" | "green" | "orange";
}

export const DetailedCaseCard = ({
  badge,
  title,
  profile,
  before,
  after,
  secret,
  comment,
  color,
}: DetailedCaseCardProps) => {
  const colorClasses = {
    blue: "bg-blue-600 text-blue-600 border-blue-100",
    purple: "bg-purple-600 text-purple-600 border-purple-100",
    green: "bg-green-600 text-green-600 border-green-100",
    orange: "bg-orange-500 text-orange-500 border-orange-100",
  };

  const bgClass = colorClasses[color].split(" ")[0];
  const textClass = colorClasses[color].split(" ")[1];
  const borderClass = colorClasses[color].split(" ")[2];

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border ${borderClass} overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow`}
    >
      <div className={`${bgClass} text-white text-xs font-bold px-4 py-2`}>
        CASE: {badge}
      </div>

      <div className="p-6 flex flex-col h-full">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-4 leading-tight">
          {title}
        </h3>

        {/* 写真 & プロフィールセクション */}
        <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div className="w-16 h-16 rounded-full bg-slate-200 shrink-0 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            {/* ★ここに写真を入れる場合は以下のようにimgタグを使ってください
               <img src="/images/person1.jpg" alt="プロフィール写真" className="w-full h-full object-cover" />
            */}
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-sm text-slate-600 font-medium">{profile}</p>
        </div>

        <div className="space-y-4 mb-6 flex-grow">
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">Before</span>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{before}</p>
          </div>
          <div className="text-center transform translate-y-2 relative z-10">
            <ArrowDown className={`w-6 h-6 mx-auto ${textClass} animate-bounce`} />
          </div>
          <div>
            <span className={`text-xs font-bold ${textClass} block mb-1`}>After</span>
            <p
              className={`text-base font-bold ${textClass} bg-white border border-current p-3 rounded-lg shadow-sm`}
            >
              {after}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-900 block mb-1 flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              成功の秘訣
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">{secret}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl relative mt-4">
            <Quote className="w-6 h-6 text-slate-200 absolute -top-3 -left-2 fill-slate-200" />
            <p className="text-xs text-slate-600 italic relative z-10 leading-relaxed">
              &quot;{comment}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
