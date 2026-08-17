"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "সুন্দরবনের মধু কি আসলেই ১০০% খাঁটি ও কাঁচা (Raw)?",
      a: "হ্যাঁ, আলহামদুলিল্লাহ শতভাগ খাঁটি। এটি কোনো চাষের বা প্রসেস করা মধু নয়। সুন্দরবনের পেশাদার মৌয়ালরা গহীন বন থেকে খলিসা ও গরান ফুলের চাক কেটে সরাসরি এনে পাতলা সুতি কাপড়ে ছেঁকে কাঁচের জারে প্যাক করেন। এতে কোনো প্রকার চিনি, ক্ষতিকর কেমিক্যাল বা হিট প্রসেসিং করা হয় না।",
    },
    {
      q: "শীতকালে বা ফ্রিজে রাখলে কি সুন্দরবনের মধু জমে যায়?",
      a: "খাঁটি কাঁচা মধুতে প্রাকৃতিকভাবে গ্লুকোজ ও ফ্রুক্টোজের উপস্থিতির কারণে তীব্র ঠান্ডায় বা ফ্রিজে রাখলে ক্রিস্টালাইজেশন বা কিছুটা জমতে পারে। এটি খাঁটি কাঁচা মধুর একটি সাধারণ প্রাকৃতিক বৈশিষ্ট্য। হালকা কুসুম গরম পানিতে জারটি কয়েক মিনিট রাখলেই আবার তরল হয়ে যায়। তবে সুন্দরবনের খলিসা ও গরান ফুলের মধুতে ফ্রুক্টোজের পরিমাণ বেশি থাকায় এটি সাধারণত খুব সহজে জমে না।",
    },
    {
      q: "ডেলিভারি পেতে কত সময় লাগবে এবং চার্জ কত?",
      a: "ঢাকা সিটির ভেতর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে (চার্জ ৭০ টাকা) এবং ঢাকা সিটির বাইরে সারাদেশে ২ থেকে ৩ দিনের মধ্যে (চার্জ ১৩০ টাকা) হোম ডেলিভারি পৌঁছে দেওয়া হয়। ২ কেজির ফ্যামিলি প্যাক অর্ডার করলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!",
    },
    {
      q: "পণ্য হাতে পাওয়ার পর চেক করে নেওয়ার সুযোগ আছে কি?",
      a: "অবশ্যই! আমাদের ডেলিভারিম্যান আপনার ঠিকানায় পৌঁছালে আপনি প্যাকেট খুলে মধুর জার, সিল এবং সুবাস সরাসরি চেক করে নিতে পারবেন। সম্পূর্ণ সন্তুষ্ট হয়ে তবেই ডেলিভারিম্যানকে ক্যাশ পেমেন্ট করবেন।",
    },
    {
      q: "ডেলিভারির সময় কাঁচের জার ভেঙে গেলে কী হবে?",
      a: "আমরা অত্যন্ত সুরক্ষিতভাবে মোটা বাবল র‍্যাপ ও মজবুত কার্টনে প্যাক করে পাঠাই। এরপরও যদি কুরিয়ারের অসাবধানতায় জার ভেঙে যায় বা কোনো ক্ষতি হয়, আপনাকে তাৎক্ষণিকভাবে সম্পূর্ণ বিনামূল্যে নতুন জার পাঠিয়ে দেওয়া হবে অথবা পুরো টাকা রিফান্ড করা হবে।",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs sm:text-sm font-semibold">
            <HelpCircle className="w-4 h-4 text-[#D97706]" />
            <span>সচরাচর জিজ্ঞাসা ও উত্তর</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-[#1C1917]">
            আপনার মনে কি কোনো <span className="text-[#D97706]">প্রশ্ন আছে?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#57534E]">
            মধুর গুণাগুণ, ডেলিভারি ও ব্যবহারবিধি সম্পর্কে সর্বাধিক জিজ্ঞাসিত প্রশ্নের উত্তর নিচে দেওয়া হলো।
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#D97706] bg-[#FFFBEB]/40 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#1C1917] cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold shrink-0 ${
                      isOpen ? "bg-[#D97706] text-white" : "bg-gray-100 text-gray-700"
                    }`}>
                      {idx + 1}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-[#D97706]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#57534E] leading-relaxed border-t border-amber-100/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
