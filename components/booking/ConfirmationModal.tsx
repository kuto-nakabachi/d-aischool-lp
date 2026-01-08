'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { CheckCircle, Calendar, Clock, Copy, Video, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingData: {
        datetime: string;
        endDatetime: string;
        meetLink: string;
        calendarLink: string;
    } | null;
}

export default function ConfirmationModal({ isOpen, onClose, bookingData }: ConfirmationModalProps) {
    if (!isOpen || !bookingData) return null;

    const bookingDate = new Date(bookingData.datetime);
    const bookingEndDate = new Date(bookingData.endDatetime);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!bookingData.meetLink) return;
        try {
            await navigator.clipboard.writeText(bookingData.meetLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp">
                {/* 閉じるボタン */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* 成功アイコン */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                {/* タイトル */}
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    予約が完了しました!
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    確認メールを送信しました
                </p>

                {/* 予約詳細 */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-600">日時</p>
                            <p className="font-semibold text-gray-900">
                                {format(bookingDate, 'yyyy年M月d日(E)', { locale: ja })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-600">時間</p>
                            <p className="font-semibold text-gray-900">
                                {format(bookingDate, 'HH:mm', { locale: ja })} 〜 {format(bookingEndDate, 'HH:mm', { locale: ja })} (1時間)
                            </p>
                        </div>
                    </div>

                    {bookingData.meetLink && (
                        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <Video className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-600 mb-2">Google Meet</p>
                                <a
                                    href={bookingData.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-green-700 hover:text-green-800 font-medium underline break-all"
                                >
                                    {bookingData.meetLink}
                                </a>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-green-200 bg-white px-3 py-2 text-xs font-bold text-green-700 hover:bg-green-100 transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    {copied ? 'コピーしました' : 'URLをコピー'}
                                </button>
                            </div>
                        </div>
                    )}

                    {bookingData.calendarLink && (
                        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-600 mb-2">Googleカレンダー</p>
                                <a
                                    href={bookingData.calendarLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                                >
                                    Googleカレンダーに登録
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* 注意事項 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                        <strong>ご確認ください:</strong><br />
                        • 予約確認メールをご確認ください<br />
                        • 当日はGoogle Meetリンクからご参加ください<br />
                        • 変更・キャンセルはメールでご連絡ください
                    </p>
                </div>

                {/* 閉じるボタン */}
                <button
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                >
                    閉じる
                </button>
            </div>
        </div>
    );
}
