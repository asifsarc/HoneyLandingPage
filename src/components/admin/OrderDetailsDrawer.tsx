"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Phone,
  MessageCircle,
  Printer,
  MapPin,
  Package,
  Gift,
  Clock,
  CheckCircle2,
  Truck,
  User,
  ExternalLink,
  Zap,
  Copy,
  Check,
  Save,
} from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";
import { statusColors } from "./DashboardOrdersTable";
import {
  COURIER_PROVIDERS,
  CourierProviderKey,
  buildTrackingUrl,
} from "@/lib/courier";
import {
  updateOrderCourierAction,
  bookCourierApiAction,
} from "@/actions/courierActions";

interface OrderDetailsDrawerProps {
  order: any;
  onClose: () => void;
  onStatusChange: (orderId: string, status: string) => Promise<void>;
  onPrintInvoice: () => void;
}

export const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({
  order,
  onClose,
  onStatusChange,
  onPrintInvoice,
}) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Courier state
  const [courierProvider, setCourierProvider] = useState<CourierProviderKey>(
    order.courierProvider || "STEADFAST"
  );
  const [trackingCode, setTrackingCode] = useState(order.trackingCode || "");
  const [consignmentId, setConsignmentId] = useState(order.consignmentId || "");
  const [trackingUrl, setTrackingUrl] = useState(order.trackingUrl || "");
  const [courierNotes, setCourierNotes] = useState(order.courierNotes || "");
  const [markAsShipped, setMarkAsShipped] = useState(order.status !== "SHIPPED" && order.status !== "DELIVERED");
  const [isSavingCourier, setIsSavingCourier] = useState(false);
  const [isBookingApi, setIsBookingApi] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [courierFeedbackMsg, setCourierFeedbackMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    setCurrentStatus(newStatus);
    await onStatusChange(order.id, newStatus);
    setIsUpdatingStatus(false);
  };

  const statusInfo = statusColors[currentStatus] || statusColors.PENDING;
  const currentCourier = COURIER_PROVIDERS[courierProvider] || COURIER_PROVIDERS.STEADFAST;

  // Save manual tracking info
  const handleSaveCourierSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCourier(true);
    setCourierFeedbackMsg(null);

    const res = await updateOrderCourierAction({
      orderId: order.id,
      courierProvider,
      trackingCode,
      consignmentId,
      trackingUrl,
      courierNotes,
      autoGenerateUrl: true,
      updateStatusToShipped: markAsShipped,
    });

    if (res.success && res.order) {
      if (res.order.trackingUrl) {
        setTrackingUrl(res.order.trackingUrl);
      }
      if (markAsShipped) {
        setCurrentStatus("SHIPPED");
      }
      setCourierFeedbackMsg({
        type: "success",
        text: "কুরিয়ার ও ট্র্যাকিং তথ্য সফলভাবে সংরক্ষিত হয়েছে!",
      });
      setTimeout(() => setCourierFeedbackMsg(null), 4000);
    } else {
      setCourierFeedbackMsg({
        type: "error",
        text: res.error || "কুরিয়ার তথ্য সংরক্ষণ ব্যর্থ হয়েছে।",
      });
    }

    setIsSavingCourier(false);
  };

  // 1-Click API Booking
  const handleApiBooking = async (provider: "STEADFAST" | "PATHAO") => {
    setIsBookingApi(true);
    setCourierFeedbackMsg(null);

    const res = await bookCourierApiAction({
      orderId: order.id,
      provider,
    });

    if (res.success && res.order) {
      setCourierProvider(res.order.courierProvider as CourierProviderKey);
      setTrackingCode(res.order.trackingCode || "");
      setConsignmentId(res.order.consignmentId || "");
      setTrackingUrl(res.order.trackingUrl || "");
      setCurrentStatus("SHIPPED");
      setCourierFeedbackMsg({
        type: "success",
        text: res.message || "কুরিয়ারে পার্সেল সফলভাবে তৈরি হয়েছে!",
      });
      setTimeout(() => setCourierFeedbackMsg(null), 5000);
    } else {
      setCourierFeedbackMsg({
        type: "error",
        text: res.error || "এপিআই বুকিং ব্যর্থ হয়েছে।",
      });
    }

    setIsBookingApi(false);
  };

  const handleCopyCode = () => {
    if (!trackingCode) return;
    navigator.clipboard.writeText(trackingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // WhatsApp Message with tracking link
  const courierBanglaName = currentCourier.name;
  const trackingTextSnippet = trackingCode
    ? `\n🚚 কুরিয়ার: ${courierBanglaName}\n🔖 ট্র্যাকিং কোড: ${trackingCode}${
        trackingUrl ? `\n🔗 লাইভ ট্র্যাকিং লিংক: ${trackingUrl}` : ""
      }`
    : "";

  const whatsappMessage = encodeURIComponent(
    `আসসালামু আলাইকুম ${order.customerName} ভাই/ম্যাম, সুন্দরবন ন্যাচারালস থেকে আপনার ${order.package.name} এর অর্ডারটি (${order.orderNumber}) সফলভাবে প্রসেস করা হয়েছে।\n\n` +
    `📦 ডেলিভারি ঠিকানা: ${order.shippingAddress}\n` +
    `💰 মোট প্রদেয় (ক্যাশ অন ডেলিভারি): ৳${order.totalAmount}` +
    trackingTextSnippet +
    `\n\nপণ্য হাতে পেয়ে চেক করে পেমেন্ট করবেন। ধন্যবাদ!`
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
      >
        {/* Header */}
        <div>
          <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-[#FAFAF9] sticky top-0 z-20 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-lg text-[#D97706]">
                  {order.orderNumber}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusInfo.bg} ${statusInfo.text}`}>
                  {statusInfo.label}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                অর্ডারের সময়: {new Date(order.createdAt).toLocaleString("bn-BD")}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="বন্ধ করুন"
              className="p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Courier Feedback Alert */}
            {courierFeedbackMsg && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                  courierFeedbackMsg.type === "success"
                    ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
                    : "bg-red-50 border border-red-300 text-red-800"
                }`}
              >
                {courierFeedbackMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{courierFeedbackMsg.text}</span>
              </div>
            )}

            {/* Courier & Tracking Setup Section */}
            <div className="bg-gradient-to-br from-[#FFFBEB] to-amber-50/60 border-2 border-amber-300 p-5 rounded-3xl space-y-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D97706] text-white flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-amber-950">
                      কুরিয়ার ও ট্র্যাকিং কোড সেটআপ
                    </h4>
                    <p className="text-[11px] text-amber-800">
                      Steadfast / Pathao অটো সিঙ্ক অথবা কাস্টম ট্র্যাকিং কোড ইনপুট
                    </p>
                  </div>
                </div>

                {trackingUrl && (
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#D97706] hover:bg-[#B45309] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                  >
                    <span>লাইভ ট্র্যাক</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* 1-Click Fast API Dispatch Buttons */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-amber-900">
                  ⚡ ১-ক্লিক কুরিয়ার এপিআই বুকিং (Instant Dispatch):
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isBookingApi}
                    onClick={() => handleApiBooking("STEADFAST")}
                    className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-70"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>স্টেডফাস্টে পাঠান</span>
                  </button>

                  <button
                    type="button"
                    disabled={isBookingApi}
                    onClick={() => handleApiBooking("PATHAO")}
                    className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-70"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>পাঠাও এ পাঠান</span>
                  </button>
                </div>
              </div>

              {/* Manual / Custom Tracking Form */}
              <form onSubmit={handleSaveCourierSetup} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    কুরিয়ার প্রোভাইডার নির্বাচন করুন
                  </label>
                  <select
                    value={courierProvider}
                    onChange={(e) => {
                      const newProvider = e.target.value as CourierProviderKey;
                      setCourierProvider(newProvider);
                      // Auto update tracking url preview
                      if (trackingCode) {
                        setTrackingUrl(buildTrackingUrl(newProvider, trackingCode, consignmentId) || "");
                      }
                    }}
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-semibold text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
                  >
                    {Object.values(COURIER_PROVIDERS).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.nameEn})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ট্র্যাকিং কোড (Tracking Code)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={trackingCode}
                        onChange={(e) => {
                          setTrackingCode(e.target.value);
                          setTrackingUrl(buildTrackingUrl(courierProvider, e.target.value, consignmentId) || "");
                        }}
                        placeholder="যেমন: ST-839201"
                        className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-mono font-bold text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
                      />
                      {trackingCode && (
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          title="কপি করুন"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      কনসাইনমেন্ট আইডি (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={consignmentId}
                      onChange={(e) => setConsignmentId(e.target.value)}
                      placeholder="যেমন: SFC-1092837"
                      className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-mono text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ক্লিকযোগ্য ট্র্যাকিং লিংক (Tracking URL)
                  </label>
                  <input
                    type="text"
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                    placeholder="https://steadfast.com.bd/t/..."
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-mono text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ডেলিভারি / কুরিয়ার নোট
                  </label>
                  <input
                    type="text"
                    value={courierNotes}
                    onChange={(e) => setCourierNotes(e.target.value)}
                    placeholder="যেমন: ফ্র্যাজাইল কাঁচের জার, সাবধান হ্যান্ডেল করুন"
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={markAsShipped}
                      onChange={(e) => setMarkAsShipped(e.target.checked)}
                      className="w-4 h-4 accent-[#D97706]"
                    />
                    <span className="text-xs font-bold text-gray-800">
                      অর্ডারটি &apos;শিপড (SHIPPED)&apos; হিসেবে মার্ক করুন
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSavingCourier}
                    className="flex items-center gap-1.5 bg-[#D97706] hover:bg-[#B45309] text-white py-2 px-4 rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer disabled:opacity-75"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSavingCourier ? "সংরক্ষণ..." : "ট্র্যাকিং সেভ করুন"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Status Control Card */}
            <div className="bg-[#FAFAF9] border border-gray-200 p-4 rounded-2xl">
              <label className="block text-xs font-bold text-gray-700 mb-2">
                অর্ডার স্ট্যাটাস পরিবর্তন করুন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(statusColors).map((st) => (
                  <button
                    key={st}
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate(st)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentStatus === st
                        ? "bg-[#D97706] text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-amber-50"
                    }`}
                  >
                    {statusColors[st].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Customer Communication Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${order.phone}`}
                className="flex items-center justify-center gap-2 bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] py-3 px-4 rounded-xl text-xs font-bold border border-[#A7F3D0] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#059669]" />
                <span>সরাসরি কল দিন</span>
              </a>

              <a
                href={`https://wa.me/88${order.phone.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ট্র্যাকিংসহ হোয়াটসঅ্যাপ</span>
              </a>
            </div>

            {/* Customer & Delivery Information */}
            <div className="bg-[#FAFAF9] p-5 rounded-2xl border border-gray-200 space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#D97706]" />
                <span>গ্রাহকের বিবরণ ও ঠিকানা</span>
              </h4>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">নাম:</span>
                  <span className="font-bold text-gray-900">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">মোবাইল নাম্বার:</span>
                  <span className="font-mono font-bold text-gray-900">{order.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ডেলিভারি এরিয়া:</span>
                  <span className="font-bold text-[#059669]">
                    {order.deliveryArea === "inside_dhaka" ? "ঢাকা সিটির ভেতরে" : "ঢাকা সিটির বাইরে"}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-gray-500 block mb-1">সম্পূর্ণ ঠিকানা:</span>
                  <p className="text-gray-900 font-medium bg-white p-3 rounded-xl border border-gray-200">
                    {order.shippingAddress}
                  </p>
                </div>
                {order.notes && (
                  <div className="pt-2">
                    <span className="text-gray-500 block mb-1">গ্রাহকের বিশেষ নোট:</span>
                    <p className="text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
                      {order.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Package & Order Financials */}
            <div className="bg-[#FAFAF9] p-5 rounded-2xl border border-gray-200 space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#D97706]" />
                <span>প্যাকেজ ও পেমেন্ট বিবরণ</span>
              </h4>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">{order.package.name}</p>
                    <p className="text-xs text-gray-500">{order.package.weight} × {toBengaliNumber(order.quantity)}</p>
                  </div>
                  <span className="font-mono font-bold text-gray-900">
                    ৳{toBengaliNumber(order.subTotal)}
                  </span>
                </div>

                {order.package.freeGiftText && (
                  <div className="flex justify-between text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <span className="flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-[#D97706]" />
                      ফ্রি উপহার: {order.package.freeGiftText}
                    </span>
                    <span className="font-bold">ফ্রি 🎁</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-mono font-bold">
                    {order.shippingCost === 0 ? "ফ্রি (৳০)" : `৳${toBengaliNumber(order.shippingCost)}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-[#065F46] pt-2 border-t border-gray-200">
                  <span>সর্বমোট ক্যাশ অন ডেলিভারি:</span>
                  <span className="font-mono text-lg">৳{toBengaliNumber(order.totalAmount)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Print & Close CTA */}
        <div className="p-6 border-t border-gray-200 bg-[#FAFAF9] flex items-center gap-3 sticky bottom-0 z-20">
          <button
            onClick={onPrintInvoice}
            className="flex-1 flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>ইনভয়েস / প্যাকিং স্লিপ প্রিন্ট</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </motion.div>
    </div>
  );
};
