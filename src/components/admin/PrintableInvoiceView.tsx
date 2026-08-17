"use client";

import React from "react";
import { toBengaliNumber } from "@/lib/utils";
import { Gift, ShieldCheck, Truck } from "lucide-react";
import { COURIER_PROVIDERS, CourierProviderKey } from "@/lib/courier";

interface PrintableInvoiceViewProps {
  order: any;
}

export const PrintableInvoiceView: React.FC<PrintableInvoiceViewProps> = ({
  order,
}) => {
  const courier =
    COURIER_PROVIDERS[order.courierProvider as CourierProviderKey] ||
    COURIER_PROVIDERS.STEADFAST;

  return (
    <div className="bg-white text-black p-8 max-w-3xl mx-auto border border-gray-300 print:border-0 print:p-4 print:max-w-none text-xs sm:text-sm font-sans leading-normal">
      
      {/* Header & Logo */}
      <div className="flex justify-between items-start border-b-2 border-amber-600 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍯</span>
            <h1 className="text-2xl font-black tracking-tight text-black font-serif">
              সুন্দরবন ন্যাচারালস
            </h1>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            ১০০% খাঁটি ও প্রাকৃতিক সুন্দরবনের কাঁচা মধু
          </p>
          <p className="text-xs text-gray-500">
            হেল্পলাইন: ০১৭১১-XXXXXX | শ্যামনগর, সাতক্ষীরা ও ঢাকা
          </p>
        </div>

        <div className="text-right">
          <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-black px-3 py-1 rounded-md text-xs uppercase mb-1">
            ক্যাশ অন ডেলিভারি (COD)
          </span>
          <h2 className="text-lg font-mono font-black text-black">
            ইনভয়েস: {order.orderNumber}
          </h2>
          <p className="text-xs text-gray-600 font-mono">
            তারিখ: {new Date(order.createdAt).toLocaleDateString("bn-BD")}
          </p>
        </div>
      </div>

      {/* Customer & Courier Dispatch Info Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6 bg-stone-50 p-4 rounded-xl border border-gray-200">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            ডেলিভারি গ্রহীতার তথ্য:
          </h3>
          <p className="font-bold text-base text-black">{order.customerName}</p>
          <p className="font-mono font-bold text-sm text-black mt-0.5">{order.phone}</p>
          <p className="text-xs text-gray-700 mt-1 leading-relaxed">
            {order.shippingAddress}
          </p>
          <p className="text-xs font-bold text-emerald-800 mt-1">
            {order.deliveryArea === "inside_dhaka"
              ? "ডেলিভারি জোন: ঢাকা সিটির ভেতরে"
              : "ডেলিভারি জোন: ঢাকা সিটির বাইরে"}
          </p>
        </div>

        <div className="border-l border-gray-200 pl-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            কুরিয়ার ও ট্র্যাকিং তথ্য:
          </h3>
          <p className="font-bold text-sm text-black">
            পার্টনার: <span className="text-[#D97706]">{courier.name}</span>
          </p>
          {order.trackingCode && (
            <p className="font-mono text-xs font-bold text-gray-900 mt-1">
              ট্র্যাকিং আইডি: {order.trackingCode}
            </p>
          )}
          {order.consignmentId && (
            <p className="font-mono text-xs text-gray-700">
              কনসাইনমেন্ট: {order.consignmentId}
            </p>
          )}
          {order.notes && (
            <div className="mt-2 bg-amber-50 p-2 rounded border border-amber-200 text-xs text-amber-900">
              <span className="font-bold">বিশেষ নোট:</span> {order.notes}
            </div>
          )}
        </div>
      </div>

      {/* Items Breakdown Table */}
      <table className="w-full text-left border-collapse mb-6 text-xs sm:text-sm">
        <thead>
          <tr className="border-b-2 border-gray-300 bg-stone-100 text-gray-700 font-bold">
            <th className="py-2.5 px-3">বিবরণ / প্যাকেজ</th>
            <th className="py-2.5 px-3 text-center">পরিমাণ</th>
            <th className="py-2.5 px-3 text-right">একক মূল্য</th>
            <th className="py-2.5 px-3 text-right">মোট টাকা</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="py-3 px-3">
              <div className="font-bold text-black">{order.package.name}</div>
              <div className="text-xs text-gray-600">
                {order.package.weight} (১০০% খাঁটি কাঁচা মধু)
              </div>
              {order.package.freeGiftText && (
                <div className="text-xs font-bold text-amber-800 flex items-center gap-1 mt-1">
                  <Gift className="w-3 h-3 text-[#D97706]" />
                  <span>উপহার: {order.package.freeGiftText}</span>
                </div>
              )}
            </td>
            <td className="py-3 px-3 text-center font-mono font-bold">
              {toBengaliNumber(order.quantity)}
            </td>
            <td className="py-3 px-3 text-right font-mono">
              ৳{toBengaliNumber(order.subTotal / order.quantity)}
            </td>
            <td className="py-3 px-3 text-right font-mono font-bold">
              ৳{toBengaliNumber(order.subTotal)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Financial Calculation Summary */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-1.5 text-xs sm:text-sm">
          <div className="flex justify-between text-gray-600">
            <span>পণ্য সাবটোটাল:</span>
            <span className="font-mono">৳{toBengaliNumber(order.subTotal)}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>হোম ডেলিভারি চার্জ:</span>
            <span className="font-mono">
              {order.shippingCost === 0 ? "ফ্রি (৳০)" : `৳${toBengaliNumber(order.shippingCost)}`}
            </span>
          </div>

          <div className="flex justify-between font-black text-base text-black pt-2 border-t-2 border-gray-400">
            <span>ক্যাশ অন ডেলিভারিতে প্রদেয়:</span>
            <span className="font-mono text-lg text-amber-700">
              ৳{toBengaliNumber(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Return Policy & Footer Notes */}
      <div className="border-t border-gray-300 pt-4 text-[11px] text-gray-600 space-y-1">
        <p className="font-bold text-gray-800">
          ⚠️ গ্রাহকের প্রতি বিশেষ নির্দেশনা:
        </p>
        <p>
          ১. ডেলিভারিম্যানের সামনে পার্সেল খুলে মধুর বোতল ও সিল অক্ষত আছে কিনা চেক করুন।
        </p>
        <p>
          ২. কোনো ধরনের ত্রুটি বা অভিযোগ থাকলে তাৎক্ষণিকভাবে আমাদের হেল্পলাইনে কল দিন।
        </p>
        <p className="text-center text-gray-500 pt-4 border-t border-gray-200 mt-4">
          সুন্দরবন ন্যাচারালসকে বেছে নেওয়ার জন্য ধন্যবাদ। সুস্থ থাকুন, প্রাকৃতিক পুষ্টি গ্রহণ করুন!
        </p>
      </div>

    </div>
  );
};
