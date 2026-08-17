"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  MessageCircle,
  Truck,
  Gift,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";
import { PrintableInvoiceView } from "./admin/PrintableInvoiceView";
import { COURIER_PROVIDERS, CourierProviderKey } from "@/lib/courier";

interface OrderSuccessClientViewProps {
  order: any;
}

export const OrderSuccessClientView: React.FC<OrderSuccessClientViewProps> = ({
  order,
}) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#D97706", "#F59E0B", "#10B981", "#059669"],
      });
    } catch {
      // ignore
    }
  }, []);

  const courier =
    COURIER_PROVIDERS[order.courierProvider as CourierProviderKey] ||
    COURIER_PROVIDERS.STEADFAST;

  const handleCopyTracking = () => {
    if (!order.trackingCode) return;
    navigator.clipboard.writeText(order.trackingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `হ্যালো! আমি সুন্দরবন কাঁচা মধুর অর্ডার দিয়েছি। আমার অর্ডার আইডি: ${order.orderNumber}, মোট টাকা: ৳${order.totalAmount}।`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFBEB]/60 via-[#FAFAF9] to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Top Success Badge */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-500 text-center space-y-4 relative overflow-hidden">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-100 shadow-md">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
              অর্ডার সফলভাবে সম্পন্ন হয়েছে 🎉
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917]">
              ধন্যবাদ, {order.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto">
              আপনার সুন্দরবনের খাঁটি কাঁচা মধুর অর্ডারটি আমাদের সিস্টেমে সংরক্ষিত হয়েছে। আমাদের প্রতিনিধি খুব শীঘ্রই যোগাযোগ করবেন।
            </p>
          </div>
        </div>

        {/* Live Courier Tracking Card (If Assigned) */}
        {order.trackingCode && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-3xl p-6 border-2 border-amber-300 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-amber-950">
                    কুরিয়ার ডেলিভারি ও ট্র্যাকিং তথ্য
                  </h3>
                  <p className="text-xs text-amber-800">
                    পার্সেল কুরিয়ারে হস্তান্তর করা হয়েছে
                  </p>
                </div>
              </div>

              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${courier.badgeColor} ${courier.textColor} ${courier.borderColor}`}
              >
                {courier.name}
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 block">ট্র্যাকিং কোড:</span>
                <span className="font-mono text-base font-black text-[#D97706]">
                  {order.trackingCode}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyTracking}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-1.5 px-3 rounded-xl transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "কপি হয়েছে" : "কপি"}</span>
                </button>

                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold py-1.5 px-3 rounded-xl transition-colors shadow-xs"
                  >
                    <span>ট্র্যাক করুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Order Details Breakdown Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-gray-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-xs font-bold text-gray-500">অর্ডার ট্র্যাকিং নম্বর:</span>
            <span className="font-mono font-black text-lg text-[#D97706]">
              {order.orderNumber}
            </span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between text-gray-600">
              <span>প্যাকেজ:</span>
              <span className="font-bold text-gray-900">
                {order.package.name} ({order.package.weight})
              </span>
            </div>

            {order.package.freeGiftText && (
              <div className="flex justify-between text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 text-xs">
                <span className="flex items-center gap-1 font-bold">
                  <Gift className="w-3.5 h-3.5 text-[#D97706]" />
                  ফ্রি উপহার: {order.package.freeGiftText}
                </span>
                <span className="font-bold">ফ্রি 🎁</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>মোবাইল নম্বর:</span>
              <span className="font-mono font-semibold text-gray-900">{order.phone}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>ডেলিভারি ঠিকানা:</span>
              <span className="font-semibold text-gray-900 text-right max-w-[220px] truncate">
                {order.shippingAddress}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>হোম ডেলিভারি চার্জ:</span>
              <span className="font-bold text-emerald-600 font-mono">
                {order.shippingCost === 0 ? "ফ্রি (৳০)" : `৳${toBengaliNumber(order.shippingCost)}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-black text-[#065F46] pt-3 border-t border-gray-200">
              <span>ক্যাশ অন ডেলিভারিতে প্রদেয়:</span>
              <span className="font-mono text-xl">৳{toBengaliNumber(order.totalAmount)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে আপডেট পান</span>
            </a>

            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>রসিদ প্রিন্ট করুন</span>
            </button>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#D97706] hover:text-[#B45309]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>মূল ল্যান্ডিং পেজে ফিরে যান</span>
          </Link>
        </div>

      </div>

      {/* Print Receipt Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl my-8 relative">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 print:hidden">
              <h3 className="font-bold text-sm text-gray-800">অর্ডার ইনভয়েস / রসিদ</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>

            <PrintableInvoiceView order={order} />
          </div>
        </div>
      )}
    </div>
  );
};
