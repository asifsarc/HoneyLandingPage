"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Lock,
  Sparkles,
  ShoppingBag,
  Award,
  Truck,
  HeartHandshake,
} from "lucide-react";

interface PurityCertSectionProps {
  onOrderClick: () => void;
}

export const PurityCertSection: React.FC<PurityCertSectionProps> = ({
  onOrderClick,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Visual Purity & Honeycomb Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FDE68A]/60"
            >
              <Image
                src="/images/honey-purity.jpg"
                alt="সুন্দরবনের প্রাকৃতিক চাকের খাঁটি মধু"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="bg-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ১০০% পিউর গ্যারান্টি
                  </span>
                  <h4 className="text-lg font-bold mt-2">প্রকৃতির কোলে তৈরি আসল চাকের মধু</h4>
                </div>
              </div>
            </motion.div>

            {/* Badge overlay */}
            <div className="absolute -bottom-6 -right-4 bg-gradient-to-br from-[#92400E] to-[#D97706] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-white max-w-xs">
              <Award className="w-10 h-10 text-[#FDE68A] shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#FDE68A]">১০০% মানি ব্যাক নিশ্চয়তা</p>
                <p className="text-[11px] text-white/90">মধু খাঁটি প্রমাণিত না হলে দ্বিধাহীন রিফান্ড</p>
              </div>
            </div>
          </div>

          {/* Right: Guarantee & Trust Promises */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>আমাদের প্রতিশ্রুতি ও নিরাপত্তা</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#1C1917]">
              কোনো প্রকার ঝুঁকি ছাড়াই নিশ্চিন্তে{" "}
              <span className="text-[#059669]">অর্ডার করুন</span>
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              অনলাইনে খাঁটি মধু কেনা নিয়ে অনেকের মনেই নানা দ্বিধা থাকে। আপনার এই আস্থাকে সম্মান জানিয়ে আমরা দিচ্ছি শতভাগ ঝুঁকিহীন ক্রয়ের সম্পূর্ণ নিশ্চয়তা।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-[#FAFAF9] p-4.5 rounded-2xl border border-gray-200/80 hover:border-[#059669] transition-all flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1917]">ক্যাশ অন ডেলিভারি</h4>
                  <p className="text-xs text-[#57534E] mt-0.5">আগে কোনো অগ্রিম টাকা দেওয়ার প্রয়োজন নেই। পণ্য হাতে পেয়ে টাকা দিন।</p>
                </div>
              </div>

              <div className="bg-[#FAFAF9] p-4.5 rounded-2xl border border-gray-200/80 hover:border-[#059669] transition-all flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1917]">চেক করে নেওয়ার সুবিধা</h4>
                  <p className="text-xs text-[#57534E] mt-0.5">ডেলিভারিম্যানের সামনে প্যাকেট খুলে মধুর সুবাস ও মান যাচাই করে নিন।</p>
                </div>
              </div>

              <div className="bg-[#FAFAF9] p-4.5 rounded-2xl border border-gray-200/80 hover:border-[#059669] transition-all flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1917]">তাৎক্ষণিক রিটার্ন পলিসি</h4>
                  <p className="text-xs text-[#57534E] mt-0.5">পছন্দ না হলে কোনো খরচ ছাড়াই ডেলিভারিম্যানকে ফেরত দিয়ে দিন।</p>
                </div>
              </div>

              <div className="bg-[#FAFAF9] p-4.5 rounded-2xl border border-gray-200/80 hover:border-[#059669] transition-all flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1917]">নিরাপদ ও অক্ষত প্যাকেজিং</h4>
                  <p className="text-xs text-[#57534E] mt-0.5">ফুড-গ্রেড সিল্ড কাঁচের জারে বাবল র‍্যাপসহ সর্বোচ্চ সুরক্ষায় পাঠানো হয়।</p>
                </div>
              </div>

            </div>

            <div className="pt-4">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-2xl font-black text-base shadow-lg shadow-[#059669]/25 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>নিশ্চিন্তে ক্যাশ অন ডেলিভারিতে অর্ডার করুন</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
