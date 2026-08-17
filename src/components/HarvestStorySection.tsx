"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Compass,
  Volume2,
  ShoppingBag,
  X,
} from "lucide-react";
import { parseVideoUrl } from "@/lib/videoParser";

interface HarvestStorySectionProps {
  onOrderClick: () => void;
  videoUrl?: string;
}

export const HarvestStorySection: React.FC<HarvestStorySectionProps> = ({
  onOrderClick,
  videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const parsedVideo = parseVideoUrl(videoUrl);

  return (
    <section id="video-story" className="py-16 sm:py-24 bg-[#065F46] text-white relative overflow-hidden">
      {/* Background mangrove pattern elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#047857_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#047857]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D97706]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#047857] border border-[#10B981]/40 text-[#ECFDF5] text-xs sm:text-sm font-semibold">
            <Compass className="w-4 h-4 text-[#FDE68A]" />
            <span>সুন্দরবনের গভীরের জীবন্ত গল্প</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            কীভাবে সুন্দরবনের গহীন বন থেকে মৌয়ালরা{" "}
            <span className="text-[#FBBF24]">খাঁটি কাঁচা মধু</span> সংগ্রহ করেন?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#D1FAE5] font-normal leading-relaxed">
            কোনো ফার্মিং বা কৃত্রিম চাষ নয় — পেশাদার মৌয়ালরা জীবনের ঝুঁকি নিয়ে সুন্দরবনের গভীর নদী-নালা পাড়ি দিয়ে ১০০% প্রাকৃতিক খলিসা ও গরান ফুলের খাঁটি মধু সংগ্রহ করেন।
          </p>
        </div>

        {/* Video Player Container */}
        <div className="max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-[#10B981]/30 bg-[#022C22] group"
          >
            {isPlaying && parsedVideo.isValid && parsedVideo.embedUrl ? (
              <div className="w-full h-full relative">
                <iframe
                  src={parsedVideo.embedUrl}
                  title="সুন্দরবনে খাঁটি মধু সংগ্রহের ভিডিও"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
                <button
                  onClick={() => setIsPlaying(false)}
                  aria-label="ভিডিও বন্ধ করুন"
                  className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Image
                  src="/images/sundarban-harvest.jpg"
                  alt="সুন্দরবনে ঐতিহ্যবাহী মৌয়ালদের মধু সংগ্রহের দৃশ্য"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Video overlay / controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex flex-col justify-between p-4 sm:p-8">
                  {/* Top bar inside video */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <span className="font-semibold text-white">ডকুমেন্টারি ফুটেজ: সুন্দরবন রেঞ্জ</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-white/80 text-xs bg-black/40 px-3 py-1 rounded-full">
                      <Volume2 className="w-4 h-4" />
                      <span>HD 1080p • আসল শব্দ</span>
                    </div>
                  </div>

                  {/* Center Play Button */}
                  <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                    <button
                      onClick={() => setIsPlaying(true)}
                      aria-label="ভিডিও প্লে করুন"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#022C22] flex items-center justify-center shadow-2xl shadow-[#F59E0B]/50 transition-all transform hover:scale-110 active:scale-95 cursor-pointer border-4 border-white/40"
                    >
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1 text-slate-950" />
                    </button>
                    <p className="text-xs sm:text-sm font-bold text-white tracking-wide bg-black/50 px-4 py-1 rounded-full">
                      মধু সংগ্রহের সরাসরি ভিডিও দেখতে ক্লিক করুন
                    </p>
                  </div>

                  {/* Bottom Caption bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#F59E0B] h-full w-2/3 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <span>০২:৪৫ / ০৪:১৫</span>
                      <span className="font-medium text-[#FDE68A]">১০০% প্রাকৃতিক প্রক্রিয়ায় ফিল্টারিং ছাড়া বোতলজাতকরণ</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* 3 Step Ethical Harvesting Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Step 1 */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#FBBF24]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 text-[#FDE68A] flex items-center justify-center text-xl font-bold mb-4 border border-[#F59E0B]/30">
              ০১
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              বনের গভীরে প্রাকৃতিক চাক সন্ধান
            </h3>
            <p className="text-sm text-[#D1FAE5] leading-relaxed">
              সুন্দরবনের ভেতর প্রাকৃতিকভাবে তৈরি হওয়া বড় বড় মৌচাক খুঁজে বের করেন অভিজ্ঞ মৌয়ালরা। কোনো ধরনের কৃত্রিম বাক্স বা চাষ নয়।
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#FBBF24]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 text-[#FDE68A] flex items-center justify-center text-xl font-bold mb-4 border border-[#F59E0B]/30">
              ০২
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              মৌমাছিদের ক্ষতি না করে ধোঁয়ায় সংগ্রহ
            </h3>
            <p className="text-sm text-[#D1FAE5] leading-relaxed">
              গাছের শুকনো পাতা ও ডালের ধোঁয়া দিয়ে মৌমাছিদের নিরাপদে সরিয়ে শুধুমাত্র মধুর অংশটি কাটা হয়, যাতে মৌমাছির কোনো ক্ষতি না হয়।
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#FBBF24]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 text-[#FDE68A] flex items-center justify-center text-xl font-bold mb-4 border border-[#F59E0B]/30">
              ০৩
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              নো হিটিং ও নো কেমিক্যাল প্রসেসিং
            </h3>
            <p className="text-sm text-[#D1FAE5] leading-relaxed">
              মধু কোনো কৃত্রিম হিটিং ছাড়া সরাসরি পাতলা কাপড়ে ছেঁকে কাঁচের জারে ভরা হয়। ফলে মধুর স্বাভাবিক পোলেন, এনজাইম ও ফ্লেভার অক্ষুণ্ণ থাকে।
            </p>
          </div>

        </div>

        {/* Section Secondary CTA */}
        <div className="text-center pt-2">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] hover:text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-black/20 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>এই খাঁটি সুন্দরবনের মধু অর্ডার করুন</span>
          </button>
        </div>

      </div>
    </section>
  );
};
