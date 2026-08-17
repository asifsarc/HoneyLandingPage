"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export interface ReviewFormData {
  name: string;
  location: string;
  role?: string;
  rating: number;
  reviewText: string;
  packagePurchased?: string;
  isVerified?: boolean;
  sortOrder?: number;
}

export async function createReviewAction(data: ReviewFormData) {
  try {
    if (!data.name || !data.reviewText || !data.location) {
      return { success: false, error: "নাম, এলাকা এবং রিভিউ টেক্সট প্রদান করুন।" };
    }

    const review = await prisma.review.create({
      data: {
        name: data.name,
        location: data.location,
        role: data.role || null,
        rating: data.rating || 5,
        reviewText: data.reviewText,
        packagePurchased: data.packagePurchased || "১ কেজি প্রিমিয়াম জার",
        isVerified: data.isVerified ?? true,
        sortOrder: data.sortOrder || 0,
        isActive: true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { success: true, review };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateReviewAction(id: string, data: ReviewFormData & { isActive?: boolean }) {
  try {
    const review = await prisma.review.update({
      where: { id },
      data: {
        name: data.name,
        location: data.location,
        role: data.role || null,
        rating: data.rating || 5,
        reviewText: data.reviewText,
        packagePurchased: data.packagePurchased || null,
        isVerified: data.isVerified ?? true,
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder || 0,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { success: true, review };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleReviewActiveAction(id: string, currentState: boolean) {
  try {
    await prisma.review.update({
      where: { id },
      data: { isActive: !currentState },
    });

    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteReviewAction(id: string) {
  try {
    await prisma.review.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
