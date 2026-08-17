"use client";

import React, { useState, useEffect } from "react";
import { Flame, Clock } from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";

interface UrgencyBarProps {
  announcementText?: string;
  stockCounter?: string;
}

export const UrgencyBar: React.FC<UrgencyBarProps> = ({
  announcementText = "সীমিত অফার: আজকের অর্ডারে কাঠের মধু চামচ ফ্রি + বিশেষ ছাড়!",
  stockCounter = "স্টকে বাকি মাত্র ১৭ টি জার",
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 3,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#92400E] via-[#D97706] to-[#92400E] text-white py-2 px-3 text-xs sm:text-sm font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-center">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FEF3C7] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="flex items-center gap-1 font-bold text-[#FEF3C7]">
            <Flame className="w-4 h-4 text-[#FDE68A] animate-pulse" />
            সীমিত অফার:
          </span>
          <span>{announcementText}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs bg-black/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
          <Clock className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span>অফারের বাকি:</span>
          <span className="font-mono font-bold text-[#FEF3C7]">
            {toBengaliNumber(String(timeLeft.hours).padStart(2, "0"))}:
            {toBengaliNumber(String(timeLeft.minutes).padStart(2, "0"))}:
            {toBengaliNumber(String(timeLeft.seconds).padStart(2, "0"))}
          </span>
          <span className="hidden md:inline-block text-[#FEF3C7]/80">| {stockCounter}</span>
        </div>
      </div>
    </div>
  );
};
