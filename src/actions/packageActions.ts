"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updatePackageAction(id: string, data: {
  name: string;
  weight: string;
  regularPrice: number;
  salePrice: number;
  badgeText?: string;
  freeGiftText?: string;
  freeDelivery: boolean;
  freeGift: boolean;
  popular: boolean;
  bestValue: boolean;
  features: string[];
  isActive: boolean;
  sortOrder: number;
}) {
  try {
    const updated = await prisma.package.update({
      where: { id },
      data: {
        name: data.name,
        weight: data.weight,
        regularPrice: data.regularPrice,
        salePrice: data.salePrice,
        badgeText: data.badgeText || null,
        freeGiftText: data.freeGiftText || null,
        freeDelivery: data.freeDelivery,
        freeGift: data.freeGift,
        popular: data.popular,
        bestValue: data.bestValue,
        features: JSON.stringify(data.features),
        isActive: data.isActive,
        sortOrder: data.sortOrder,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/packages");
    return { success: true, package: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createPackageAction(data: {
  slug: string;
  name: string;
  weight: string;
  regularPrice: number;
  salePrice: number;
  badgeText?: string;
  freeGiftText?: string;
  freeDelivery: boolean;
  freeGift: boolean;
  popular: boolean;
  bestValue: boolean;
  features: string[];
  sortOrder: number;
}) {
  try {
    const created = await prisma.package.create({
      data: {
        slug: data.slug.toLowerCase().trim().replace(/\s+/g, "-"),
        name: data.name,
        weight: data.weight,
        regularPrice: data.regularPrice,
        salePrice: data.salePrice,
        badgeText: data.badgeText || null,
        freeGiftText: data.freeGiftText || null,
        freeDelivery: data.freeDelivery,
        freeGift: data.freeGift,
        popular: data.popular,
        bestValue: data.bestValue,
        features: JSON.stringify(data.features),
        sortOrder: data.sortOrder,
        isActive: true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/packages");
    return { success: true, package: created };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function togglePackageActiveAction(id: string, currentState: boolean) {
  try {
    await prisma.package.update({
      where: { id },
      data: { isActive: !currentState },
    });

    revalidatePath("/");
    revalidatePath("/admin/packages");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
