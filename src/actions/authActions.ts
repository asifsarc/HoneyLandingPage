"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionToken, setSessionCookie, clearSessionCookie } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/admin/dashboard";

  if (!email || !password) {
    return { success: false, error: "ইমেইল ও পাসওয়ার্ড প্রদান করুন।" };
  }

  const user = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!user) {
    return { success: false, error: "ভুল ইমেইল বা পাসওয়ার্ড।" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return { success: false, error: "ভুল ইমেইল বা পাসওয়ার্ড।" };
  }

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  await setSessionCookie(token);

  return { success: true, redirectTo };
}

export async function logoutAction() {
  await clearSessionCookie();
  revalidatePath("/admin");
  redirect("/admin/login");
}
