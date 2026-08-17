"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ShoppingBag, Gift, Truck, Flame, Star } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";
import { trackViewContent } from "@/lib/tracking";

export interface PackageType {
  id: string;
  slug?: string;
  name: string;
  weight: string;
  regularPrice: number;
  salePrice?: number;
  discountPrice?: number;
  savings?: number;
  popular?: boolean;
  bestValue?: boolean;
  freeDelivery?: boolean;
  freeGift?: boolean;
  freeGiftText?: string | null;
  badgeText?: string | null;
  features: string[] | string;
}

export const fallbackPackagesData: PackageType[] = [
  {
    id: "500g",
    name: "ট্রায়াল প্যাক",
    weight: "৫০০ গ্রাম জার",
    regularPrice: 750,
    discountPrice: 650,
    savings: 100,
    features: [
      "১০০% খাঁটি সুন্দরবনের কাঁচা মধু",
      "প्रीमিয়াম ফুড-গ্রেড গ্লাস জার",
      "ক্যাশ অন ডেলিভারি সুবিধা",
      "ডেলিভারিম্যানের সামনে চেক করার সুবিধা",
    ],
  },
  {
    id: "1kg",
    name: "বেস্ট সেলার প্যাক",
    weight: "১ কেজি প্রিমিয়াম জার",
    regularPrice: 1450,
    discountPrice: 1200,
    savings: 250,
    popular: true,
    freeGift: true,
    freeGiftText: "১টি কাঠের তৈরি মধু চামচ ফ্রি 🎁",
    badgeText: "সবচেয়ে জনপ্রিয় প্যাক",
    features: [
      "১০০% খাঁটি সুন্দরবনের কাঁচা মধু",
      "১টি কাঠের তৈরি মধু চামচ (হানি ডিপার) ফ্রি 🎁",
      "প्रीमিয়াম ফুড-গ্রেড এয়ারটাইট জার",
      "ক্যাশ অন ডেলিভারি সুবিধা",
      "মানি ব্যাক গ্যারান্টি",
    ],
  },
  {
    id: "2kg",
    name: "ফ্যামিলি মেগা কম্বো",
    weight: "২ কেজি প্যাক (১ কেজি × ২ জার)",
    regularPrice: 2900,
    discountPrice: 2200,
    savings: 700,
    bestValue: true,
    freeDelivery: true,
    freeGift: true,
    freeGiftText: "১টি কাঠের তৈরি মধু চামচ ফ্রি 🎁",
    badgeText: "সর্বোচ্চ সাশ্রয়ী (ফ্রি ডেলিভারি)",
    features: [
      "সারা বাংলাদেশে সম্পূর্ণ ফ্রি হোম ডেলিভারি 🚚",
      "১টি কাঠের তৈরি মধু চামচ (হানি ডিপার) ফ্রি 🎁",
      "১ কেজি করে ২টি প্রিমিয়াম জার (ব্যবহার ও সংরক্ষণ সহজ)",
      "সর্বোচ্চ ৭০০ টাকা নিশ্চিত সাশ্রয়",
      "১০০% মানি ব্যাক গ্যারান্টি",
    ],
  },
];

interface PricingPackagesProps {
  selectedPackage: string;
  onSelectPackage: (pkgId: string) => void;
  packages?: any[];
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  selectedPackage,
  onSelectPackage,
  packages,
}) => {
  const displayPackages: PackageType[] =
    packages && packages.length > 0
      ? packages.map((p) => {
          let parsedFeatures: string[] = [];
          if (typeof p.features === "string") {
            try {
              parsedFeatures = JSON.parse(p.features);
            } catch {
              parsedFeatures = [p.features];
            }
          } else if (Array.isArray(p.features)) {
            parsedFeatures = p.features;
          }

          const price = p.salePrice || p.discountPrice || p.regularPrice;
          const savings = Math.max(0, p.regularPrice - price);

          return {
            id: p.id || p.slug,
            slug: p.slug,
            name: p.name,
            weight: p.weight,
            regularPrice: p.regularPrice,
            discountPrice: price,
            salePrice: price,
            savings,
            popular: p.popular,
            bestValue: p.bestValue,
            freeDelivery: p.freeDelivery,
            freeGift: p.freeGift,
            freeGiftText: p.freeGiftText,
            badgeText: p.badgeText,
            features: parsedFeatures,
          };
        })
      : fallbackPackagesData;

  const handlePackageClick = (pkg: PackageType) => {
    trackViewContent({
      id: pkg.id,
      name: pkg.name,
      price: pkg.discountPrice || pkg.regularPrice,
      weight: pkg.weight,
    });
    onSelectPackage(pkg.id || pkg.slug || "");
  };

  return (
    <section id="packages" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAFAF9] via-[#FFFBEB]/40 to-[#FAFAF9] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#FDE68A]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm font-semibold">
            <Gift className="w-4 h-4 text-[#D97706]" />
            <span>বিশেষ ডিসকাউন্ট অফার</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1C1917]">
            আপনার পছন্দের <span className="text-[#D97706]">প্যাকেজ নির্বাচন</span> করুন
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#57534E]">
            সরাসরি চাক থেকে সংগ্রহ করা টাটকা কাঁচা মধু। নিজের জন্য বা পুরো পরিবারের সুস্বাস্থ্যের জন্য সেরা প্যাকেজটি বেছে নিন।
          </p>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {displayPackages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id || selectedPackage === pkg.slug;
            const price = pkg.discountPrice || pkg.salePrice || pkg.regularPrice;
            const featuresList = Array.isArray(pkg.features) ? pkg.features : [];

            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? "bg-white border-2 border-[#D97706] shadow-2xl shadow-[#D97706]/20 ring-4 ring-[#FDE68A]/50 md:-translate-y-2"
                    : pkg.bestValue
                    ? "bg-gradient-to-b from-[#ECFDF5] to-white border-2 border-[#059669] shadow-xl shadow-[#059669]/15"
                    : "bg-white border border-gray-200 shadow-md hover:shadow-xl"
                }`}
              >
                {/* Popular Ribbon */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{pkg.badgeText || "সবচেয়ে জনপ্রিয় প্যাক"}</span>
                  </div>
                )}

                {/* Best Value Ribbon */}
                {pkg.bestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#059669] to-[#047857] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#FDE68A]" />
                    <span>{pkg.badgeText || "সর্বোচ্চ সাশ্রয়ী (ফ্রি ডেলিভারি)"}</span>
                  </div>
                )}

                <div>
                  {/* Title & Weight */}
                  <div className="text-center pb-6 border-b border-gray-100">
                    <h3 className="text-xl sm:text-2xl font-black text-[#1C1917]">
                      {pkg.name}
                    </h3>
                    <p className="text-sm font-bold text-[#D97706] mt-1">
                      {pkg.weight}
                    </p>

                    {/* Price Block */}
                    <div className="mt-4 flex items-baseline justify-center gap-2">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1C1917] font-mono">
                        ৳{toBengaliNumber(price)}
                      </span>
                      <span className="text-base sm:text-lg text-gray-400 line-through font-mono">
                        ৳{toBengaliNumber(pkg.regularPrice)}
                      </span>
                    </div>

                    {/* Savings Tag */}
                    {pkg.savings && pkg.savings > 0 && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-[#FEF3C7] text-[#92400E] text-xs font-black px-3 py-1 rounded-full border border-[#FDE68A]">
                        <span>সাশ্রয়: ৳{toBengaliNumber(pkg.savings)}</span>
                      </div>
                    )}
                  </div>

                  {/* Freebies badges if applicable */}
                  <div className="space-y-2 py-4">
                    {pkg.freeDelivery && (
                      <div className="flex items-center gap-2 text-xs font-bold text-[#065F46] bg-[#ECFDF5] p-2.5 rounded-xl border border-[#A7F3D0]">
                        <Truck className="w-4 h-4 text-[#059669]" />
                        <span>সারাদেশে ফ্রি হোম ডেলিভারি</span>
                      </div>
                    )}
                    {(pkg.freeGift || pkg.freeGiftText) && (
                      <div className="flex items-center gap-2 text-xs font-bold text-[#92400E] bg-[#FEF3C7] p-2.5 rounded-xl border border-[#FDE68A]">
                        <Gift className="w-4 h-4 text-[#D97706]" />
                        <span>{pkg.freeGiftText || "১টি কাঠের তৈরি মধু চামচ ফ্রি"}</span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 pt-2 pb-6">
                    {featuresList.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#44403C]">
                        <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Package Select & Order Button */}
                <button
                  onClick={() => handlePackageClick(pkg)}
                  className={`w-full py-3.5 sm:py-4 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
                    pkg.popular
                      ? "bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white shadow-[#D97706]/30 hover:shadow-lg"
                      : pkg.bestValue
                      ? "bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065F46] text-white shadow-[#059669]/30 hover:shadow-lg"
                      : "bg-[#1C1917] hover:bg-black text-white hover:shadow-lg"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>এই প্যাকটি অর্ডার করুন</span>
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
