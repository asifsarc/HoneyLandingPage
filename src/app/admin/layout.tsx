import React from "react";
import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminNavbar } from "@/components/admin/AdminNavbar";

export const metadata = {
  title: "অ্যাডমিন ড্যাশবোর্ড | সুন্দরবন ন্যাচারালস",
  description: "Sundarban Naturals Admin Management Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  // If no admin session (or on login page handled by middleware), render just children
  if (!admin) {
    return <div className="min-h-screen bg-[#1C1917]">{children}</div>;
  }

  // Fetch pending orders count for notification badge
  const pendingOrdersCount = await prisma.order.count({
    where: { status: "PENDING" },
  });

  return (
    <div className="flex min-h-screen bg-[#F5F5F4] text-[#1C1917]">
      {/* Sidebar */}
      <AdminSidebar pendingOrdersCount={pendingOrdersCount} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <AdminNavbar admin={admin} pendingCount={pendingOrdersCount} />
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
