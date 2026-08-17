"use client";

import React, { useState } from "react";
import { toBengaliNumber } from "@/lib/utils";
import {
  Package,
  Plus,
  Edit2,
  Check,
  X,
  Star,
  Gift,
  Truck,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  updatePackageAction,
  createPackageAction,
  togglePackageActiveAction,
} from "@/actions/packageActions";

interface PackageType {
  id: string;
  slug: string;
  name: string;
  weight: string;
  regularPrice: number;
  salePrice: number;
  badgeText: string | null;
  freeGiftText: string | null;
  freeDelivery: boolean;
  freeGift: boolean;
  popular: boolean;
  bestValue: boolean;
  features: string;
  isActive: boolean;
  sortOrder: number;
}

interface PackageManagerProps {
  initialPackages: PackageType[];
}

export const PackageManager: React.FC<PackageManagerProps> = ({
  initialPackages,
}) => {
  const [packages, setPackages] = useState<PackageType[]>(initialPackages);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [weight, setWeight] = useState("");
  const [regularPrice, setRegularPrice] = useState<number>(1000);
  const [salePrice, setSalePrice] = useState<number>(850);
  const [badgeText, setBadgeText] = useState("");
  const [freeGiftText, setFreeGiftText] = useState("");
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [freeGift, setFreeGift] = useState(false);
  const [popular, setPopular] = useState(false);
  const [bestValue, setBestValue] = useState(false);
  const [featuresText, setFeaturesText] = useState("");
  const [sortOrder, setSortOrder] = useState(1);

  const handleOpenEdit = (pkg: PackageType) => {
    setEditingPackage(pkg);
    setIsCreating(false);
    setName(pkg.name);
    setSlug(pkg.slug);
    setWeight(pkg.weight);
    setRegularPrice(pkg.regularPrice);
    setSalePrice(pkg.salePrice);
    setBadgeText(pkg.badgeText || "");
    setFreeGiftText(pkg.freeGiftText || "");
    setFreeDelivery(pkg.freeDelivery);
    setFreeGift(pkg.freeGift);
    setPopular(pkg.popular);
    setBestValue(pkg.bestValue);
    setSortOrder(pkg.sortOrder);

    try {
      const parsed = JSON.parse(pkg.features);
      setFeaturesText(Array.isArray(parsed) ? parsed.join("\n") : "");
    } catch {
      setFeaturesText("");
    }
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingPackage(null);
    setName("");
    setSlug("");
    setWeight("");
    setRegularPrice(1000);
    setSalePrice(850);
    setBadgeText("");
    setFreeGiftText("");
    setFreeDelivery(false);
    setFreeGift(false);
    setPopular(false);
    setBestValue(false);
    setFeaturesText("১০০% খাঁটি সুন্দরবনের কাঁচা মধু\nপ्रीमিয়াম ফুড-গ্রেড জার\nক্যাশ অন ডেলিভারি সুবিধা");
    setSortOrder(packages.length + 1);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const featuresArray = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    if (isCreating) {
      const res = await createPackageAction({
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        name,
        weight,
        regularPrice,
        salePrice,
        badgeText,
        freeGiftText,
        freeDelivery,
        freeGift,
        popular,
        bestValue,
        features: featuresArray,
        sortOrder,
      });
      if (res.success && res.package) {
        setPackages((prev) => [...prev, res.package as any]);
      }
    } else if (editingPackage) {
      const res = await updatePackageAction(editingPackage.id, {
        name,
        weight,
        regularPrice,
        salePrice,
        badgeText,
        freeGiftText,
        freeDelivery,
        freeGift,
        popular,
        bestValue,
        features: featuresArray,
        isActive: editingPackage.isActive,
        sortOrder,
      });
      if (res.success && res.package) {
        setPackages((prev) =>
          prev.map((p) => (p.id === editingPackage.id ? (res.package as any) : p))
        );
      }
    }

    setIsSaving(false);
    setEditingPackage(null);
    setIsCreating(false);
  };

  const handleToggleActive = async (pkg: PackageType) => {
    await togglePackageActiveAction(pkg.id, pkg.isActive);
    setPackages((prev) =>
      prev.map((p) => (p.id === pkg.id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          ল্যান্ডিং পেজে প্রদর্শিত সক্রিয় মধু প্যাকেজ ও অফারসমূহ
        </p>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন প্যাকেজ যোগ করুন</span>
        </button>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          let parsedFeatures: string[] = [];
          try {
            parsedFeatures = JSON.parse(pkg.features);
          } catch {
            parsedFeatures = [];
          }

          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                pkg.isActive
                  ? pkg.popular
                    ? "border-[#D97706] shadow-lg ring-2 ring-[#FDE68A]"
                    : "border-gray-200 shadow-2xs hover:border-amber-300"
                  : "border-gray-200 opacity-60 bg-gray-50"
              }`}
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      pkg.isActive
                        ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {pkg.isActive ? "অ্যাক্টিভ" : "ড্রাফট / নিষ্ক্রিয়"}
                  </span>

                  {pkg.badgeText && (
                    <span className="text-[10px] font-black bg-[#FEF3C7] text-[#92400E] px-2.5 py-1 rounded-full border border-[#FDE68A]">
                      {pkg.badgeText}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-[#1C1917]">{pkg.name}</h3>
                <p className="text-xs font-bold text-[#D97706]">{pkg.weight}</p>

                {/* Price */}
                <div className="my-4 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#1C1917] font-mono">
                    ৳{toBengaliNumber(pkg.salePrice)}
                  </span>
                  <span className="text-sm text-gray-400 line-through font-mono">
                    ৳{toBengaliNumber(pkg.regularPrice)}
                  </span>
                </div>

                {/* Freebies */}
                <div className="space-y-1.5 mb-4 text-xs font-semibold">
                  {pkg.freeDelivery && (
                    <p className="text-[#059669] flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>ফ্রি ডেলিভারি প্রযোজ্য</span>
                    </p>
                  )}
                  {pkg.freeGiftText && (
                    <p className="text-[#92400E] flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>উপহার: {pkg.freeGiftText}</span>
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-3">
                  {parsedFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#FAFAF9] hover:bg-amber-50 text-[#1C1917] hover:text-[#D97706] py-2.5 px-3 rounded-xl border border-gray-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>এডিট করুন</span>
                </button>

                <button
                  onClick={() => handleToggleActive(pkg)}
                  title={pkg.isActive ? "নিষ্ক্রিয় করুন" : "সক্রিয় করুন"}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                    pkg.isActive
                      ? "text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 border-gray-200"
                      : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
                  }`}
                >
                  {pkg.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Create Modal */}
      {(editingPackage || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-5">
              <h3 className="text-lg font-black text-[#1C1917]">
                {isCreating ? "নতুন প্যাকেজ তৈরি করুন" : "প্যাকেজ এডিট করুন"}
              </h3>
              <button
                onClick={() => {
                  setEditingPackage(null);
                  setIsCreating(false);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    প্যাকেজের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: বেস্ট সেলার প্যাক"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    ওজন / পরিমাণ *
                  </label>
                  <input
                    type="text"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="যেমন: ১ কেজি প্রিমিয়াম জার"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    বিক্রয় মূল্য (Sale Price ৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    রেগুলার মূল্য (Regular Price ৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    ব্যাজ লেখা (Badge Text)
                  </label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="যেমন: মোস্ট পপুলার"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    ফ্রি উপহার লেখা (Free Gift)
                  </label>
                  <input
                    type="text"
                    value={freeGiftText}
                    onChange={(e) => setFreeGiftText(e.target.value)}
                    placeholder="যেমন: ১টি কাঠের চামচ ফ্রি"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-2xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={freeDelivery}
                    onChange={(e) => setFreeDelivery(e.target.checked)}
                    className="w-4 h-4 accent-[#D97706]"
                  />
                  <span className="font-semibold text-xs">ফ্রি ডেলিভারি</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={popular}
                    onChange={(e) => setPopular(e.target.checked)}
                    className="w-4 h-4 accent-[#D97706]"
                  />
                  <span className="font-semibold text-xs">বেস্ট সেলার হাইলাইট</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bestValue}
                    onChange={(e) => setBestValue(e.target.checked)}
                    className="w-4 h-4 accent-[#D97706]"
                  />
                  <span className="font-semibold text-xs">সর্বোচ্চ সাশ্রয়ী</span>
                </label>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  ফিচার ও গুণাবলীর তালিকা (প্রতি লাইনে একটি বুলেট পয়েন্ট)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="১০০% খাঁটি সুন্দরবনের কাঁচা মধু&#10;প्रीमিয়াম ফুড-গ্রেড জার"
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPackage(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl font-bold shadow-md transition-colors cursor-pointer disabled:opacity-75"
                >
                  {isSaving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
