"use client";

import React from "react";
import { Phone, ShieldCheck, ShoppingBag } from "lucide-react";
import { trackContactClick } from "@/lib/tracking";

interface NavbarProps {
  onOrderClick: () => void;
  helplineNumber?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOrderClick,
  helplineNumber = "০১৭১১-XXXXXX",
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#FDE68A]/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center shadow-md shadow-[#D97706]/20 text-white font-bold text-xl sm:text-2xl">
            🍯
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-[#1C1917] font-sans">
                সুন্দরবন <span className="text-[#D97706]">ন্যাচারালস</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 bg-[#ECFDF5] text-[#047857] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#D1FAE5]">
                <ShieldCheck className="w-3.5 h-3.5" />
                ১০০% খাঁটি
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#78716C] font-medium hidden xs:block">
              গহীন অরণ্যের খাঁটি কাঁচা মধু
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Direct Phone / Helpline */}
          <a
            href={`tel:${helplineNumber.replace(/[^0-9]/g, "")}`}
            onClick={() => trackContactClick("Helpline Phone")}
            className="hidden md:flex items-center gap-2 text-xs lg:text-sm font-semibold text-[#065F46] bg-[#ECFDF5] hover:bg-[#D1FAE5] px-3.5 py-2 rounded-xl transition-all border border-[#A7F3D0]"
          >
            <Phone className="w-4 h-4 text-[#059669] animate-bounce" />
            <span>হেল্পলাইন: {helplineNumber}</span>
          </a>

          {/* Quick CTA Button */}
          <button
            onClick={onOrderClick}
            className="relative group overflow-hidden flex items-center gap-2 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base shadow-md shadow-[#D97706]/30 hover:shadow-lg hover:shadow-[#D97706]/40 transition-all active:scale-95 cursor-pointer"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </header>
  );
};
