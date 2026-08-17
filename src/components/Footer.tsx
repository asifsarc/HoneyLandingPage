"use client";

import React from "react";
import { Phone, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  helplineNumber?: string;
  supportEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({
  helplineNumber = "০১৭১১-XXXXXX",
  supportEmail = "support@sundarbannaturals.com",
}) => {
  return (
    <footer className="bg-[#1C1917] text-gray-300 pt-16 pb-24 md:pb-16 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white font-bold text-xl">
                🍯
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                সুন্দরবন <span className="text-[#F59E0B]">ন্যাচারালস</span>
              </span>
            </div>
            
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              সুন্দরবনের গহীন অরণ্য থেকে ঐতিহ্যবাহী মৌয়ালদের মাধ্যমে সংগ্রহ করা ১০০% খাঁটি, আনপ্রসেসড ও প্রাকৃতিক কাঁচা মধুর বিশ্বস্ত নাম। আমাদের লক্ষ্য প্রতিটি ঘরে আসল প্রাকৃতিক পুষ্টি পৌঁছে দেওয়া।
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>১০০% রাসায়নিক ও সুগারমুক্ত খাঁটি কাঁচা মধুর নিশ্চয়তা</span>
            </div>
          </div>

          {/* Col 2: Helpline & Contact */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              জরুরি হেল্পলাইন ও কাস্টমার সাপোর্ট
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a
                href={`tel:${helplineNumber.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F59E0B]" />
                <span>+৮৮ {helplineNumber} (সকাল ৯টা - রাত ১০টা)</span>
              </a>
              <a
                href={`mailto:${supportEmail}`}
                className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#F59E0B]" />
                <span>{supportEmail}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
                <span>শ্যামনগর, সাতক্ষীরা (সুন্দরবন রেঞ্জ) ও বনানী, ঢাকা</span>
              </div>
            </div>
          </div>

          {/* Col 3: Delivery & Return */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              ডেলিভারি ও রিটার্ন পলিসি
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>• সারাদেশে ৪৮-৭২ ঘণ্টায় ক্যাশ অন ডেলিভারি</li>
              <li>• ডেলিভারিম্যানের সামনে চেক করার সুবিধা</li>
              <li>• পছন্দ না হলে তাৎক্ষণিক রিটার্ন পলিসি</li>
              <li>• ফুড-গ্রেড সিল্ড প্যাকেজিং সুরক্ষা</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} সুন্দরবন ন্যাচারালস | সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            মমতা ও সততার সাথে প্রস্তুতকৃত <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" /> সুন্দরবনের আসল উপহার
          </p>
        </div>

      </div>
    </footer>
  );
};
