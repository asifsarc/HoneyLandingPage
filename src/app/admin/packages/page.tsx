import React from "react";
import { prisma } from "@/lib/prisma";
import { PackageManager } from "@/components/admin/PackageManager";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
          প্যাকেজ ও প্রাইসিং ম্যানেজমেন্ট
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          ল্যান্ডিং পেজের প্রোডাক্ট অপশন, নিয়মিত ও অফার মূল্য, ফ্রি উপহার ও ব্যাজ কাস্টমাইজেশন
        </p>
      </div>

      <PackageManager initialPackages={packages} />
    </div>
  );
}
