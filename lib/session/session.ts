import { db } from "@/db";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { handleAction } from "../action-handler";
import { AppError, UnauthorizedError } from "../error";

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new AppError(error.message);
  if (!user) throw new UnauthorizedError();
  return user;
}

export async function getOrgId() {
  const cookieStore = await cookies();
  const cached = cookieStore.get("org_id")?.value;
  if (cached) return cached;

  const user = await getSession();
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.userId, user.id),
    columns: { id: true },
  });
  if (!org) throw new AppError("Organization not found", 404);

  cookieStore.set("org_id", org.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return org.id;
}

export async function clearOrgId() {
  return handleAction(async () => {
    const cookieStore = await cookies();
    cookieStore.delete("org_id");
  });
}
