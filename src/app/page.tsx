import React from "react";
import { prisma } from "@/lib/prisma";
import { LandingPageClient } from "@/components/LandingPageClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch active packages, reviews, and site settings from Prisma database
  const [packages, reviews, settings] = await Promise.all([
    prisma.package.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.review.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.siteSettings.upsert({
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
    }),
  ]);

  return (
    <LandingPageClient
      packages={packages}
      settings={settings}
      reviews={reviews}
    />
  );
}
