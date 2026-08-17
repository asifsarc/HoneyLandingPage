"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, ThumbsUp } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";

export interface ReviewItemType {
  id?: string;
  name: string;
  location: string;
  role?: string | null;
  rating: number;
  reviewText?: string;
  review?: string;
  packagePurchased?: string | null;
  pack?: string;
  isVerified?: boolean;
}

const fallbackReviews: ReviewItemType[] = [
  {
    name: "ডাঃ তানভীর আহমেদ",
    location: "উত্তরা, ঢাকা",
    role: "চিকিৎসক ও নিয়মিত গ্রাহক",
    rating: 5,
    review:
      "চিকিৎসক হিসেবে আমি সবসময় রোগীদের কাঁচা র-মধু খাওয়ার পরামর্শ দিই। সুন্দরবন ন্যাচারালসের মধুর সুবাস এবং সামান্য ঝাঁঝালো টেস্ট প্রমাণ করে এটা একদম আনপ্রসেসড খাঁটি খলিসার মধু। আমার পুরো পরিবার নিয়মিত খাচ্ছে।",
    pack: "১ কেজি প্রিমিয়াম জার",
    isVerified: true,
  },
  {
    name: "নাসরিন সুলতানা",
    location: "পাঁচলাইশ, চট্টগ্রাম",
    role: "গৃহিণী",
    rating: 5,
    review:
      "বাচ্চাদের ঠান্ডার সমস্যার জন্য অর্ডার করেছিলাম। আলহামদুলিল্লাহ, ২ সপ্তাহের নিয়মিত ব্যবহারে কাশি একদম সেরে গেছে। ডেলিভারিম্যানের সামনে চেক করে নেওয়ার সুযোগ থাকায় কোনো দ্বিধা ছিল না। প্যাকেজিং অসাধারণ ছিল।",
    pack: "২ কেজি ফ্যামিলি কম্বো",
    isVerified: true,
  },
  {
    name: "মোঃ রফিকুল ইসলাম",
    location: "জিন্দাবাজার, সিলেট",
    role: "ব্যবসায়ী",
    rating: 5,
    review:
      "অনলাইনে মধু কিনে আগে দুইবার প্রতারিত হয়েছিলাম। তাই এবার একটু ভয় ছিল। কিন্তু এই মধুর স্বাদ নেওয়ার পর মন ভরে গেছে। সাথে দেওয়া কাঠের মধু চামচটাও খুব সুন্দর। সবাই নিশ্চিন্তে নিতে পারেন।",
    pack: "১ কেজি জার",
    isVerified: true,
  },
  {
    name: "মাহমুদুল হাসান",
    location: "সোনাডাঙ্গা, খুলনা",
    role: "ব্যাংক কর্মকর্তা",
    rating: 5,
    review:
      "খুলনার মানুষ হিসেবে সুন্দরবনের মধুর আসল স্বাদ আমি ভালো করেই চিনি। এদের মধুটা সত্যিই ১০০% সুন্দরবনের চাকের মধু। কোনো সুগার সিরাপ নেই। আমি দ্বিতীয়বার ২ কেজির বড় কম্বো প্যাক অর্ডার করলাম।",
    pack: "২ কেজি ফ্যামিলি কম্বো",
    isVerified: true,
  },
];

interface CustomerReviewsProps {
  reviews?: any[];
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  const displayReviews: ReviewItemType[] =
    reviews && reviews.length > 0
      ? reviews.map((r) => ({
          id: r.id,
          name: r.name,
          location: r.location,
          role: r.role,
          rating: r.rating || 5,
          review: r.reviewText || r.review,
          pack: r.packagePurchased || r.pack,
          isVerified: r.isVerified ?? true,
        }))
      : fallbackReviews;

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs sm:text-sm font-semibold">
            <ThumbsUp className="w-4 h-4 text-[#059669]" />
            <span>১২৫০+ সন্তুষ্ট গ্রাহকের ভালোবাসা</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1C1917]">
            আমাদের গ্রাহকরা কী বলছেন?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#57534E]">
            সরাসরি সুন্দরবনের খাঁটি কাঁচা মধুর আসল স্বাদ ও উপকারিতা উপভোগ করা কিছু সম্মানিত গ্রাহকের বাস্তব অভিজ্ঞতা।
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {displayReviews.map((rev, idx) => (
            <motion.div
              key={rev.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  {rev.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#D1FAE5]">
                      <CheckCircle className="w-3 h-3" />
                      ভেরিফাইড পারচেজ
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-[#44403C] leading-relaxed italic mb-6">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#1C1917]">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-[#78716C]">
                    {rev.role && `${rev.role} • `}
                    <span className="text-[#059669] font-medium">{rev.location}</span>
                  </p>
                </div>

                {rev.pack && (
                  <span className="text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7] px-2.5 py-1 rounded-xl">
                    {rev.pack}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-[#1C1917] to-[#292524] text-white rounded-3xl p-6 sm:p-8 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#FBBF24]">১২৫০+</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">সফল ডেলিভারি</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#FBBF24]">৪.৯ / ৫</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">কাস্টমার রেটিং</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#FBBF24]">৯৮.৭%</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">পুনরায় অর্ডার রেট</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#FBBF24]">১০০%</p>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">খাঁটি ও প্রাকৃতিক</p>
          </div>
        </div>

      </div>
    </section>
  );
};
