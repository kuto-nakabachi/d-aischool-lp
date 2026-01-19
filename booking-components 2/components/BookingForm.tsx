"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { BookingFormData } from "../types/booking";

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  isSubmitting: boolean;
  primaryColor?: string;
  submitButtonText?: string;
}

export const BookingForm = ({
  onSubmit,
  isSubmitting,
  primaryColor = "blue",
  submitButtonText = "予約を確定する",
}: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = "正しい電話番号を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
      hasError
        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
        : "border-slate-200 focus:border-blue-500 focus:ring-blue-500"
    } focus:outline-none focus:ring-2 focus:ring-opacity-50`;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 md:p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-6">お客様情報</h3>

      <div className="space-y-4">
        {/* 名前 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClass(!!errors.name)}
              placeholder="山田 太郎"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* メール */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass(!!errors.email)}
              placeholder="example@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* 電話番号 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={inputClass(!!errors.phone)}
              placeholder="090-1234-5678"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* メッセージ（任意） */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            ご質問・ご要望（任意）
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <textarea
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 min-h-[100px]"
              placeholder="事前にお伝えしたいことがあればご記入ください"
            />
          </div>
        </div>
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full mt-6 py-4 rounded-xl font-bold text-white text-lg
          bg-gradient-to-r from-${primaryColor}-500 to-${primaryColor}-600
          hover:from-${primaryColor}-600 hover:to-${primaryColor}-700
          disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed
          transition-all shadow-lg hover:shadow-xl
        `}
      >
        {isSubmitting ? "送信中..." : submitButtonText}
      </button>
    </form>
  );
};
