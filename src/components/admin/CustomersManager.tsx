"use client";

import React, { useState, useMemo } from "react";
import { toBengaliNumber } from "@/lib/utils";
import { Search, Users, Phone, MessageCircle, Star, ShoppingBag, Calendar } from "lucide-react";

interface CustomerType {
  id: string;
  name: string;
  phone: string;
  address: string | null;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date | null;
  createdAt: Date;
  _count?: {
    orders: number;
  };
}

interface CustomersManagerProps {
  initialCustomers: CustomerType[];
}

export const CustomersManager: React.FC<CustomersManagerProps> = ({
  initialCustomers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return initialCustomers;
    return initialCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.address && c.address.toLowerCase().includes(q))
    );
  }, [initialCustomers, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Search Input */}
      <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="গ্রাহকের নাম বা মোবাইল নাম্বার দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF9] border border-gray-300 rounded-xl text-xs sm:text-sm text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#D97706] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFAF9] border-b border-gray-200 text-xs font-bold text-gray-600">
                <th className="p-4 pl-6">গ্রাহকের নাম</th>
                <th className="p-4">মোবাইল নাম্বার</th>
                <th className="p-4">ঠিকানা</th>
                <th className="p-4 text-center">মোট অর্ডার সংখ্যা</th>
                <th className="p-4">মোট কেনাকাটা</th>
                <th className="p-4">সর্বশেষ অর্ডারের তারিখ</th>
                <th className="p-4 pr-6 text-right">যোগাযোগ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500">
                    কোনো গ্রাহকের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const isRepeatBuyer = customer.totalOrders > 1;

                  const whatsappMsg = encodeURIComponent(
                    `আসসালামু আলাইকুম ${customer.name}, সুন্দরবন ন্যাচারালস থেকে আপনাকে শুভেচ্ছা।`
                  );

                  return (
                    <tr key={customer.id} className="hover:bg-amber-50/30 transition-colors">
                      {/* Name & Repeat Buyer Tag */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#1C1917]">{customer.name}</p>
                          {isRepeatBuyer && (
                            <span className="inline-flex items-center gap-1 bg-amber-100 text-[#92400E] text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              রিপিট বায়ার
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="p-4 font-mono font-semibold text-gray-800">
                        {customer.phone}
                      </td>

                      {/* Address */}
                      <td className="p-4 max-w-[220px] truncate text-xs text-gray-600">
                        {customer.address || "ঠিকানা সংরক্ষিত নেই"}
                      </td>

                      {/* Total Orders */}
                      <td className="p-4 text-center font-mono font-black text-gray-900">
                        <span className="bg-gray-100 px-2.5 py-1 rounded-full">
                          {toBengaliNumber(customer.totalOrders)}
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td className="p-4 font-mono font-black text-[#065F46]">
                        ৳{toBengaliNumber(customer.totalSpent)}
                      </td>

                      {/* Last Order Date */}
                      <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                        {customer.lastOrderDate
                          ? new Date(customer.lastOrderDate).toLocaleDateString("bn-BD", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`tel:${customer.phone}`}
                            title="কল দিন"
                            className="p-1.5 text-gray-600 hover:text-[#D97706] hover:bg-amber-50 rounded-lg transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          <a
                            href={`https://wa.me/88${customer.phone.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="হোয়াটসঅ্যাপ"
                            className="p-1.5 text-gray-600 hover:text-[#059669] hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
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

    </div>
  );
};
