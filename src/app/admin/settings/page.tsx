import React from "react";
import { prisma } from "@/lib/prisma";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      helplineNumber: "০১৭১১-XXXXXX",
      supportEmail: "support@sundarbannaturals.com",
      stockCounter: "স্টকে বাকি মাত্র ১৭ টি জার",
      deliveryChargeInsideDhaka: 70,
      deliveryChargeOutsideDhaka: 130,
      announcementText: "সীমিত অফার: আজকের অর্ডারে কাঠের মধু চামচ ফ্রি + বিশেষ ছাড়!",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
          ওয়েবসাইট সেটিংস ও ভিডিও কনফিগারেশন
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          YouTube/Vimeo ভিডিও লিংক, স্টক কাউন্টার, ডেলিভারি রেট ও কাস্টমার হেল্পলাইন তথ্য আপডেট
        </p>
      </div>

      <SettingsManager initialSettings={settings} />
    </div>
  );
}
