"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  HeartPulse,
  Sparkles,
  Flame,
  Droplet,
  Check,
  X,
  ShoppingBag,
  Award,
  Flower2,
  Smile,
} from "lucide-react";

interface BenefitsSectionProps {
  onOrderClick: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  onOrderClick,
}) => {
  const benefits = [
    {
      icon: <Flower2 className="w-7 h-7 text-[#D97706]" />,
      title: "খলিসা ও গরান ফুলের বিশেষ নির্যাস",
      desc: "সুন্দরবনের বিশেষ বুনো খলিসা, গরান ও বাইন ফুলের মিষ্টি ও ঝাঁঝালো সুবাস। এটি সাধারণ চাষের মধু থেকে স্বাদে ও গুণে পুরোপুরি আলাদা।",
      badge: "সুন্দরবনের বিশেষত্ব",
      badgeColor: "bg-[#FEF3C7] text-[#92400E]",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#059669]" />,
      title: "রোগ প্রতিরোধ ক্ষমতা বহুগুণ বৃদ্ধি",
      desc: "প্রাকৃতিক অ্যান্টিব্যাকটেরিয়াল ও অ্যান্টিফাঙ্গাল গুণে সমৃদ্ধ, যা শরীরকে নানা ভাইরাস ও ব্যাকটেরিয়ার আক্রমণ থেকে দ্রুত রক্ষা করতে সাহায্য করে।",
      badge: "ইমিউনিটি বুস্টার",
      badgeColor: "bg-[#ECFDF5] text-[#065F46]",
    },
    {
      icon: <Zap className="w-7 h-7 text-[#D97706]" />,
      title: "তাৎক্ষণিক প্রাকৃতিক শক্তির উৎস",
      desc: "প্রতিদিন সকালে কুসুম গরম পানিতে ১ চামচ খাঁটি মধু পান করলে সারাদিনের ক্লান্তি দূর হয় এবং শরীরে প্রাকৃতিক সতেজতা ও উদ্যম বজায় থাকে।",
      badge: "ন্যাচারাল এনার্জি",
      badgeColor: "bg-[#FEF3C7] text-[#92400E]",
    },
    {
      icon: <Smile className="w-7 h-7 text-[#059669]" />,
      title: "হজম শক্তি বৃদ্ধি ও পেটের আরাম",
      desc: "কাঁচা মধুতে থাকা প্রাকৃতিক এনজাইম পেটের ভালো ব্যাকটেরিয়ার বৃদ্ধি ঘটিয়ে এসিডিটি, গ্যাস ও বদহজমের সমস্যা কমাতে কার্যকর ভূমিকা রাখে।",
      badge: "হজমে সহায়ক",
      badgeColor: "bg-[#ECFDF5] text-[#065F46]",
    },
    {
      icon: <HeartPulse className="w-7 h-7 text-[#D97706]" />,
      title: "কাশি ও গলার খুসখুস উপশম",
      desc: "আবহাওয়া পরিবর্তনের কারণে সৃষ্ট শুষ্ক কাশি, ঠান্ডা লাগা ও গলার প্রদাহ দূর করতে খাঁটি কাঁচা মধু অত্যন্ত উপশমকারী প্রাকৃতিক ঔষধ।",
      badge: "গলার যত্ন",
      badgeColor: "bg-[#FEF3C7] text-[#92400E]",
    },
    {
      icon: <Award className="w-7 h-7 text-[#059669]" />,
      title: "সম্পূর্ণ চিনি ও ভেজালমুক্ত ১০০% র-মধু",
      desc: "কোনো চিনি মেশানো নেই, কৃত্রিম রঙ বা সুবাস নেই এবং উচ্চ তাপে ফুটিয়ে মধুর পুষ্টিগুণ নষ্ট করা হয়নি। একদম প্রকৃতি যেমন দিয়েছে ঠিক তেমন।",
      badge: "শতভাগ খাঁটি",
      badgeColor: "bg-[#ECFDF5] text-[#065F46]",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Subtle elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D1FAE5]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>প্রাকৃতিক গুণাবলী ও অনন্য উপকারিতা</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1C1917]">
            কেন সুন্দরবনের কাঁচা মধু সাধারণ মধুর চেয়ে{" "}
            <span className="text-[#D97706]">অনেক বেশি উপকারী?</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#57534E]">
            সুন্দরবনের ম্যানগ্রোভ বনের বুনো ফুলের নির্যাস মধুকে দেয় এক অনন্য স্বাদ, প্রাকৃতিক ঝাঁঝালো গন্ধ এবং উচ্চ ঔষধি ক্ষমতা যা বাজারের প্রসেসড মধুতে কখনোই পাওয়া যায় না।
          </p>
        </div>

        {/* 6 Grid Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/80 hover:border-[#F59E0B]/60 shadow-xs hover:shadow-xl hover:shadow-[#D97706]/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFFBEB] flex items-center justify-center border border-[#FDE68A]">
                    {benefit.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${benefit.badgeColor}`}>
                    {benefit.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] mb-3">
                  {benefit.title}
                </h3>

                <p className="text-sm text-[#57534E] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table: Sundarban Wild Honey vs Commercial Processed Honey */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#FDE68A] shadow-xl overflow-hidden mb-14">
          <div className="bg-gradient-to-r from-[#92400E] to-[#D97706] text-white p-5 sm:p-6 text-center">
            <h3 className="text-xl sm:text-2xl font-black">
              তুলনামূলক পার্থক্য: সুন্দরবনের কাঁচা মধু বনাম সাধারণ বাজারজাত মধু
            </h3>
            <p className="text-xs sm:text-sm text-[#FEF3C7] mt-1">
              কেন খাঁটি কাঁচা মধুর দাম ও কার্যকারিতা সাধারণ মধুর থেকে ভিন্ন?
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-[#FAFAF9] text-xs sm:text-sm font-bold text-gray-700">
                  <th className="p-4 sm:p-5">বৈশিষ্ট্য</th>
                  <th className="p-4 sm:p-5 text-[#065F46] bg-[#ECFDF5]/80">সুন্দরবনের খাঁটি কাঁচা মধু 🌿</th>
                  <th className="p-4 sm:p-5 text-gray-500">সাধারণ প্রসেসড মধু ❌</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-700">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">উৎস ও সংগ্রহ</td>
                  <td className="p-4 sm:p-5 bg-[#ECFDF5]/40 text-[#065F46] font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    সুন্দরবনের গভীর বনের প্রাকৃতিক মৌচাক
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500">চাষের বক্স বা কৃত্রিম ফার্মের মৌমাছি</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">হিটিং ও প্রসেসিং</td>
                  <td className="p-4 sm:p-5 bg-[#ECFDF5]/40 text-[#065F46] font-medium">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      সম্পূর্ণ আনহিট করা কাঁচা মধু (Raw Honey)
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500">উচ্চ তাপে ফোটানো (এনজাইম নষ্ট হয়ে যায়)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">প্রাকৃতিক পোলেন ও পুষ্টি</td>
                  <td className="p-4 sm:p-5 bg-[#ECFDF5]/40 text-[#065F46] font-medium">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      প্রাকৃতিক বি-পোলেন ও প্রোপোলিস অক্ষুণ্ণ
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500">আল্ট্রা-ফিল্টারিং করে পোলেন বাদ দেওয়া হয়</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">চিনি বা রাসায়নিক ভেজাল</td>
                  <td className="p-4 sm:p-5 bg-[#ECFDF5]/40 text-[#065F46] font-medium">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      ০% ভেজাল — ১০০% প্রাকৃতিকভাবে তৈরি
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500">চিনির শিরা বা কৃত্রিম সুইটেনার মেশানো হতে পারে</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">সুবাস ও স্বাদ</td>
                  <td className="p-4 sm:p-5 bg-[#ECFDF5]/40 text-[#065F46] font-medium">
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      বুনো খলিসা ও গরান ফুলের ঝাঁঝালো আসল সুবাস
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500">কৃত্রিম মিষ্টি ফ্লেভার ও গন্ধহীন</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tertiary CTA Button */}
        <div className="text-center">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white px-8 py-4.5 rounded-2xl font-black text-lg shadow-xl shadow-[#D97706]/25 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>১০০% খাঁটি সুন্দরবনের মধু অর্ডার করুন</span>
          </button>
        </div>

      </div>
    </section>
  );
};
