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
import {
  removeOrganizationId,
  setOrganizationId,
  setOrganizationname,
} from "./organization";

export async function register(formData: z.infer<typeof RegisterSchema>) {
  return handleAction(async () => {
    const validated = zodValidate(RegisterSchema, formData);
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      },
    });

    if (error) throw new AppError(error.message);
    if (!data.user) throw new AppError("Try again");

    await setOrganizationname(validated.name);

    return {};
  });
}

type GoogleSignInPayload = {
  mode: "login" | "register";
};

export async function signInWithGoogle(payload?: GoogleSignInPayload) {
  return handleAction(async () => {
    const supabase = await createClient();
    const mode = payload?.mode ?? "login";

    const redirectPath = mode === "login" ? "/admin" : "/welcome";
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=${redirectPath}`,
      },
    });

    if (error) throw new AppError(error.message);
    if (!data?.url) throw new AppError("Unable to start Google sign in");

    return { url: data.url };
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
    setOrganizationId(org.id);

    return data.user;
  });
}

export async function signOut() {
  return handleAction(async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    await removeOrganizationId();
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
