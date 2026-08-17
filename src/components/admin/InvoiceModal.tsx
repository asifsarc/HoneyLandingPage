"use client";

import React, { useRef } from "react";
import { X, Printer } from "lucide-react";
import { PrintableInvoiceView } from "./PrintableInvoiceView";

interface InvoiceModalProps {
  order: any;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      {/* Top Floating Controls (Hidden during print) */}
      <div className="fixed top-4 right-4 z-60 flex items-center gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>প্রিন্ট করুন (Print Invoice)</span>
        </button>

        <button
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="p-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-xl font-bold shadow-xl transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Printable Invoice Container */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl my-8 overflow-hidden print:shadow-none print:m-0 print:rounded-none">
        <PrintableInvoiceView order={order} />
      </div>
    </div>
  );
};
