"use client";

import React, { useState } from "react";
import { parseVideoUrl } from "@/lib/videoParser";
import { updateSettingsAction } from "@/actions/settingsActions";
import {
  Settings,
  Video,
  Truck,
  Phone,
  Mail,
  Flame,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface SettingsManagerProps {
  initialSettings: {
    videoUrl: string;
    helplineNumber: string;
    supportEmail: string;
    stockCounter: string;
    deliveryChargeInsideDhaka: number;
    deliveryChargeOutsideDhaka: number;
    announcementText: string;
  };
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  initialSettings,
}) => {
  const [videoUrl, setVideoUrl] = useState(initialSettings.videoUrl);
  const [helplineNumber, setHelplineNumber] = useState(initialSettings.helplineNumber);
  const [supportEmail, setSupportEmail] = useState(initialSettings.supportEmail);
  const [stockCounter, setStockCounter] = useState(initialSettings.stockCounter);
  const [deliveryChargeInsideDhaka, setDeliveryChargeInsideDhaka] = useState(
    initialSettings.deliveryChargeInsideDhaka
  );
  const [deliveryChargeOutsideDhaka, setDeliveryChargeOutsideDhaka] = useState(
    initialSettings.deliveryChargeOutsideDhaka
  );
  const [announcementText, setAnnouncementText] = useState(
    initialSettings.announcementText
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Real-time video parsing
  const parsedVideo = parseVideoUrl(videoUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    const res = await updateSettingsAction({
      videoUrl,
      helplineNumber,
      supportEmail,
      stockCounter,
      deliveryChargeInsideDhaka: Number(deliveryChargeInsideDhaka),
      deliveryChargeOutsideDhaka: Number(deliveryChargeOutsideDhaka),
      announcementText,
    });

    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setSaveError(res.error || "সেটিংস সংরক্ষণ ব্যর্থ হয়েছে।");
    }

    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      
      {/* Top Banner Alert on Success */}
      {saveSuccess && (
        <div className="bg-[#ECFDF5] border-2 border-[#059669] p-4 rounded-2xl text-xs sm:text-sm font-bold text-[#065F46] flex items-center gap-2 shadow-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#059669]" />
          <span>সেটিংস সফলভাবে সংরক্ষিত হয়েছে এবং ল্যান্ডিং পেজে লাইভ আপডেট হয়ে গেছে!</span>
        </div>
      )}

      {saveError && (
        <div className="bg-red-50 border-2 border-red-500 p-4 rounded-2xl text-xs sm:text-sm font-bold text-red-700 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span>{saveError}</span>
        </div>
      )}

      {/* 1. Video Section Settings & Live Embed Parser */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
              ভিডিও শোকেস ও ডকুমেন্টারি লিংক (YouTube / Vimeo)
            </h3>
            <p className="text-xs text-gray-500">
              যেকোনো সাধারণ YouTube লিঙ্ক (Watch, Shorts, Embed) বা Vimeo লিংক দিন, স্বয়ংক্রিয়ভাবে পার্স হবে।
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            ভিডিও ইউআরএল (Video URL)
          </label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706] focus:bg-white"
          />
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="font-semibold text-gray-500">পার্সড প্ল্যাটফর্ম:</span>
            <span className={`font-bold px-2 py-0.5 rounded-full ${
              parsedVideo.isValid
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}>
              {parsedVideo.platform.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Live Video Embed Preview Frame */}
        {parsedVideo.isValid && parsedVideo.embedUrl && (
          <div className="mt-4">
            <p className="text-xs font-bold text-gray-700 mb-2">
              লাইভ প্রিভিউ (যেভাবে ল্যান্ডিং পেজে প্রদর্শিত হবে):
            </p>
            <div className="relative aspect-video max-w-lg rounded-2xl overflow-hidden shadow-md border-2 border-amber-300 bg-black">
              <iframe
                src={parsedVideo.embedUrl}
                title="মধু সংগ্রহের ভিডিও প্রিভিউ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Urgency Bar, Stock Scarcity & Announcements */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
              স্টক কাউন্টার ও টপ অ্যানাউন্সমেন্ট বার
            </h3>
            <p className="text-xs text-gray-500">
              গ্রাহকদের দ্রুত সিদ্ধান্তের জন্য সীমিত স্টক ও অফার নোটিফিকেশন টেক্সট
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              স্টক কাউন্টার টেক্সট (Stock Scarcity Text)
            </label>
            <input
              type="text"
              value={stockCounter}
              onChange={(e) => setStockCounter(e.target.value)}
              placeholder="স্টকে বাকি মাত্র ১৭ টি জার"
              className="w-full px-4 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              শীর্ষ নোটিশ বার (Announcement Banner Text)
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="সীমিত অফার: আজকের অর্ডারে কাঠের মধু চামচ ফ্রি!"
              className="w-full px-4 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
            />
          </div>
        </div>
      </div>

      {/* 3. Shipping Charges Configuration */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
              ডেলিভারি চার্জ নির্ধারণ (Shipping Rates ৳)
            </h3>
            <p className="text-xs text-gray-500">
              ঢাকা ও ঢাকার বাইরের হোম ডেলিভারি ফি (চেকআউট ফর্মে স্বয়ংক্রিয়ভাবে যুক্ত হবে)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              ঢাকা সিটির ভেতর ডেলিভারি চার্জ (৳)
            </label>
            <input
              type="number"
              value={deliveryChargeInsideDhaka}
              onChange={(e) => setDeliveryChargeInsideDhaka(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              ঢাকা সিটির বাইরে ডেলিভারি চার্জ (৳)
            </label>
            <input
              type="number"
              value={deliveryChargeOutsideDhaka}
              onChange={(e) => setDeliveryChargeOutsideDhaka(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
            />
          </div>
        </div>
      </div>

      {/* 4. Contact & Support Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
              হেল্পলাইন ও কাস্টমার সাপোর্ট তথ্য
            </h3>
            <p className="text-xs text-gray-500">
              হেডার, ফুটার ও ইনভয়েসে প্রদর্শিত যোগাযোগ নম্বর
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              হেল্পলাইন মোবাইল নম্বর
            </label>
            <input
              type="text"
              value={helplineNumber}
              onChange={(e) => setHelplineNumber(e.target.value)}
              placeholder="০১৭১১-XXXXXX"
              className="w-full px-4 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              সাপোর্ট ইমেইল এড্রেস
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              placeholder="support@sundarbannaturals.com"
              className="w-full px-4 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-[#D97706]/25 transition-all active:scale-95 cursor-pointer disabled:opacity-75"
        >
          {isSaving ? "সংরক্ষণ হচ্ছে..." : "সকল পরিবর্তন সংরক্ষণ করুন"}
        </button>
      </div>

    </form>
  );
};
