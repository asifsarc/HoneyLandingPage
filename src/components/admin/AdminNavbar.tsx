"use client";

import React from "react";
import Link from "next/link";
import { Bell, ExternalLink, User, ShoppingBag } from "lucide-react";
import { SessionPayload } from "@/lib/auth";

interface AdminNavbarProps {
  admin: SessionPayload;
  pendingCount?: number;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  admin,
  pendingCount = 0,
}) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-4">
        <h2 className="text-base sm:text-lg font-bold text-[#1C1917]">
          অ্যাডমিন কন্ট্রোল প্যানেল
        </h2>
        
        {pendingCount > 0 && (
          <Link
            href="/admin/orders?status=PENDING"
            className="hidden sm:inline-flex items-center gap-1.5 bg-amber-50 text-[#D97706] text-xs font-bold px-3 py-1 rounded-full border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>{pendingCount} টি নতুন অর্ডার অপেক্ষমাণ</span>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#065F46] bg-[#ECFDF5] px-3 py-1.5 rounded-xl border border-[#A7F3D0] hover:bg-[#D1FAE5] transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>ওয়েবসাইট দেখুন</span>
        </Link>

        {/* User Badge */}
        <div className="flex items-center gap-2.5 bg-gray-100/80 px-3 py-1.5 rounded-xl border border-gray-200">
          <div className="w-7 h-7 rounded-lg bg-[#D97706] text-white flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-gray-900 leading-none">{admin.name}</p>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{admin.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
