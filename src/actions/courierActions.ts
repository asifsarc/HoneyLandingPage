"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  buildTrackingUrl,
  bookSteadfastConsignment,
  bookPathaoConsignment,
  CourierProviderKey,
} from "@/lib/courier";

export async function updateOrderCourierAction(data: {
  orderId: string;
  courierProvider: string;
  trackingCode?: string | null;
  consignmentId?: string | null;
  trackingUrl?: string | null;
  courierNotes?: string | null;
  autoGenerateUrl?: boolean;
  updateStatusToShipped?: boolean;
}) {
  try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: data.orderId },
    });

    if (!existingOrder) {
      return { success: false, error: "অর্ডারটি পাওয়া যায়নি।" };
    }

    let finalTrackingUrl = data.trackingUrl?.trim() || null;

    if (data.autoGenerateUrl || !finalTrackingUrl) {
      finalTrackingUrl = buildTrackingUrl(
        data.courierProvider,
        data.trackingCode,
        data.consignmentId,
        data.trackingUrl
      );
    }

    const updatePayload: any = {
      courierProvider: data.courierProvider,
      trackingCode: data.trackingCode?.trim() || null,
      consignmentId: data.consignmentId?.trim() || null,
      trackingUrl: finalTrackingUrl,
      courierNotes: data.courierNotes?.trim() || null,
    };

    if (data.updateStatusToShipped) {
      updatePayload.status = "SHIPPED";
      if (!existingOrder.shippedAt) {
        updatePayload.shippedAt = new Date();
      }
    }

    const updated = await prisma.order.update({
      where: { id: data.orderId },
      data: updatePayload,
      include: { package: true },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/orders");
    revalidatePath(`/order-success/${updated.orderNumber}`);

    return { success: true, order: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function bookCourierApiAction(data: {
  orderId: string;
  provider: "STEADFAST" | "PATHAO";
}) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: data.orderId },
      include: { package: true },
    });

    if (!order) {
      return { success: false, error: "অর্ডারটি পাওয়া যায়নি।" };
    }

    let result;
    if (data.provider === "STEADFAST") {
      result = await bookSteadfastConsignment({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        phone: order.phone,
        shippingAddress: order.shippingAddress,
        totalAmount: order.totalAmount,
        notes: order.notes,
      });
    } else {
      result = await bookPathaoConsignment({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        phone: order.phone,
        shippingAddress: order.shippingAddress,
        totalAmount: order.totalAmount,
        deliveryArea: order.deliveryArea,
      });
    }

    if (result && result.success) {
      const updated = await prisma.order.update({
        where: { id: data.orderId },
        data: {
          courierProvider: result.provider,
          trackingCode: result.trackingCode,
          consignmentId: result.consignmentId,
          trackingUrl: result.trackingUrl,
          status: "SHIPPED",
          shippedAt: new Date(),
        },
        include: { package: true },
      });

      revalidatePath("/admin/dashboard");
      revalidatePath("/admin/orders");
      revalidatePath(`/order-success/${updated.orderNumber}`);

      return { success: true, message: result.message, order: updated };
    }

    return { success: false, error: "কুরিয়ার এপিআই এর সাথে সংযোগ স্থাপন করা যায়নি।" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
