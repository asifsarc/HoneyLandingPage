import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toBengaliNumber } from "@/lib/utils";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  MessageCircle,
  Phone,
  Home,
  ShieldCheck,
  Truck,
  Gift,
} from "lucide-react";
import { OrderSuccessClientView } from "@/components/OrderSuccessClientView";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      package: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBEB]/50 via-white to-[#FAFAF9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Header Branding */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center font-bold text-xl shadow-md">
              🍯
            </div>
            <span className="text-2xl font-black text-[#1C1917]">
              সুন্দরবন <span className="text-[#D97706]">ন্যাচারালস</span>
            </span>
          </Link>
        </div>

        {/* Success Card with Confetti */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-500/50 relative overflow-hidden">
          
          <div className="text-center space-y-3 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#D1FAE5] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917]">
              ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে 🎉
            </h1>

            <p className="text-xs sm:text-sm text-[#57534E]">
              আমাদের কাস্টমার সাপোর্ট প্রতিনিধি খুব শীঘ্রই আপনার নাম্বারে কল করে অর্ডারটি কনফার্ম করবেন।
            </p>
          </div>

          {/* Order Details Breakdown */}
          <div className="py-6 space-y-3 text-xs sm:text-sm border-b border-gray-100">
            <div className="flex justify-between items-center bg-amber-50/70 p-3 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900">অর্ডার ট্র্যাকিং নাম্বার:</span>
              <span className="font-mono font-black text-base text-[#D97706]">
                {order.orderNumber}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>গ্রাহকের নাম:</span>
              <span className="font-semibold text-gray-900">{order.customerName}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>মোবাইল নাম্বার:</span>
              <span className="font-mono font-semibold text-gray-900">{order.phone}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>প্যাকেজ:</span>
              <span className="font-semibold text-gray-900">
                {order.package.name} ({order.package.weight})
              </span>
            </div>

            {order.package.freeGiftText && (
              <div className="flex justify-between text-[#92400E] bg-[#FEF3C7] p-2 rounded-lg text-xs">
                <span className="flex items-center gap-1 font-bold">
                  <Gift className="w-3.5 h-3.5 text-[#D97706]" />
                  ফ্রি উপহার: {order.package.freeGiftText}
                </span>
                <span className="font-bold">ফ্রি 🎁</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>ডেলিভারি ঠিকানা:</span>
              <span className="font-semibold text-gray-900 text-right max-w-[220px]">
                {order.shippingAddress}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>ডেলিভারি চার্জ:</span>
              <span className="font-mono font-bold text-gray-900">
                {order.shippingCost === 0 ? "ফ্রি (৳০)" : `৳${toBengaliNumber(order.shippingCost)}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-black text-[#065F46] pt-3 border-t border-gray-200">
              <span>ক্যাশ অন ডেলিভারিতে প্রদেয়:</span>
              <span className="font-mono text-xl">৳{toBengaliNumber(order.totalAmount)}</span>
            </div>
          </div>

          {/* Interactive Client Actions */}
          <OrderSuccessClientView order={order} />

        </div>

      </div>
    </div>
  );
}
