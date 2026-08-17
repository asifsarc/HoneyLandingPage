import React from "react";
import { prisma } from "@/lib/prisma";
import { ReviewsManager } from "@/components/admin/ReviewsManager";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
          গ্রাহক রিভিউ ও প্রশংসাপত্র ব্যবস্থাপনা
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          ল্যান্ডিং পেজে প্রদর্শিত কাস্টমার রিভিউ যুক্ত করুন, এডিট করুন বা ড্রাফট করুন
        </p>
      </div>

      <ReviewsManager initialReviews={reviews} />
    </div>
  );
}
