import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { PrintableInvoiceView } from "@/components/admin/PrintableInvoiceView";

export default async function OrderInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findFirst({
    where: {
      OR: [{ id }, { orderNumber: id }],
    },
    include: {
      package: true,
      customer: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      {/* Top action bar */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6 print:hidden">
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-xl border border-gray-300 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>অর্ডার তালিকায় ফিরুন</span>
        </Link>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl overflow-hidden print:shadow-none print:rounded-none">
        <PrintableInvoiceView order={order} />
      </div>
    </div>
  );
}
