"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowDown,
  Star,
  Play,
  CheckCircle2,
  Users,
} from "lucide-react";

interface HeroSectionProps {
  onOrderClick: () => void;
  onVideoClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderClick,
  onVideoClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FFFBEB]/60 via-[#FAFAF9] to-[#FAFAF9]">
      {/* Decorative Golden & Green Glow Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#FDE68A]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#A7F3D0]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Trust Badges, Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Top Tag / Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm font-semibold shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#D97706] animate-spin" style={{ animationDuration: "6s" }} />
              <span>১০০% প্রাকৃতিক ও আনপ্রসেসড কাঁচা মধু</span>
            </motion.div>

            {/* Main H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl/tight xl:text-6xl/tight font-black tracking-tight text-[#1C1917]"
            >
              সুন্দরবনের গহীন অরণ্য থেকে সংগৃহীত{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#D97706]">
                ১০০% খাঁটি কাঁচা মধু
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="10"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C60 3 240 3 297 9"
                    stroke="#F59E0B"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Persuasive Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#57534E] leading-relaxed max-w-2xl font-normal"
            >
              কোনো চিনি বা ক্ষতিকর কেমিক্যাল নেই, কোনো কৃত্রিম হিটিং ছাড়া সরাসরি মৌচাক থেকে সংগৃহীত খলিসা ও গরান ফুলের খাঁটি মধু। প্রতিটি ফোঁটায় রয়েছে সুন্দরবনের আসল সুবাস ও ঔষধি গুণ।
            </motion.p>

            {/* Trust Bullet Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-left pt-2"
            >
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-[#FDE68A]/60 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
                <span className="text-sm font-semibold text-[#292524]">সরাসরি মৌয়ালদের থেকে সংগৃহীত</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-[#FDE68A]/60 shadow-xs">
                <Truck className="w-5 h-5 text-[#059669] shrink-0" />
                <span className="text-sm font-semibold text-[#292524]">সারাদেশে ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-[#FDE68A]/60 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#059669] shrink-0" />
                <span className="text-sm font-semibold text-[#292524]">আগে চেক করবেন, পরে পেমেন্ট</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-[#FDE68A]/60 shadow-xs">
                <RotateCcw className="w-5 h-5 text-[#059669] shrink-0" />
                <span className="text-sm font-semibold text-[#292524]">১০০% মানি ব্যাক গ্যারান্টি</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4"
            >
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto relative group overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] hover:from-[#B45309] hover:to-[#D97706] text-white px-8 py-4 sm:py-4.5 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-[#D97706]/35 hover:shadow-2xl hover:shadow-[#D97706]/50 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer animate-pulse-glow"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/25 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                <span>এখনি অর্ডার করুন</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </button>

              <button
                onClick={onVideoClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-[#FFFBEB] text-[#065F46] border-2 border-[#A7F3D0] hover:border-[#059669] px-6 py-4 rounded-2xl font-bold text-base shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>সংগ্রহের ভিডিও দেখুন</span>
              </button>
            </motion.div>

            {/* Real-time Viewers & Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 pt-1 text-xs sm:text-sm text-[#78716C]"
            >
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200/80 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold text-gray-700">বর্তমানে ৪৭ জন দেখছেন</span>
              </div>
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span>৪.৯/৫ (১২৫০+ রিভিউ)</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Product Image with Floating Animated Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-[#D97706]/20 border-4 border-white bg-gradient-to-tr from-[#FEF3C7] to-white"
            >
              <Image
                src="/images/sundarban-hero.jpg"
                alt="সুন্দরবনের ১০০% খাঁটি কাঁচা মধু"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white text-center sm:text-left bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <p className="text-xs font-medium text-amber-200">খলিসা ও গরান ফুলের প্রাকৃতিক নির্যাস</p>
                <p className="text-sm font-bold text-white">১০০% র-মধু • নো প্রিজারভেটিভ • নো হিট</p>
              </div>
            </motion.div>

            {/* Floating Badge 1: Top Right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#FDE68A] flex items-center gap-2.5 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-xl">
                🌿
              </div>
              <div>
                <p className="text-[11px] text-[#78716C] font-medium">সরাসরি মৌচাক থেকে</p>
                <p className="text-xs sm:text-sm font-bold text-[#065F46]">১০০% খাঁটি ও কাঁচা</p>
              </div>
            </motion.div>

            {/* Floating Badge 2: Bottom Left */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#A7F3D0] flex items-center gap-2.5 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] text-[#78716C] font-medium">ল্যাব টেস্টে পরীক্ষিত</p>
                <p className="text-xs sm:text-sm font-bold text-[#1C1917]">০% কেমিক্যাল গ্যারান্টি</p>
              </div>
            </motion.div>

            {/* Floating Badge 3: Discount Tag */}
            <motion.div
              initial={{ rotate: -12 }}
              whileHover={{ rotate: 0 }}
              className="absolute top-1/4 -left-4 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white z-20 animate-pulse"
            >
              🔥 বিশেষ অফার
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
