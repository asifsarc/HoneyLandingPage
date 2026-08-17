"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sendMetaCapiEvent } from "@/lib/metaCapi";

export interface MarketingSettingsFormData {
  gtmContainerId?: string | null;
  ga4MeasurementId?: string | null;
  fbPixelId?: string | null;
  metaCapiAccessToken?: string | null;
  metaTestEventCode?: string | null;
  tiktokPixelId?: string | null;
  customHeadScripts?: string | null;
  customBodyStartScripts?: string | null;
  customBodyEndScripts?: string | null;
}

export async function getMarketingSettingsAction() {
  try {
    const settings = await prisma.marketingSettings.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
      },
    });
    return { success: true, settings };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMarketingSettingsAction(data: MarketingSettingsFormData) {
  try {
    const updated = await prisma.marketingSettings.upsert({
      where: { id: "default" },
      update: {
        gtmContainerId: data.gtmContainerId?.trim() || null,
        ga4MeasurementId: data.ga4MeasurementId?.trim() || null,
        fbPixelId: data.fbPixelId?.trim() || null,
        metaCapiAccessToken: data.metaCapiAccessToken?.trim() || null,
        metaTestEventCode: data.metaTestEventCode?.trim() || null,
        tiktokPixelId: data.tiktokPixelId?.trim() || null,
        customHeadScripts: data.customHeadScripts?.trim() || null,
        customBodyStartScripts: data.customBodyStartScripts?.trim() || null,
        customBodyEndScripts: data.customBodyEndScripts?.trim() || null,
      },
      create: {
        id: "default",
        gtmContainerId: data.gtmContainerId?.trim() || null,
        ga4MeasurementId: data.ga4MeasurementId?.trim() || null,
        fbPixelId: data.fbPixelId?.trim() || null,
        metaCapiAccessToken: data.metaCapiAccessToken?.trim() || null,
        metaTestEventCode: data.metaTestEventCode?.trim() || null,
        tiktokPixelId: data.tiktokPixelId?.trim() || null,
        customHeadScripts: data.customHeadScripts?.trim() || null,
        customBodyStartScripts: data.customBodyStartScripts?.trim() || null,
        customBodyEndScripts: data.customBodyEndScripts?.trim() || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/marketing");

    return { success: true, settings: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function testMetaCapiAction() {
  try {
    const testEventId = `TEST-${Date.now()}`;
    const res = await sendMetaCapiEvent({
      eventName: "Purchase",
      eventId: testEventId,
      userData: {
        phone: "01712345678",
        email: "test@sundarbannaturals.com",
        name: "টেস্ট কাস্টমার",
        city: "Dhaka",
        clientIpAddress: "103.205.180.1",
        clientUserAgent: "Mozilla/5.0 (Sundarban Naturals Test Agent)",
      },
      customData: {
        currency: "BDT",
        value: 1200,
        order_id: "SN-TEST-101",
        content_name: "১ কেজি প্রিমিয়াম জার (টেস্ট ইভেন্ট)",
        content_type: "product",
        num_items: 1,
      },
    });

    return res;
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
