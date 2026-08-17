"use client";

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    ttq?: {
      track: (event: string, data?: any) => void;
      page: () => void;
    };
    gtag?: (...args: any[]) => void;
  }
}

export interface TrackingProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  weight?: string;
}

export interface TrackingOrder {
  orderNumber: string;
  totalAmount: number;
  subTotal?: number;
  shippingCost?: number;
  items: TrackingProduct[];
  eventId?: string;
  customerName?: string;
  phone?: string;
}

// 1. PageView Tracking
export function trackPageView(pageUrl?: string) {
  if (typeof window === "undefined") return;

  const url = pageUrl || window.location.pathname;

  // GTM DataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_location: window.location.href,
    page_path: url,
    page_title: document.title,
  });

  // Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }

  // TikTok Pixel
  if (window.ttq && typeof window.ttq.page === "function") {
    window.ttq.page();
  }
}

// 2. ViewContent / View Item Event
export function trackViewContent(product: TrackingProduct) {
  if (typeof window === "undefined") return;

  // GTM DataLayer (GA4 standard view_item)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    ecommerce: {
      currency: "BDT",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: "Sundarban Honey",
          quantity: product.quantity || 1,
        },
      ],
    },
  });

  // Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("track", "ViewContent", {
      content_name: product.name,
      content_ids: [product.id],
      content_type: "product",
      value: product.price,
      currency: "BDT",
    });
  }

  // TikTok Pixel
  if (window.ttq && typeof window.ttq.track === "function") {
    window.ttq.track("ViewContent", {
      content_id: product.id,
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "BDT",
    });
  }
}

// 3. InitiateCheckout / Begin Checkout Event
export function trackInitiateCheckout(product: TrackingProduct, eventId?: string) {
  if (typeof window === "undefined") return;

  // GTM DataLayer (GA4 standard begin_checkout)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "begin_checkout",
    ecommerce: {
      currency: "BDT",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          item_category: "Sundarban Honey",
          quantity: product.quantity || 1,
        },
      ],
    },
  });

  // Meta Pixel (with eventID for deduplication)
  if (typeof window.fbq === "function") {
    window.fbq(
      "track",
      "InitiateCheckout",
      {
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        value: product.price,
        currency: "BDT",
        num_items: product.quantity || 1,
      },
      eventId ? { eventID: eventId } : undefined
    );
  }

  // TikTok Pixel
  if (window.ttq && typeof window.ttq.track === "function") {
    window.ttq.track("InitiateCheckout", {
      content_id: product.id,
      content_name: product.name,
      value: product.price,
      currency: "BDT",
      quantity: product.quantity || 1,
    });
  }
}

// 4. Purchase Event (Client-Side)
export function trackClientPurchase(order: TrackingOrder) {
  if (typeof window === "undefined") return;

  // GTM DataLayer (GA4 standard purchase)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "purchase",
    ecommerce: {
      transaction_id: order.orderNumber,
      value: order.totalAmount,
      currency: "BDT",
      shipping: order.shippingCost || 0,
      items: order.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
    },
  });

  // Meta Pixel Purchase Event (with eventID for CAPI deduplication)
  if (typeof window.fbq === "function") {
    window.fbq(
      "track",
      "Purchase",
      {
        content_name: order.items[0]?.name || "সুন্দরবন খাঁটি মধু",
        content_ids: order.items.map((i) => i.id),
        content_type: "product",
        value: order.totalAmount,
        currency: "BDT",
        num_items: order.items.reduce((acc, curr) => acc + (curr.quantity || 1), 0),
        order_id: order.orderNumber,
      },
      order.eventId ? { eventID: order.eventId } : undefined
    );
  }

  // TikTok Pixel
  if (window.ttq && typeof window.ttq.track === "function") {
    window.ttq.track("CompletePayment", {
      content_id: order.items[0]?.id || "sundarban-honey",
      content_name: order.items[0]?.name || "সুন্দরবন খাঁটি মধু",
      value: order.totalAmount,
      currency: "BDT",
      quantity: 1,
    });
  }
}

// 5. Contact Event (WhatsApp / Helpline Phone)
export function trackContactClick(channel: "WhatsApp" | "Helpline Phone") {
  if (typeof window === "undefined") return;

  // GTM DataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "contact",
    contact_channel: channel,
  });

  // Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact", {
      content_name: channel,
    });
  }

  // TikTok Pixel
  if (window.ttq && typeof window.ttq.track === "function") {
    window.ttq.track("Contact", {
      content_name: channel,
    });
  }
}
