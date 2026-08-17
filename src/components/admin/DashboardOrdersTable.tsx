"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";
import { updateOrderStatusAction } from "@/actions/orderActions";
import { Eye, Printer, Phone, CheckCircle, Clock, Truck, XCircle, AlertCircle } from "lucide-react";
import { OrderDetailsDrawer } from "./OrderDetailsDrawer";
import { InvoiceModal } from "./InvoiceModal";

export const statusColors: Record<string, { bg: string; text: string; label: string; icon: any }> = {
  PENDING: { bg: "bg-amber-100", text: "text-amber-800", label: "পেন্ডিং", icon: Clock },
  CONFIRMED: { bg: "bg-blue-100", text: "text-blue-800", label: "কনফার্মড", icon: CheckCircle },
  PROCESSING: { bg: "bg-purple-100", text: "text-purple-800", label: "প্রসেসিং", icon: AlertCircle },
  SHIPPED: { bg: "bg-indigo-100", text: "text-indigo-800", label: "শিপড", icon: Truck },
  DELIVERED: { bg: "bg-emerald-100", text: "text-emerald-800", label: "ডেলিভার্ড", icon: CheckCircle },
  CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "বাতিল", icon: XCircle },
  RETURNED: { bg: "bg-gray-100", text: "text-gray-800", label: "রিটার্নড", icon: XCircle },
};

interface OrderType {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryArea: string;
  shippingAddress: string;
  notes: string | null;
  packageId: string;
  quantity: number;
  subTotal: number;
  shippingCost: number;
  totalAmount: number;
  status: string;
  createdAt: Date;
  package: {
    name: string;
    weight: string;
    salePrice: number;
    freeGiftText: string | null;
  };
}

interface DashboardOrdersTableProps {
  orders: OrderType[];
}

export const DashboardOrdersTable: React.FC<DashboardOrdersTableProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderType | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoadingId(orderId);
    await updateOrderStatusAction(orderId, newStatus);
    setLoadingId(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAF9] border-b border-gray-200 text-xs font-bold text-gray-600">
              <th className="p-4 pl-6">অর্ডার আইডি</th>
              <th className="p-4">গ্রাহকের নাম ও ফোন</th>
              <th className="p-4">প্যাকেজ</th>
              <th className="p-4">মোট টাকা</th>
              <th className="p-4">তারিখ</th>
              <th className="p-4">স্ট্যাটাস</th>
              <th className="p-4 pr-6 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
            {orders.map((order) => {
              const statusInfo = statusColors[order.status] || statusColors.PENDING;

              return (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Order ID */}
                  <td className="p-4 pl-6 font-mono font-bold text-[#D97706]">
                    {order.orderNumber}
                  </td>

                  {/* Customer Details */}
                  <td className="p-4">
                    <p className="font-bold text-[#1C1917]">{order.customerName}</p>
                    <a
                      href={`tel:${order.phone}`}
                      className="text-xs text-gray-500 font-mono hover:text-[#D97706] flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span>{order.phone}</span>
                    </a>
                  </td>

                  {/* Package */}
                  <td className="p-4">
                    <span className="font-semibold text-gray-800">
                      {order.package.name}
                    </span>
                    <span className="block text-[11px] text-gray-500">
                      {order.package.weight} × {toBengaliNumber(order.quantity)}
                    </span>
                  </td>

                  {/* Total Amount */}
                  <td className="p-4 font-mono font-bold text-gray-900 text-sm">
                    ৳{toBengaliNumber(order.totalAmount)}
                    <span className="block text-[10px] font-normal text-emerald-600">
                      {order.deliveryArea === "inside_dhaka" ? "ঢাকা সিটি" : "ঢাকার বাইরে"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("bn-BD", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-4">
                    <select
                      value={order.status}
                      disabled={loadingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border border-transparent focus:border-gray-300 focus:outline-hidden cursor-pointer ${statusInfo.bg} ${statusInfo.text}`}
                    >
                      <option value="PENDING">পেন্ডিং</option>
                      <option value="CONFIRMED">কনফার্মড</option>
                      <option value="PROCESSING">প্রসেসিং</option>
                      <option value="SHIPPED">শিপড</option>
                      <option value="DELIVERED">ডেলিভার্ড</option>
                      <option value="CANCELLED">বাতিল</option>
                      <option value="RETURNED">রিটার্নড</option>
                    </select>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        title="বিস্তারিত দেখুন"
                        className="p-1.5 text-gray-600 hover:text-[#D97706] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setInvoiceOrder(order)}
                        title="ইনভয়েস প্রিন্ট করুন"
                        className="p-1.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Details Drawer */}
      {selectedOrder && (
        <OrderDetailsDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          onPrintInvoice={() => {
            setInvoiceOrder(selectedOrder);
          }}
        />
      )}

      {/* Invoice Modal */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </>
  );
};
