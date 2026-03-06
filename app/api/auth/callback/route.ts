import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { db } from "@/db";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";

function getSafeRedirectPath(
  request: NextRequest,
  defaultPath: string,
): string {
  const nextParam = new URL(request.url).searchParams.get("next");
  if (nextParam && nextParam.startsWith("/")) return nextParam;
  return defaultPath;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const type = url.searchParams.get("type");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const defaultRedirect =
    type === "recovery" ? "/reset-password" : "/admin";
  const redirectPath = getSafeRedirectPath(request, defaultRedirect);

  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (type !== "recovery") {
    let user = data.user;
    if (!user) {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData.user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      user = userData.user;
    }

    let org = await db.query.organizations.findFirst({
      where: eq(organizations.userId, user.id),
      columns: { id: true },
    });

    if (!org) {
      const pendingOrgName = request.cookies.get("pending_org_name")?.value;
      const name = user.user_metadata.name ?? "";
      const derivedOrgName =
        pendingOrgName?.trim() || name.trim() || "My Workspace";

      const [newOrg] = await db
        .insert(organizations)
        .values({
          userId: user.id,
          name: derivedOrgName,
          plan: "free",
        })
        .returning();

      org = newOrg;
      if (pendingOrgName) {
        response.cookies.delete("pending_org_name");
      }
    }

    response.cookies.set("org_id", org.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return response;
}
