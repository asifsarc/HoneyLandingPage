import React from "react";
import { prisma } from "@/lib/prisma";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      package: true,
      customer: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
            অর্ডার ব্যবস্থাপনা (Orders Management)
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            সকল অনলাইন অর্ডার ফিল্টার, স্ট্যাটাস পরিবর্তন, ইনভয়েস প্রিন্ট ও কাস্টমার যোগাযোগ
          </p>
        </div>
      </div>

      <OrdersManager initialOrders={orders} />
    </div>
  );
}
