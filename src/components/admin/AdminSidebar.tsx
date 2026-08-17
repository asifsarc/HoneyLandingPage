"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  MessageSquareQuote,
  Target,
  Settings,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Sparkles,
} from "lucide-react";
import { logoutAction } from "@/actions/authActions";

interface AdminSidebarProps {
  pendingOrdersCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  pendingOrdersCount = 0,
}) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "ড্যাশবোর্ড",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "অর্ডারসমূহ",
      href: "/admin/orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
    },
    {
      name: "প্যাকেজ ও প্রাইসিং",
      href: "/admin/packages",
      icon: <Package className="w-5 h-5" />,
    },
    {
      name: "গ্রাহক রিভিউ",
      href: "/admin/reviews",
      icon: <MessageSquareQuote className="w-5 h-5" />,
    },
    {
      name: "গ্রাহক তালিকা",
      href: "/admin/customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "মার্কেটিং ও পিক্সেল",
      href: "/admin/marketing",
      icon: <Target className="w-5 h-5" />,
    },
    {
      name: "পেজ সেটিংস ও ভিডিও",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-[#1C1917] text-white flex flex-col justify-between shrink-0 border-r border-gray-800 min-h-screen">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-gray-800">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-[#D97706]/30">
              🍯
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white font-sans block">
                সুন্দরবন <span className="text-[#F59E0B]">অ্যাডমিন</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40 inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                সিস্টেম অ্যাক্টিভ
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#D97706] text-white shadow-lg shadow-[#D97706]/20 font-bold"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="bg-red-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Live Store Link & Logout */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/40 transition-all"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>লাইভ ল্যান্ডিং পেজ</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>
        </form>
      </div>
    </aside>
  );
};
