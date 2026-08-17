"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Printer,
  ChevronDown,
  Phone,
  MessageCircle,
  Truck,
  Package,
  Calendar,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { toBengaliNumber } from "@/lib/utils";
import { statusColors } from "./DashboardOrdersTable";
import { OrderDetailsDrawer } from "./OrderDetailsDrawer";
import { InvoiceModal } from "./InvoiceModal";
import {
  updateOrderStatusAction,
  bulkUpdateOrdersAction,
  deleteOrderAction,
} from "@/actions/orderActions";
import { COURIER_PROVIDERS, CourierProviderKey } from "@/lib/courier";

interface OrdersManagerProps {
  initialOrders: any[];
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({
  initialOrders,
}) => {
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [courierFilter, setCourierFilter] = useState("ALL");
  const [areaFilter, setAreaFilter] = useState("ALL");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [activeDrawerOrder, setActiveDrawerOrder] = useState<any | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<any | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Status Tabs
  const statusTabs = [
    { key: "ALL", label: "সকল অর্ডার", count: orders.length },
    {
      key: "PENDING",
      label: "পেন্ডিং",
      count: orders.filter((o) => o.status === "PENDING").length,
    },
    {
      key: "CONFIRMED",
      label: "কনফার্মড",
      count: orders.filter((o) => o.status === "CONFIRMED").length,
    },
    {
      key: "PROCESSING",
      label: "প্রসেসিং",
      count: orders.filter((o) => o.status === "PROCESSING").length,
    },
    {
      key: "SHIPPED",
      label: "শিপড",
      count: orders.filter((o) => o.status === "SHIPPED").length,
    },
    {
      key: "DELIVERED",
      label: "ডেলিভার্ড",
      count: orders.filter((o) => o.status === "DELIVERED").length,
    },
    {
      key: "CANCELLED",
      label: "বাতিল",
      count: orders.filter((o) => o.status === "CANCELLED").length,
    },
  ];

  // Filtering Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.trackingCode && order.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    const matchesCourier =
      courierFilter === "ALL" || order.courierProvider === courierFilter;

    const matchesArea =
      areaFilter === "ALL" || order.deliveryArea === areaFilter;

    return matchesSearch && matchesStatus && matchesCourier && matchesArea;
  });

  // Single Order Status Change
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (activeDrawerOrder && activeDrawerOrder.id === orderId) {
      setActiveDrawerOrder((prev: any) => ({ ...prev, status: newStatus }));
    }
    await updateOrderStatusAction(orderId, newStatus);
  };

  // Bulk Status Update
  const handleBulkStatusChange = async (newStatus: string) => {
    if (selectedOrderIds.length === 0) return;
    setOrders((prev) =>
      prev.map((o) =>
        selectedOrderIds.includes(o.id) ? { ...o, status: newStatus } : o
      )
    );
    await bulkUpdateOrdersAction(selectedOrderIds, newStatus);
    setSelectedOrderIds([]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyTracking = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
              statusFilter === tab.key
                ? "bg-[#D97706] text-white shadow-md shadow-[#D97706]/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                statusFilter === tab.key
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {toBengaliNumber(tab.count)}
            </span>
          </button>
        ))}
      </div>

      {/* Search and Secondary Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন, অর্ডার আইডি বা ট্র্যাকিং কোড..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF9] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
          {/* Courier Provider Filter */}
          <select
            value={courierFilter}
            onChange={(e) => setCourierFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#FAFAF9] border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
          >
            <option value="ALL">সকল কুরিয়ার (All Couriers)</option>
            {Object.values(COURIER_PROVIDERS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Area Filter */}
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#FAFAF9] border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-[#D97706]"
          >
            <option value="ALL">সকল এলাকা</option>
            <option value="inside_dhaka">ঢাকা সিটির ভেতরে</option>
            <option value="outside_dhaka">ঢাকা সিটির বাইরে</option>
          </select>

          {/* Bulk Status Update Action */}
          {selectedOrderIds.length > 0 && (
            <div className="flex items-center gap-2 bg-amber-50 p-1.5 rounded-xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900 px-2">
                {selectedOrderIds.length}টি নির্বাচিত:
              </span>
              <select
                onChange={(e) => {
                  if (e.target.value) handleBulkStatusChange(e.target.value);
                }}
                defaultValue=""
                className="px-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-bold text-[#D97706] focus:outline-hidden"
              >
                <option value="" disabled>
                  স্ট্যাটাস পরিবর্তন...
                </option>
                <option value="CONFIRMED">কনফার্মড করুন</option>
                <option value="PROCESSING">প্রসেসিং করুন</option>
                <option value="SHIPPED">শিপড করুন</option>
                <option value="DELIVERED">ডেলিভার্ড করুন</option>
                <option value="CANCELLED">বাতিল করুন</option>
              </select>
            </div>
          )}
        </div>

      </div>

      {/* Orders Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAFAF9] border-b border-gray-200 text-[#78716C] font-bold">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      filteredOrders.length > 0 &&
                      selectedOrderIds.length === filteredOrders.length
                    }
                    className="w-4 h-4 accent-[#D97706]"
                  />
                </th>
                <th className="p-4">অর্ডার আইডি</th>
                <th className="p-4">গ্রাহকের বিবরণ</th>
                <th className="p-4">প্যাকেজ</th>
                <th className="p-4">মোট টাকা</th>
                <th className="p-4">কুরিয়ার ও ট্র্যাকিং</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-gray-500">
                    কোনো অর্ডার পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const statusInfo =
                    statusColors[order.status] || statusColors.PENDING;
                  const isSelected = selectedOrderIds.includes(order.id);
                  const courier =
                    COURIER_PROVIDERS[order.courierProvider as CourierProviderKey] ||
                    COURIER_PROVIDERS.STEADFAST;

                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-amber-50/40 transition-colors ${
                        isSelected ? "bg-amber-50/60" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(order.id)}
                          className="w-4 h-4 accent-[#D97706]"
                        />
                      </td>

                      {/* Order Number & Date */}
                      <td className="p-4">
                        <button
                          onClick={() => setActiveDrawerOrder(order)}
                          className="font-mono font-bold text-[#D97706] hover:underline cursor-pointer text-left block"
                        >
                          {order.orderNumber}
                        </button>
                        <span className="text-[11px] text-gray-400 block mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString("bn-BD")}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="p-4">
                        <div className="font-bold text-[#1C1917]">
                          {order.customerName}
                        </div>
                        <div className="text-gray-500 font-mono text-xs">
                          {order.phone}
                        </div>
                        <div className="text-[11px] text-gray-400 max-w-[180px] truncate mt-0.5">
                          {order.shippingAddress}
                        </div>
                      </td>

                      {/* Package */}
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">
                          {order.package.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.package.weight} × {toBengaliNumber(order.quantity)}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="p-4">
                        <span className="font-mono font-bold text-gray-900">
                          ৳{toBengaliNumber(order.totalAmount)}
                        </span>
                        <span className="block text-[11px] text-emerald-600 font-medium">
                          ক্যাশ অন ডেলিভারি
                        </span>
                      </td>

                      {/* Courier & Tracking Code */}
                      <td className="p-4">
                        <span
                          className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md border ${courier.badgeColor} ${courier.textColor} ${courier.borderColor}`}
                        >
                          {courier.name}
                        </span>

                        {order.trackingCode ? (
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="font-mono text-xs font-bold text-gray-800">
                              {order.trackingCode}
                            </span>
                            <button
                              onClick={() => handleCopyTracking(order.id, order.trackingCode)}
                              title="ট্র্যাকিং কোড কপি করুন"
                              className="text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                            >
                              {copiedCodeId === order.id ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                            {order.trackingUrl && (
                              <a
                                href={order.trackingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="লাইভ ট্র্যাকিং দেখুন"
                                className="text-[#D97706] hover:text-[#B45309] p-0.5"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => setActiveDrawerOrder(order)}
                            className="block text-[11px] text-amber-700 font-semibold hover:underline mt-0.5 cursor-pointer"
                          >
                            + ট্র্যাকিং সেট করুন
                          </button>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border-0 cursor-pointer focus:outline-hidden ${statusInfo.bg} ${statusInfo.text}`}
                        >
                          <option value="PENDING">পেন্ডিং</option>
                          <option value="CONFIRMED">কনফার্মড</option>
                          <option value="PROCESSING">প্রসেসিং</option>
                          <option value="SHIPPED">শিপড</option>
                          <option value="DELIVERED">ডেলিভার্ড</option>
                          <option value="CANCELLED">বাতিল</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveDrawerOrder(order)}
                            title="অর্ডার ও ট্র্যাকিং বিস্তারিত"
                            className="p-1.5 text-gray-500 hover:text-[#D97706] hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setInvoiceOrder(order)}
                            title="ইনভয়েস প্রিন্ট করুন"
                            className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Slide-Over Drawer */}
      {activeDrawerOrder && (
        <OrderDetailsDrawer
          order={activeDrawerOrder}
          onClose={() => setActiveDrawerOrder(null)}
          onStatusChange={handleStatusChange}
          onPrintInvoice={() => {
            setInvoiceOrder(activeDrawerOrder);
          }}
        />
      )}

      {/* Printable Invoice Modal */}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}

    </div>
  );
};
