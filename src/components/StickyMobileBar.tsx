"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";
import { fallbackPackagesData, PackageType } from "./PricingPackages";

interface StickyMobileBarProps {
  selectedPackageId: string;
  onOrderClick: () => void;
  packages?: any[];
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  selectedPackageId,
  onOrderClick,
  packages,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const availablePackages: PackageType[] =
    packages && packages.length > 0
      ? packages.map((p) => ({
          id: p.id || p.slug,
          slug: p.slug,
          name: p.name,
          weight: p.weight,
          regularPrice: p.regularPrice,
          discountPrice: p.salePrice || p.regularPrice,
          popular: p.popular,
          bestValue: p.bestValue,
          freeDelivery: p.freeDelivery,
          freeGift: p.freeGift,
          features: p.features,
        }))
      : fallbackPackagesData;

  const currentPkg =
    availablePackages.find(
      (p) => p.id === selectedPackageId || p.slug === selectedPackageId
    ) || availablePackages[0];

  if (!isVisible) return null;

  const price = currentPkg.discountPrice || currentPkg.regularPrice;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#FDE68A] p-3 shadow-2xl transition-transform duration-300">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-[#D97706] font-mono">
              ৳{toBengaliNumber(price)}
            </span>
            <span className="text-xs text-gray-400 line-through font-mono">
              ৳{toBengaliNumber(currentPkg.regularPrice)}
            </span>
          </div>
          <p className="text-[10px] text-[#059669] font-bold">
            ক্যাশ অন ডেলিভারি • {currentPkg.name}
          </p>
        </div>

        <button
          onClick={onOrderClick}
          className="relative group overflow-hidden flex-1 bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] text-white py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D97706]/30 active:scale-95 cursor-pointer animate-pulse-glow"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>অর্ডার করতে ক্লিক করুন</span>
        </button>
      </div>
    </div>
  );
};
