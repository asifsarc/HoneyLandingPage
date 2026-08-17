"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingCart, X } from "lucide-react";

interface RecentOrder {
  name: string;
  location: string;
  item: string;
  timeAgo: string;
}

const mockOrders: RecentOrder[] = [
  {
    name: "আব্দুল্লাহ আল মামুন",
    location: "মিরপুর ১০, ঢাকা",
    item: "১ কেজি সুন্দরবন প্রিমিয়াম মধু",
    timeAgo: "২ মিনিট আগে",
  },
  {
    name: "ফাতিমা বেগম",
    location: "ধানমন্ডি, ঢাকা",
    item: "২ কেজি ফ্যামিলি কম্বো প্যাক",
    timeAgo: "৪ মিনিট আগে",
  },
  {
    name: "কাজী তানভীর",
    location: "আগ্রাবাদ, চট্টগ্রাম",
    item: "১ কেজি খলিসা ফুলের মধু",
    timeAgo: "৭ মিনিট আগে",
  },
  {
    name: "মাহমুদ হাসান",
    location: "উপশহর, সিলেট",
    item: "১ কেজি কাঁচা মধু",
    timeAgo: "১১ মিনিট আগে",
  },
  {
    name: "মোঃ রাসেল",
    location: "বয়রা, খুলনা",
    item: "২ কেজি মেগা প্যাক",
    timeAgo: "১৫ মিনিট আগে",
  },
];

export const SocialProofToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial toast after 4s
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Cycle every 10 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockOrders.length);
        setIsVisible(true);
      }, 1500);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const currentOrder = mockOrders[currentIndex];

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-40 max-w-xs sm:max-w-sm pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-amber-200/80 flex items-center gap-3 relative"
          >
            <button
              onClick={() => setDismissed(true)}
              aria-label="বিজ্ঞপ্তি বন্ধ করুন"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Honey Jar Mini Thumbnail */}
            <div className="w-11 h-11 rounded-xl overflow-hidden relative shrink-0 border border-amber-200">
              <Image
                src="/images/sundarban-hero.jpg"
                alt="মধু"
                fill
                className="object-cover"
              />
            </div>

            <div className="pr-4">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-[#1C1917]">
                  {currentOrder.name}
                </p>
                <span className="text-[10px] text-gray-500">({currentOrder.location})</span>
              </div>
              <p className="text-[11px] font-semibold text-[#D97706]">
                {currentOrder.item} অর্ডার করেছেন
              </p>
              <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>{currentOrder.timeAgo}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
