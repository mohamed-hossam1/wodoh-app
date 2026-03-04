"use server";

import { db } from "@/db";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { handleAction } from "@/lib/action-handler";
import { AppError } from "@/lib/error";
import { createClient } from "@/lib/supabase/server";
import z from "zod";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "@/lib/validations";
import { zodValidate } from "@/lib/zod-validate";

export async function register(formData: z.infer<typeof RegisterSchema>) {
  return handleAction(async () => {
    const user = zodValidate(RegisterSchema, formData);
    const name = user.name as string;
    const email = user.email as string;
    const password = user.password as string;
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw new AppError(error.message);
    if (!data.user) throw new AppError("Try again");
    const [org] = await db
      .insert(organizations)
      .values({
        userId: data.user.id,
        name: name,
        plan: "free",
      })
      .returning();

    const cookieStore = await cookies();
    cookieStore.set("org_id", org.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return data.user.id;
  });
}

export async function login(formData: z.infer<typeof LoginSchema>) {
  return handleAction(async () => {
    const validated = zodValidate(LoginSchema, formData);
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    });

    if (error) throw new AppError(error.message);
    if (!data.user) throw new AppError("Try again");

    const org = await db.query.organizations.findFirst({
      where: eq(organizations.userId, data.user.id),
      columns: { id: true },
    });

    if (!org) throw new AppError("Organization not found");

    const cookieStore = await cookies();
    cookieStore.set("org_id", org.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return data.user.id;
  });
}

export async function signOut() {
  return handleAction(async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    const cookieStore = await cookies();
    cookieStore.delete("org_id");
  });
}

export async function forgotPassword(
  formData: z.infer<typeof ForgotPasswordSchema>,
) {
  return handleAction(async () => {
    const validated = zodValidate(ForgotPasswordSchema, formData);
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      validated.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      },
    );

    if (error) throw new AppError(error.message);

    return {};
  });
}

export async function resetPassword(
  formData: z.infer<typeof ResetPasswordSchema>,
) {
  return handleAction(async () => {
    const validated = zodValidate(ResetPasswordSchema, formData);
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password: validated.password,
    });

    if (error) throw new AppError(error.message);

    return {};
  });
}
