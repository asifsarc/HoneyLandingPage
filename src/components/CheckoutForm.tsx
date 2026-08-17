"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Gift,
  RotateCcw,
  X,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";
import { createOrderAction } from "@/actions/orderActions";
import { fallbackPackagesData, PackageType } from "./PricingPackages";
import { trackInitiateCheckout, trackClientPurchase } from "@/lib/tracking";

const checkoutSchema = z.object({
  name: z
    .string()
    .min(3, { message: "অনুগ্রহ করে আপনার পুরো নাম লিখুন (কমপক্ষে ৩ অক্ষর)" }),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message: "সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 01712345678)",
    }),
  address: z
    .string()
    .min(10, { message: "অনুগ্রহ করে সম্পূর্ণ ঠিকানা লিখুন (রোড, বাড়ি, থানা, জেলা)" }),
  deliveryArea: z.enum(["inside_dhaka", "outside_dhaka"], {
    errorMap: () => ({ message: "ডেলিভারি লোকেশন নির্বাচন করুন" }),
  }),
  note: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  selectedPackageId: string;
  onSelectPackage: (pkgId: string) => void;
  packages?: any[];
  deliveryChargeInside?: number;
  deliveryChargeOutside?: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  selectedPackageId,
  onSelectPackage,
  packages,
  deliveryChargeInside = 70,
  deliveryChargeOutside = 130,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasTrackedCheckout, setHasTrackedCheckout] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState<{
    orderNumber: string;
    customerName: string;
    phone: string;
    address: string;
    packageName: string;
    packageWeight: string;
    freeGiftText?: string | null;
    deliveryFee: number;
    grandTotal: number;
  } | null>(null);

  const availablePackages: PackageType[] =
    packages && packages.length > 0
      ? packages.map((p) => ({
          id: p.id || p.slug,
          slug: p.slug,
          name: p.name,
          weight: p.weight,
          regularPrice: p.regularPrice,
          discountPrice: p.salePrice || p.regularPrice,
          salePrice: p.salePrice || p.regularPrice,
          savings: Math.max(0, p.regularPrice - (p.salePrice || p.regularPrice)),
          popular: p.popular,
          bestValue: p.bestValue,
          freeDelivery: p.freeDelivery,
          freeGift: p.freeGift,
          freeGiftText: p.freeGiftText,
          badgeText: p.badgeText,
          features: p.features,
        }))
      : fallbackPackagesData;

  const currentPkg =
    availablePackages.find(
      (p) => p.id === selectedPackageId || p.slug === selectedPackageId
    ) || availablePackages[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      deliveryArea: "inside_dhaka",
      note: "",
    },
  });

  const selectedDeliveryArea = watch("deliveryArea");

  const deliveryFee = currentPkg.freeDelivery
    ? 0
    : selectedDeliveryArea === "inside_dhaka"
    ? deliveryChargeInside
    : deliveryChargeOutside;

  const pkgPrice = currentPkg.discountPrice || currentPkg.salePrice || currentPkg.regularPrice;
  const grandTotal = pkgPrice + deliveryFee;

  const handleFormFocus = () => {
    if (!hasTrackedCheckout) {
      setHasTrackedCheckout(true);
      trackInitiateCheckout({
        id: currentPkg.id,
        name: currentPkg.name,
        price: pkgPrice,
        weight: currentPkg.weight,
      });
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const eventId = `EVT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await createOrderAction({
        name: data.name,
        phone: data.phone,
        address: data.address,
        deliveryArea: data.deliveryArea,
        packageId: currentPkg.id,
        notes: data.note,
        quantity: 1,
        eventId,
      });

      if (res.success && res.orderNumber) {
        setOrderSuccessData({
          orderNumber: res.orderNumber,
          customerName: res.customerName || data.name,
          phone: res.phone || data.phone,
          address: res.address || data.address,
          packageName: res.packageName || currentPkg.name,
          packageWeight: res.packageWeight || currentPkg.weight,
          freeGiftText: res.freeGiftText || currentPkg.freeGiftText,
          deliveryFee: res.shippingCost ?? deliveryFee,
          grandTotal: res.totalAmount ?? grandTotal,
        });

        // Fire Client-Side Purchase tracking (Pixel + GTM)
        trackClientPurchase({
          orderNumber: res.orderNumber,
          totalAmount: res.totalAmount ?? grandTotal,
          shippingCost: res.shippingCost ?? deliveryFee,
          eventId,
          customerName: data.name,
          phone: data.phone,
          items: [
            {
              id: currentPkg.id,
              name: currentPkg.name,
              price: pkgPrice,
              quantity: 1,
              weight: currentPkg.weight,
            },
          ],
        });

        // Trigger confetti
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#D97706", "#F59E0B", "#10B981", "#059669"],
          });
        } catch {
          // ignore
        }
      } else {
        setSubmitError(res.error || "অর্ডার প্রক্রিয়াকরণে ত্রুটি হয়েছে।");
      }
    } catch (err: any) {
      setSubmitError(err.message || "একটি ত্রুটি ঘটেছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="checkout"
      className="py-16 sm:py-24 bg-gradient-to-b from-[#FFFBEB]/50 via-white to-[#FAFAF9] relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs sm:text-sm font-semibold">
            <Lock className="w-4 h-4 text-[#059669]" />
            <span>১০০% নিরাপদ ও ক্যাশ অন ডেলিভারি চেকআউট</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1C1917]">
            অর্ডার করতে নিচের <span className="text-[#D97706]">ফর্মটি পূরণ করুন</span>
          </h2>

          <p className="text-sm sm:text-base text-[#57534E]">
            কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই। ডেলিভারিম্যান পৌঁছালে মধু দেখে ও চেক করে ক্যাশ পেমেন্ট করবেন।
          </p>
        </div>

        {submitError && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Package Selection & Customer Info Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* 1. Package Selection Cards */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-amber-200 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs font-bold">
                    ১
                  </span>
                  <h3 className="text-lg font-bold text-[#1C1917]">
                    আপনার কাঙ্ক্ষিত প্যাকেজটি নির্বাচন করুন:
                  </h3>
                </div>

                <div className="space-y-3">
                  {availablePackages.map((pkg) => {
                    const isSelected =
                      selectedPackageId === pkg.id || selectedPackageId === pkg.slug;
                    const price = pkg.discountPrice || pkg.salePrice || pkg.regularPrice;

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => onSelectPackage(pkg.id || pkg.slug || "")}
                        className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                          isSelected
                            ? "border-[#D97706] bg-[#FFFBEB] shadow-md ring-2 ring-[#FDE68A]"
                            : "border-gray-200 hover:border-amber-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#D97706] bg-[#D97706]"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-base text-[#1C1917]">
                                {pkg.name} ({pkg.weight})
                              </span>
                              {pkg.badgeText && (
                                <span className="text-[10px] font-black bg-[#D97706] text-white px-2 py-0.5 rounded-full">
                                  {pkg.badgeText}
                                </span>
                              )}
                              {pkg.freeDelivery && (
                                <span className="text-[10px] font-black bg-[#059669] text-white px-2 py-0.5 rounded-full">
                                  ফ্রি ডেলিভারি
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#78716C] mt-0.5">
                              {pkg.freeGiftText
                                ? `🎁 ${pkg.freeGiftText}`
                                : "১০০% আনপ্রসেসড কাঁচা মধু"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xl sm:text-2xl font-black text-[#D97706] font-mono">
                            ৳{toBengaliNumber(price)}
                          </span>
                          <span className="block text-xs text-gray-400 line-through font-mono">
                            ৳{toBengaliNumber(pkg.regularPrice)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Customer Delivery Details Form */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gray-200 shadow-md space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs font-bold">
                    ২
                  </span>
                  <h3 className="text-lg font-bold text-[#1C1917]">
                    আপনার ডেলিভারি তথ্য প্রদান করুন:
                  </h3>
                </div>

                <div>
                  <label htmlFor="checkout-name" className="block text-xs sm:text-sm font-bold text-[#292524] mb-1.5">
                    আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    placeholder="যেমন: মোঃ জাহিদ হাসান"
                    {...register("name")}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-[#FAFAF9] text-sm text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#D97706] focus:bg-white transition-all ${
                      errors.name ? "border-red-500 bg-red-50/30" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                      ⚠️ {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="block text-xs sm:text-sm font-bold text-[#292524] mb-1.5">
                    মোবাইল / হোয়াটসঅ্যাপ নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    placeholder="যেমন: 01712345678"
                    {...register("phone")}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-[#FAFAF9] text-sm text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#D97706] focus:bg-white transition-all ${
                      errors.phone ? "border-red-500 bg-red-50/30" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                      ⚠️ {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#292524] mb-2">
                    ডেলিভারি এরিয়া নির্বাচন করুন <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        selectedDeliveryArea === "inside_dhaka"
                          ? "border-[#059669] bg-[#ECFDF5]"
                          : "border-gray-200 bg-[#FAFAF9]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          value="inside_dhaka"
                          {...register("deliveryArea")}
                          className="accent-[#059669] w-4 h-4"
                        />
                        <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                          ঢাকা সিটির ভেতরে
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#059669]">
                        {currentPkg.freeDelivery ? "ফ্রি" : `৳${toBengaliNumber(deliveryChargeInside)}`}
                      </span>
                    </label>

                    <label
                      className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                        selectedDeliveryArea === "outside_dhaka"
                          ? "border-[#059669] bg-[#ECFDF5]"
                          : "border-gray-200 bg-[#FAFAF9]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          value="outside_dhaka"
                          {...register("deliveryArea")}
                          className="accent-[#059669] w-4 h-4"
                        />
                        <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                          ঢাকা সিটির বাইরে
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#059669]">
                        {currentPkg.freeDelivery ? "ফ্রি" : `৳${toBengaliNumber(deliveryChargeOutside)}`}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-address" className="block text-xs sm:text-sm font-bold text-[#292524] mb-1.5">
                    সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="checkout-address"
                    rows={3}
                    placeholder="রোড নাম্বার, বাড়ি নাম্বার/হোল্ডিং, এলাকা, থানা এবং জেলার নাম লিখুন"
                    {...register("address")}
                    className={`w-full px-4 py-3 rounded-xl border bg-[#FAFAF9] text-sm text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#D97706] focus:bg-white transition-all ${
                      errors.address ? "border-red-500 bg-red-50/30" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                      ⚠️ {errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-note" className="block text-xs sm:text-sm font-semibold text-[#57534E] mb-1.5">
                    বিশেষ কোনো নির্দেশনা থাকলে লিখুন (ঐচ্ছিক)
                  </label>
                  <input
                    id="checkout-note"
                    type="text"
                    placeholder="যেমন: সকাল ১০টার পর ডেলিভারি দেবেন"
                    {...register("note")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-[#FAFAF9] text-xs sm:text-sm text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Live Order Summary Card & CTA Submit */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              
              <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#D97706]/40 shadow-xl shadow-[#D97706]/10 relative overflow-hidden">
                
                <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white -mx-7 -mt-7 p-4 text-center font-bold text-base flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>অর্ডার সামারি ও মোট হিসাব</span>
                </div>

                <div className="space-y-4 pt-6 text-sm">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <p className="font-bold text-[#1C1917]">{currentPkg.name}</p>
                      <p className="text-xs text-[#78716C]">{currentPkg.weight}</p>
                    </div>
                    <span className="font-bold font-mono text-[#1C1917] text-base">
                      ৳{toBengaliNumber(pkgPrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>রেগুলার মূল্য</span>
                    <span className="line-through font-mono">৳{toBengaliNumber(currentPkg.regularPrice)}</span>
                  </div>

                  {currentPkg.savings && currentPkg.savings > 0 && (
                    <div className="flex items-center justify-between text-xs text-[#059669] font-bold">
                      <span>বিশেষ ছাড়</span>
                      <span className="font-mono">-৳{toBengaliNumber(currentPkg.savings)}</span>
                    </div>
                  )}

                  {currentPkg.freeGiftText && (
                    <div className="flex items-center justify-between text-xs text-[#92400E] bg-[#FEF3C7] p-2 rounded-xl border border-[#FDE68A]">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Gift className="w-4 h-4 text-[#D97706]" />
                        {currentPkg.freeGiftText}
                      </span>
                      <span className="font-bold">ফ্রি 🎁</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-[#57534E]">হোম ডেলিভারি চার্জ</span>
                    <span className="font-bold font-mono text-[#1C1917]">
                      {deliveryFee === 0 ? (
                        <span className="text-[#059669]">ফ্রি (৳০)</span>
                      ) : (
                        `৳${toBengaliNumber(deliveryFee)}`
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 pb-2">
                    <span className="text-base sm:text-lg font-black text-[#1C1917]">
                      সর্বমোট প্রদেয় টাকা:
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#D97706] font-mono">
                      ৳{toBengaliNumber(grandTotal)}
                    </span>
                  </div>

                  <div className="bg-[#ECFDF5] border border-[#A7F3D0] p-3 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#065F46]">ক্যাশ অন ডেলিভারি (COD)</p>
                      <p className="text-[11px] text-[#047857]">পণ্য হাতে পেয়ে চেক করে টাকা দিন</p>
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full relative group overflow-hidden bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] hover:from-[#B45309] hover:to-[#D97706] text-white py-4 px-6 rounded-2xl font-black text-lg sm:text-xl shadow-xl shadow-[#D97706]/35 hover:shadow-2xl transition-all transform active:scale-95 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed animate-pulse-glow"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                  
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      <span>অর্ডার কনফার্ম করুন (৳{toBengaliNumber(grandTotal)})</span>
                    </span>
                  )}
                </button>

                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-[11px] text-[#78716C] font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#059669]" />
                    <span>১০০% নিরাপদ</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-[#D97706]" />
                    <span>ক্যাশ অন ডেলিভারি</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-[#059669]" />
                    <span>ইজি রিটার্ন</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </form>

      </div>

      {/* Order Success Confirmation Modal */}
      <AnimatePresence>
        {orderSuccessData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-[#059669] relative overflow-hidden"
            >
              <button
                onClick={() => setOrderSuccessData(null)}
                aria-label="ক্লোজ করুন"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#D1FAE5]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#1C1917]">
                  ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে 🎉
                </h3>

                <p className="text-xs sm:text-sm text-[#57534E]">
                  আমাদের কাস্টমার কেয়ার প্রতিনিধি খুব শীঘ্রই আপনার নাম্বারে কল করে অর্ডারটি ভেরিফাই করবেন।
                </p>
              </div>

              <div className="mt-6 bg-[#FAFAF9] p-4.5 rounded-2xl border border-gray-200 text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between font-bold text-[#1C1917] pb-2 border-b border-gray-200">
                  <span>অর্ডার ট্র্যাকিং আইডি:</span>
                  <span className="font-mono text-[#D97706]">{orderSuccessData.orderNumber}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>গ্রাহকের নাম:</span>
                  <span className="font-semibold text-gray-900">{orderSuccessData.customerName}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>মোবাইল নাম্বার:</span>
                  <span className="font-semibold text-gray-900">{orderSuccessData.phone}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>প্যাকেজ:</span>
                  <span className="font-semibold text-gray-900">{orderSuccessData.packageName} ({orderSuccessData.packageWeight})</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ডেলিভারি ঠিকানা:</span>
                  <span className="font-semibold text-gray-900 text-right max-w-[200px] truncate">{orderSuccessData.address}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#065F46] pt-2 border-t border-gray-200">
                  <span>ক্যাশ অন ডেলিভারিতে প্রদেয়:</span>
                  <span className="font-mono text-lg">৳{toBengaliNumber(orderSuccessData.grandTotal)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                    `হ্যালো! আমি সুন্দরবন কাঁচা মধুর অর্ডার দিয়েছি। অর্ডার আইডি: ${orderSuccessData.orderNumber}, মোট টাকা: ৳${orderSuccessData.grandTotal}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>হোয়াটসঅ্যাপে আপডেট পান</span>
                </a>

                <button
                  onClick={() => {
                    setOrderSuccessData(null);
                    reset();
                  }}
                  className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-800 font-semibold cursor-pointer"
                >
                  উইন্ডো বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
