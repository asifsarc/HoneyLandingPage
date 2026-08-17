"use client";

import React, { useState } from "react";
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  X,
  MessageSquareQuote,
  Sparkles,
  MapPin,
  Package,
} from "lucide-react";
import {
  createReviewAction,
  updateReviewAction,
  toggleReviewActiveAction,
  deleteReviewAction,
} from "@/actions/reviewActions";

export interface ReviewType {
  id: string;
  name: string;
  location: string;
  role: string | null;
  rating: number;
  reviewText: string;
  packagePurchased: string | null;
  isVerified: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
}

interface ReviewsManagerProps {
  initialReviews: ReviewType[];
}

export const ReviewsManager: React.FC<ReviewsManagerProps> = ({
  initialReviews,
}) => {
  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews);
  const [editingReview, setEditingReview] = useState<ReviewType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState("");
  const [packagePurchased, setPackagePurchased] = useState("১ কেজি প্রিমিয়াম জার");
  const [isVerified, setIsVerified] = useState(true);
  const [sortOrder, setSortOrder] = useState(1);

  const handleOpenEdit = (rev: ReviewType) => {
    setEditingReview(rev);
    setIsCreating(false);
    setName(rev.name);
    setLocation(rev.location);
    setRole(rev.role || "");
    setRating(rev.rating);
    setReviewText(rev.reviewText);
    setPackagePurchased(rev.packagePurchased || "১ কেজি প্রিমিয়াম জার");
    setIsVerified(rev.isVerified);
    setSortOrder(rev.sortOrder);
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setEditingReview(null);
    setName("");
    setLocation("");
    setRole("");
    setRating(5);
    setReviewText("");
    setPackagePurchased("১ কেজি প্রিমিয়াম জার");
    setIsVerified(true);
    setSortOrder(reviews.length + 1);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (isCreating) {
      const res = await createReviewAction({
        name,
        location,
        role,
        rating,
        reviewText,
        packagePurchased,
        isVerified,
        sortOrder,
      });

      if (res.success && res.review) {
        setReviews((prev) => [...prev, res.review as any]);
      }
    } else if (editingReview) {
      const res = await updateReviewAction(editingReview.id, {
        name,
        location,
        role,
        rating,
        reviewText,
        packagePurchased,
        isVerified,
        isActive: editingReview.isActive,
        sortOrder,
      });

      if (res.success && res.review) {
        setReviews((prev) =>
          prev.map((r) => (r.id === editingReview.id ? (res.review as any) : r))
        );
      }
    }

    setIsSaving(false);
    setEditingReview(null);
    setIsCreating(false);
  };

  const handleToggleActive = async (rev: ReviewType) => {
    await toggleReviewActiveAction(rev.id, rev.isActive);
    setReviews((prev) =>
      prev.map((r) => (r.id === rev.id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই রিভিউটি মুছে ফেলতে চান?")) return;
    setDeletingId(id);
    await deleteReviewAction(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            ল্যান্ডিং পেজে প্রদর্শিত গ্রাহকদের বাস্তব রিভিউ, রেটিং ও প্রশংসাপত্র
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন রিভিউ যুক্ত করুন</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className={`bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
              rev.isActive
                ? "border-gray-200 shadow-2xs hover:shadow-md hover:border-amber-300"
                : "border-gray-200 opacity-60 bg-gray-50"
            }`}
          >
            <div>
              {/* Rating & Verified Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      rev.isActive
                        ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {rev.isActive ? "সক্রিয় (Active)" : "ড্রাফট"}
                  </span>

                  {rev.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#D1FAE5]">
                      <CheckCircle className="w-3 h-3" />
                      ভেরিফাইড
                    </span>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic mb-5">
                &ldquo;{rev.reviewText}&rdquo;
              </p>
            </div>

            <div>
              {/* Reviewer Details */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1C1917]">{rev.name}</h4>
                  <p className="text-xs text-[#78716C]">
                    {rev.role && `${rev.role} • `}
                    <span className="text-[#059669] font-medium">{rev.location}</span>
                  </p>
                </div>

                {rev.packagePurchased && (
                  <span className="text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7] px-2.5 py-1 rounded-xl">
                    {rev.packagePurchased}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleOpenEdit(rev)}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-amber-50 text-gray-700 hover:text-[#D97706] py-1.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>এডিট</span>
                </button>

                <button
                  onClick={() => handleToggleActive(rev)}
                  title={rev.isActive ? "ড্রাফট করুন" : "সক্রিয় করুন"}
                  className={`p-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
                    rev.isActive
                      ? "text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 border-gray-200"
                      : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
                  }`}
                >
                  {rev.isActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleDelete(rev.id)}
                  disabled={deletingId === rev.id}
                  title="মুছে ফেলুন"
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {(editingReview || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-5">
              <h3 className="text-lg font-black text-[#1C1917]">
                {isCreating ? "নতুন গ্রাহক রিভিউ যোগ করুন" : "রিভিউ এডিট করুন"}
              </h3>
              <button
                onClick={() => {
                  setEditingReview(null);
                  setIsCreating(false);
                }}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    গ্রাহকের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোঃ তানভীর আহমেদ"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    এলাকা / শহর *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="যেমন: ধানমন্ডি, ঢাকা"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    পেশা বা পরিচয় (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="যেমন: চিকিৎসক / গৃহিণী"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    ক্রয়কৃত প্যাকেজের নাম
                  </label>
                  <input
                    type="text"
                    value={packagePurchased}
                    onChange={(e) => setPackagePurchased(e.target.value)}
                    placeholder="যেমন: ১ কেজি প্রিমিয়াম জার"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                  />
                </div>
              </div>

              {/* Interactive Star Rating Selector */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  রেটিং নির্বাচন করুন ({rating} স্টার)
                </label>
                <div className="flex items-center gap-2 p-3 bg-amber-50/50 rounded-xl border border-amber-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-900 ml-2">
                    {rating} স্টার রেটিং
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  গ্রাহকের পূর্ণ মন্তব্য / রিভিউ টেক্সট *
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="সুন্দরবন ন্যাচারালসের মধুর সুবাস এবং সামান্য ঝাঁঝালো টেস্ট প্রমাণ করে এটা একদম আনপ্রসেসড খাঁটি মধু..."
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D97706]"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 p-3 bg-gray-50 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                    className="w-4 h-4 accent-[#059669]"
                  />
                  <span className="font-semibold text-xs text-gray-800">
                    ভেরিফাইড পারচেজ ব্যাজ দেখান
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingReview(null);
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
                  {isSaving ? "সংরক্ষণ হচ্ছে..." : "রিভিউ সংরক্ষণ করুন"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
