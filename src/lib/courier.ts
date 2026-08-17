export type CourierProviderKey =
  | "STEADFAST"
  | "PATHAO"
  | "REDX"
  | "PAPERFLY"
  | "SUNDARBAN_COURIER"
  | "SA_PARIBAHAN"
  | "MANUAL_OTHER";

export interface CourierInfo {
  id: CourierProviderKey;
  name: string;
  nameEn: string;
  badgeColor: string;
  textColor: string;
  borderColor: string;
  hasApi: boolean;
  trackingUrlTemplate: (code: string) => string;
}

export const COURIER_PROVIDERS: Record<CourierProviderKey, CourierInfo> = {
  STEADFAST: {
    id: "STEADFAST",
    name: "স্টেডফাস্ট কুরিয়ার",
    nameEn: "Steadfast Courier",
    badgeColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    hasApi: true,
    trackingUrlTemplate: (code: string) => `https://steadfast.com.bd/t/${encodeURIComponent(code)}`,
  },
  PATHAO: {
    id: "PATHAO",
    name: "পাঠাও কুরিয়ার",
    nameEn: "Pathao Courier",
    badgeColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    hasApi: true,
    trackingUrlTemplate: (code: string) =>
      `https://merchant.pathao.com/tracking?consignment_id=${encodeURIComponent(code)}`,
  },
  REDX: {
    id: "REDX",
    name: "রেডএক্স ডেলিভারি",
    nameEn: "RedX Delivery",
    badgeColor: "bg-rose-50",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
    hasApi: false,
    trackingUrlTemplate: (code: string) => `https://redx.com.bd/track?trackingId=${encodeURIComponent(code)}`,
  },
  PAPERFLY: {
    id: "PAPERFLY",
    name: "পেপারফ্লাই",
    nameEn: "Paperfly",
    badgeColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    hasApi: false,
    trackingUrlTemplate: (code: string) =>
      `https://paperfly.com.bd/tracking.php?tracking_id=${encodeURIComponent(code)}`,
  },
  SUNDARBAN_COURIER: {
    id: "SUNDARBAN_COURIER",
    name: "সুন্দরবন কুরিয়ার সার্ভিস",
    nameEn: "Sundarban Courier",
    badgeColor: "bg-emerald-50",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-200",
    hasApi: false,
    trackingUrlTemplate: () => `https://sundarbancourierltd.com/track`,
  },
  SA_PARIBAHAN: {
    id: "SA_PARIBAHAN",
    name: "এস এ পরিবহন",
    nameEn: "SA Paribahan",
    badgeColor: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-200",
    hasApi: false,
    trackingUrlTemplate: () => `https://saparibahan.com/tracking`,
  },
  MANUAL_OTHER: {
    id: "MANUAL_OTHER",
    name: "অন্যান্য / কাস্টম ডেলিভারি",
    nameEn: "Manual / Custom",
    badgeColor: "bg-gray-50",
    textColor: "text-gray-700",
    borderColor: "border-gray-200",
    hasApi: false,
    trackingUrlTemplate: (code: string) => code,
  },
};

export function buildTrackingUrl(
  providerKey: string,
  trackingCode?: string | null,
  consignmentId?: string | null,
  customUrl?: string | null
): string | null {
  if (customUrl && customUrl.trim().startsWith("http")) {
    return customUrl.trim();
  }

  const key = (providerKey as CourierProviderKey) || "STEADFAST";
  const courier = COURIER_PROVIDERS[key] || COURIER_PROVIDERS.STEADFAST;
  const effectiveCode = trackingCode?.trim() || consignmentId?.trim();

  if (!effectiveCode) {
    return null;
  }

  return courier.trackingUrlTemplate(effectiveCode);
}

// Mock API / Instant Shipment Booking for Steadfast Courier
export async function bookSteadfastConsignment(order: {
  orderNumber: string;
  customerName: string;
  phone: string;
  shippingAddress: string;
  totalAmount: number;
  notes?: string | null;
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const trackingCode = `ST-${randomNum}`;
  const consignmentId = `SFC-${Math.floor(1000000 + Math.random() * 9000000)}`;
  const trackingUrl = `https://steadfast.com.bd/t/${trackingCode}`;

  return {
    success: true,
    provider: "STEADFAST" as CourierProviderKey,
    trackingCode,
    consignmentId,
    trackingUrl,
    message: `স্টেডফাস্টে পার্সেল সফলভাবে বুক করা হয়েছে! ট্র্যাকিং কোড: ${trackingCode}`,
  };
}

// Mock API / Instant Shipment Booking for Pathao Courier
export async function bookPathaoConsignment(order: {
  orderNumber: string;
  customerName: string;
  phone: string;
  shippingAddress: string;
  totalAmount: number;
  deliveryArea: string;
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const randomId = Math.floor(10000000 + Math.random() * 90000000);
  const consignmentId = `PTH-${randomId}`;
  const trackingCode = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
  const trackingUrl = `https://merchant.pathao.com/tracking?consignment_id=${consignmentId}`;

  return {
    success: true,
    provider: "PATHAO" as CourierProviderKey,
    trackingCode,
    consignmentId,
    trackingUrl,
    message: `পাঠাও কুরিয়ারে পার্সেল সফলভাবে তৈরি হয়েছে! কনসাইনমেন্ট আইডি: ${consignmentId}`,
  };
}
