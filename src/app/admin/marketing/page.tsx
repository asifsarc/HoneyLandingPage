import React from "react";
import { prisma } from "@/lib/prisma";
import { MarketingManager } from "@/components/admin/MarketingManager";

export const dynamic = "force-dynamic";

export default async function AdminMarketingPage() {
  const settings = await prisma.marketingSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
          মার্কেটিং ও ট্র্যাকিং ইন্টিগ্রেশন
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          Meta Pixel, Conversions API (CAPI), Google Tag Manager, GA4 এবং কাস্টম স্ক্রিপ্ট পরিচালনা করুন
        </p>
      </div>

      <MarketingManager initialSettings={settings} />
    </div>
  );
}
