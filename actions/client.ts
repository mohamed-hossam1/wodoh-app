"use server";

import { db } from "@/db";
import { clients } from "@/db/schema";
import { handleAction } from "@/lib/action-handler";
import { AppError, NotFoundError } from "@/lib/error";
import z from "zod";
import { clientsSchema } from "@/lib/validations";
import { zodValidate } from "@/lib/zod-validate";
import { and, eq } from "drizzle-orm";
import { getOrganizationId } from "./organization";

type ProjectNoteFormData = z.infer<typeof clientsSchema>;

export async function createClient(formData: ProjectNoteFormData) {
  return handleAction(async () => {
    const validatedClientData = zodValidate(clientsSchema, formData);
    const organizationId = await getOrganizationId();
    if (!organizationId) throw new NotFoundError("organizationId");
    const [newClient] = await db
      .insert(clients)
      .values({
        organizationId,
        name: validatedClientData.name,
        phone: validatedClientData.phone,
      })
      .returning();
    if (!newClient) {
      throw new AppError("Client was not created");
    }

    return { newClient };
  });
}

export async function getClients() {
  return handleAction(async () => {
    const organizationId = await getOrganizationId();

    if (!organizationId) throw new NotFoundError("organizationId");

    const allClients = await db
      .select()
      .from(clients)
      .where(eq(clients.organizationId, organizationId));

    return { allClients };
  });
}

export async function getClient(clientId: string) {
  return handleAction(async () => {
    const organizationId = await getOrganizationId();

    if (!organizationId) throw new NotFoundError("organizationId");

    const client = await db
      .select()
      .from(clients)
      .where(
        and(
          eq(clients.organizationId, organizationId),
          eq(clients.id, clientId),
        ),
      );

    return { client };
  });
}

export async function updateClient(
  clientId: string,
  formData: Partial<ProjectNoteFormData>,
) {
  return handleAction(async () => {
    const validatedClientData = zodValidate(clientsSchema, formData, "PARTIAL");

    const organizationId = await getOrganizationId();

    if (!organizationId) throw new NotFoundError("organizationId");

    const client = await db
      .update(clients)
      .set(validatedClientData)
      .where(
        and(
          eq(clients.organizationId, organizationId),
          eq(clients.id, clientId),
        ),
      )
      .returning();

    return { client };
  });
}
