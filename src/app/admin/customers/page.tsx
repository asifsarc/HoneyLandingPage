import React from "react";
import { prisma } from "@/lib/prisma";
import { CustomersManager } from "@/components/admin/CustomersManager";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { totalSpent: "desc" },
    include: {
      _count: {
        select: { orders: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
          গ্রাহক ডিরেক্টরি (Customer Directory)
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1">
          সকল ক্রেতার কেনাকাটার ইতিহাস, ফোন নাম্বার, লাইফটাইম ভ্যালু ও রিপিট বায়ার তথ্য
        </p>
      </div>

      <CustomersManager initialCustomers={customers} />
    </div>
  );
}
