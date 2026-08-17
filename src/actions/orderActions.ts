"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { sendMetaCapiEvent } from "@/lib/metaCapi";

const createOrderSchema = z.object({
  name: z.string().min(2, "পুরো নাম লিখুন"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন"),
  address: z.string().min(5, "সম্পূর্ণ ঠিকানা লিখুন"),
  deliveryArea: z.enum(["inside_dhaka", "outside_dhaka"]),
  packageId: z.string().min(1, "প্যাকেজ নির্বাচন করুন"),
  notes: z.string().optional(),
  quantity: z.number().int().min(1).default(1),
  eventId: z.string().optional(),
});

export async function createOrderAction(formData: {
  name: string;
  phone: string;
  address: string;
  deliveryArea: "inside_dhaka" | "outside_dhaka";
  packageId: string;
  notes?: string;
  quantity?: number;
  eventId?: string;
}) {
  try {
    const validated = createOrderSchema.parse(formData);

    // 1. Fetch package and settings from database
    const [pkg, settings] = await Promise.all([
      prisma.package.findFirst({
        where: {
          OR: [{ id: validated.packageId }, { slug: validated.packageId }],
          isActive: true,
        },
      }),
      prisma.siteSettings.findUnique({
        where: { id: "default" },
      }),
    ]);

    if (!pkg) {
      return { success: false, error: "নির্বাচিত প্যাকেজটি পাওয়া যায়নি।" };
    }

    const deliveryChargeInside = settings?.deliveryChargeInsideDhaka ?? 70;
    const deliveryChargeOutside = settings?.deliveryChargeOutsideDhaka ?? 130;

    const quantity = validated.quantity || 1;
    const subTotal = pkg.salePrice * quantity;
    const shippingCost = pkg.freeDelivery
      ? 0
      : validated.deliveryArea === "inside_dhaka"
      ? deliveryChargeInside
      : deliveryChargeOutside;
    const totalAmount = subTotal + shippingCost;

    // 2. Generate unique orderNumber (e.g. SN-10492)
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `SN-${randomDigits}`;

    // 3. Upsert Customer
    const existingCustomer = await prisma.customer.findUnique({
      where: { phone: validated.phone },
    });

    let customerId: string;

    if (existingCustomer) {
      const updatedCustomer = await prisma.customer.update({
        where: { phone: validated.phone },
        data: {
          name: validated.name,
          address: validated.address,
          totalOrders: { increment: 1 },
          totalSpent: { increment: totalAmount },
          lastOrderDate: new Date(),
        },
      });
      customerId = updatedCustomer.id;
    } else {
      const newCustomer = await prisma.customer.create({
        data: {
          name: validated.name,
          phone: validated.phone,
          address: validated.address,
          totalOrders: 1,
          totalSpent: totalAmount,
          lastOrderDate: new Date(),
        },
      });
      customerId = newCustomer.id;
    }

    // 4. Create Order
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: validated.name,
        phone: validated.phone,
        deliveryArea: validated.deliveryArea,
        shippingAddress: validated.address,
        notes: validated.notes || null,
        packageId: pkg.id,
        quantity,
        subTotal,
        shippingCost,
        totalAmount,
        status: "PENDING",
        customerId,
      },
      include: {
        package: true,
      },
    });

    // 5. Server-Side Meta Conversions API (CAPI) Dispatch
    const effectiveEventId = validated.eventId || `EVT-${orderNumber}-${Date.now()}`;
    sendMetaCapiEvent({
      eventName: "Purchase",
      eventId: effectiveEventId,
      userData: {
        phone: validated.phone,
        name: validated.name,
        city: validated.deliveryArea === "inside_dhaka" ? "Dhaka" : "Bangladesh",
      },
      customData: {
        currency: "BDT",
        value: totalAmount,
        order_id: orderNumber,
        content_name: pkg.name,
        content_ids: [pkg.id],
        content_type: "product",
        num_items: quantity,
      },
    }).catch((err) => console.error("Meta CAPI async error:", err));

    // 6. Revalidate cache
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/orders");
    revalidatePath("/admin/customers");

    return {
      success: true,
      orderNumber: newOrder.orderNumber,
      orderId: newOrder.id,
      customerName: newOrder.customerName,
      phone: newOrder.phone,
      address: newOrder.shippingAddress,
      deliveryArea: newOrder.deliveryArea,
      packageName: pkg.name,
      packageWeight: pkg.weight,
      freeGiftText: pkg.freeGiftText,
      subTotal: newOrder.subTotal,
      shippingCost: newOrder.shippingCost,
      totalAmount: newOrder.totalAmount,
      status: newOrder.status,
      createdAt: newOrder.createdAt.toISOString(),
      eventId: effectiveEventId,
    };
  } catch (error: any) {
    console.error("Order creation error:", error);
    return {
      success: false,
      error: error.message || "অর্ডার প্রক্রিয়াকরণে ত্রুটি হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
    };
  }
}

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
  try {
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      include: { package: true },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/orders");
    return { success: true, order: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function bulkUpdateOrdersAction(orderIds: string[], newStatus: string) {
  try {
    await prisma.order.updateMany({
      where: { id: { in: orderIds } },
      data: { status: newStatus },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteOrderAction(orderId: string) {
  try {
    await prisma.order.delete({
      where: { id: orderId },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
