"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, KeyRound } from "lucide-react";
import { loginAction } from "@/actions/authActions";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("from");
  const redirectTo =
    !rawRedirect || rawRedirect === "/admin" || rawRedirect === "/admin/"
      ? "/admin/dashboard"
      : rawRedirect;

  const [email, setEmail] = useState("admin@sundarbannaturals.com");
  const [password, setPassword] = useState("admin123456");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("redirectTo", redirectTo);

    try {
      const result = await loginAction(formData);
      if (result.success && result.redirectTo) {
        router.push(result.redirectTo);
        router.refresh();
      } else {
        setError(result.error || "লগইন ব্যর্থ হয়েছে।");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "একটি অনাকাঙ্ক্ষিত ত্রুটি ঘটেছে।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#065F46] flex items-center justify-center p-4 selection:bg-[#F59E0B] selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D97706]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#059669]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-amber-300/30">
          
          {/* Logo & Title */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center text-3xl mx-auto shadow-lg shadow-[#D97706]/30">
              🍯
            </div>
            
            <div>
              <h1 className="text-2xl font-black text-[#1C1917] tracking-tight font-sans">
                সুন্দরবন <span className="text-[#D97706]">ন্যাচারালস</span>
              </h1>
              <p className="text-xs text-[#78716C] font-semibold mt-1">
                অ্যাডমিন পোর্টাল ও ম্যানেজমেন্ট সিস্টেম
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials Info Box */}
          <div className="mb-6 bg-[#FEF3C7] border border-[#FDE68A] p-3.5 rounded-2xl text-xs text-[#92400E]">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <KeyRound className="w-4 h-4 text-[#D97706]" />
              <span>ডিফল্ট ডেমো অ্যাডমিন তথ্য:</span>
            </div>
            <p className="font-mono">ইমেইল: admin@sundarbannaturals.com</p>
            <p className="font-mono">পাসওয়ার্ড: admin123456</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#44403C] mb-1.5">
                অ্যাডমিন ইমেইল
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sundarbannaturals.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl text-sm text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#D97706] focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#44403C] mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAF9] border border-gray-300 rounded-xl text-sm text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#D97706] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 relative group overflow-hidden bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:from-[#B45309] hover:to-[#D97706] text-white py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D97706]/30 transition-all active:scale-95 cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <span>লগইন হচ্ছে...</span>
              ) : (
                <>
                  <span>অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-[#78716C] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#059669]" />
            <span>সুরক্ষিত ২৫৬-বিট এনক্রিপ্টেড সেশন</span>
          </div>

        </div>

      </div>
    </div>
  );
}
