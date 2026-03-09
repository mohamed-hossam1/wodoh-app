import { NotFoundError } from "@/lib/error";
import { cookies } from "next/headers";

export async function getOrganizationId() {
  const cookieStore = await cookies();
  const organizationId = cookieStore.get("org_id")?.value;

  if (!organizationId) throw new NotFoundError("organizationId");

  return organizationId;
}

export async function setOrganizationId(organizationId: string) {
  const cookieStore = await cookies();
  cookieStore.set("org_id", organizationId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function setOrganizationname(organizationName: string) {
  const cookieStore = await cookies();

  cookieStore.set("pending_org_name", organizationName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
  });
}

export async function removeOrganizationId() {
  const cookieStore = await cookies();
  cookieStore.delete("org_id");
}
