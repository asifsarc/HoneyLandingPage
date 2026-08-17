import crypto from "crypto";
import { prisma } from "./prisma";

function hashSha256(val: string | null | undefined): string | null {
  if (!val) return null;
  const clean = val.trim().toLowerCase();
  if (!clean) return null;
  return crypto.createHash("sha256").update(clean).digest("hex");
}

function normalizeBdPhone(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("01")) {
    cleaned = "88" + cleaned;
  }
  return cleaned;
}

export interface MetaCapiEventPayload {
  eventName: "Purchase" | "InitiateCheckout" | "ViewContent" | "Contact" | "Lead";
  eventId: string; // Used for client-server deduplication
  eventTime?: number;
  eventSourceUrl?: string;
  userData: {
    phone?: string;
    email?: string;
    name?: string;
    city?: string;
    clientIpAddress?: string | null;
    clientUserAgent?: string | null;
    fbp?: string | null;
    fbc?: string | null;
  };
  customData?: {
    currency: string;
    value: number;
    order_id?: string;
    content_name?: string;
    content_ids?: string[];
    content_type?: string;
    num_items?: number;
  };
}

export async function sendMetaCapiEvent(payload: MetaCapiEventPayload) {
  try {
    const settings = await prisma.marketingSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings || !settings.fbPixelId || !settings.metaCapiAccessToken) {
      // Pixel or CAPI Token not configured
      return { success: false, reason: "Meta Pixel or CAPI token not configured." };
    }

    const pixelId = settings.fbPixelId.trim();
    const accessToken = settings.metaCapiAccessToken.trim();
    const testEventCode = settings.metaTestEventCode?.trim() || undefined;

    // Hash user data
    const userPhoneNormalized = payload.userData.phone
      ? normalizeBdPhone(payload.userData.phone)
      : null;

    const userDataPayload: any = {};
    if (userPhoneNormalized) {
      userDataPayload.ph = [hashSha256(userPhoneNormalized)];
    }
    if (payload.userData.email) {
      userDataPayload.em = [hashSha256(payload.userData.email)];
    }
    if (payload.userData.name) {
      userDataPayload.fn = [hashSha256(payload.userData.name)];
    }
    if (payload.userData.city) {
      userDataPayload.ct = [hashSha256(payload.userData.city)];
    }
    userDataPayload.country = [hashSha256("bd")];

    if (payload.userData.clientIpAddress) {
      userDataPayload.client_ip_address = payload.userData.clientIpAddress;
    }
    if (payload.userData.clientUserAgent) {
      userDataPayload.client_user_agent = payload.userData.clientUserAgent;
    }
    if (payload.userData.fbp) {
      userDataPayload.fbp = payload.userData.fbp;
    }
    if (payload.userData.fbc) {
      userDataPayload.fbc = payload.userData.fbc;
    }

    const eventData = {
      event_name: payload.eventName,
      event_time: payload.eventTime || Math.floor(Date.now() / 1000),
      event_id: payload.eventId,
      event_source_url: payload.eventSourceUrl || "https://sundarbannaturals.com",
      action_source: "website",
      user_data: userDataPayload,
      custom_data: payload.customData,
    };

    const requestBody: any = {
      data: [eventData],
    };

    if (testEventCode) {
      requestBody.test_event_code = testEventCode;
    }

    const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("❌ Meta Conversions API Error:", result);
      return { success: false, error: result };
    }

    console.log("✅ Meta CAPI event dispatched successfully:", payload.eventName, payload.eventId);
    return { success: true, result };
  } catch (error: any) {
    console.error("❌ Meta CAPI Dispatch Exception:", error.message);
    return { success: false, error: error.message };
  }
}
