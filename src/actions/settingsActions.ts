"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateSettingsAction(data: {
  videoUrl: string;
  helplineNumber: string;
  supportEmail: string;
  stockCounter: string;
  deliveryChargeInsideDhaka: number;
  deliveryChargeOutsideDhaka: number;
  announcementText: string;
}) {
  try {
    const updated = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {
        videoUrl: data.videoUrl,
        helplineNumber: data.helplineNumber,
        supportEmail: data.supportEmail,
        stockCounter: data.stockCounter,
        deliveryChargeInsideDhaka: data.deliveryChargeInsideDhaka,
        deliveryChargeOutsideDhaka: data.deliveryChargeOutsideDhaka,
        announcementText: data.announcementText,
      },
      create: {
        id: "default",
        videoUrl: data.videoUrl,
        helplineNumber: data.helplineNumber,
        supportEmail: data.supportEmail,
        stockCounter: data.stockCounter,
        deliveryChargeInsideDhaka: data.deliveryChargeInsideDhaka,
        deliveryChargeOutsideDhaka: data.deliveryChargeOutsideDhaka,
        announcementText: data.announcementText,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, settings: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
