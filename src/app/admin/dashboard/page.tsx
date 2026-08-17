import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { toBengaliNumber } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Truck,
  Users,
  Package,
} from "lucide-react";
import { DashboardOrdersTable } from "@/components/admin/DashboardOrdersTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Compute analytics
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    totalOrdersCount,
    todayOrdersCount,
    pendingOrdersCount,
    deliveredOrdersCount,
    totalCustomersCount,
    allOrders,
    todayOrders,
    packages,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.customer.count(),
    prisma.order.findMany({ select: { totalAmount: true, status: true } }),
    prisma.order.findMany({
      where: { createdAt: { gte: todayStart } },
      select: { totalAmount: true },
    }),
    prisma.package.findMany({
      include: {
        _count: {
          select: { orders: true },
        },
      },
    }),
  ]);

  const totalRevenue = allOrders
    .filter((o) => o.status !== "CANCELLED" && o.status !== "RETURNED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const deliveryRate =
    totalOrdersCount > 0
      ? Math.round((deliveredOrdersCount / totalOrdersCount) * 100)
      : 0;

  // Recent 6 orders
  const recentOrders = await prisma.order.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: {
      package: true,
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
            ড্যাশবোর্ড ও ওভারভিউ
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1">
            সুন্দরবন ন্যাচারালস অনলাইন স্টোরের রিয়েল-টাইম বিক্রয় ও অর্ডার পরিসংখ্যান
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#D97706]/20 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>সকল অর্ডার দেখুন</span>
        </Link>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">মোট বিক্রয় (রেভিনিউ)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
              ৳
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#1C1917] font-mono">
              ৳{toBengaliNumber(totalRevenue.toLocaleString())}
            </p>
            <p className="text-[11px] text-[#059669] font-semibold mt-1">
              আজকের বিক্রয়: ৳{toBengaliNumber(todayRevenue.toLocaleString())}
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">মোট অর্ডার সংখ্যা</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#1C1917] font-mono">
              {toBengaliNumber(totalOrdersCount)} টি
            </p>
            <p className="text-[11px] text-gray-500 font-semibold mt-1">
              আজ নতুন অর্ডার: {toBengaliNumber(todayOrdersCount)} টি
            </p>
          </div>
        </div>

        {/* Pending Orders Alert */}
        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">অপেক্ষমাণ (পেন্ডিং) অর্ডার</span>
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
              {toBengaliNumber(pendingOrdersCount)} টি
            </p>
            <p className="text-[11px] text-amber-700 font-semibold mt-1">
              {pendingOrdersCount > 0 ? "⚠️ দ্রুত কনফার্মেশন কল দেওয়া প্রয়োজন" : "সব অর্ডার আপডেট করা"}
            </p>
          </div>
        </div>

        {/* Delivery Completion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">ডেলিভারি সফলতার হার</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-[#1C1917] font-mono">
              {toBengaliNumber(deliveryRate)}%
            </p>
            <p className="text-[11px] text-[#059669] font-semibold mt-1">
              সফল ডেলিভারি: {toBengaliNumber(deliveredOrdersCount)} টি
            </p>
          </div>
        </div>

      </div>

      {/* Package Sales Breakdown & Customer Stat Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Selling Packages */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1C1917]">
              প্যাকেজ অনুযায়ী বিক্রয় পরিসংখ্যান
            </h3>
            <Link
              href="/admin/packages"
              className="text-xs font-bold text-[#D97706] hover:underline"
            >
              প্যাকেজ ম্যানেজ করুন
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-4 rounded-2xl bg-[#FAFAF9] border border-gray-200/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C1917] truncate">{pkg.name}</span>
                  {pkg.popular && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                      টপ
                    </span>
                  )}
                </div>
                <p className="text-lg font-black text-[#D97706] font-mono">
                  ৳{toBengaliNumber(pkg.salePrice)}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-200">
                  <span>অর্ডার সংখ্যা:</span>
                  <span className="font-bold text-gray-900 font-mono">
                    {toBengaliNumber(pkg._count.orders)} টি
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Base Overview */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#059669]" />
              <h3 className="text-base font-bold text-[#1C1917]">গ্রাহক নেটওয়ার্ক</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              সারা বাংলাদেশ থেকে সরাসরি অর্ডার করা নিবন্ধিত গ্রাহকদের প্রোফাইল ও ক্রয় ইতিহাস।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0]">
            <p className="text-xs font-semibold text-[#065F46]">মোট অনন্য গ্রাহক</p>
            <p className="text-3xl font-black text-[#065F46] font-mono mt-1">
              {toBengaliNumber(totalCustomersCount)} জন
            </p>
          </div>

          <Link
            href="/admin/customers"
            className="w-full text-center py-2.5 text-xs font-bold text-[#065F46] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
          >
            গ্রাহক ডিরেক্টরি দেখুন →
          </Link>
        </div>

      </div>

      {/* Recent Orders Section with Client Status Controls */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
              সর্বশেষ অর্ডারসমূহ
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              দ্রুত স্ট্যাটাস পরিবর্তন ও কাস্টমার বিস্তারিত দেখুন
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <DashboardOrdersTable orders={recentOrders} />
      </div>

    </div>
  );
}
