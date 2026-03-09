import { projects } from "@/db/schema";
import { projectsSchema } from "@/lib/validations";
import z from "zod";

export type ProjectFormData = z.infer<typeof projectsSchema>;
export type ProjectInsert = typeof projects.$inferInsert;

function toDbDate(value: Date | null | undefined) {
  return value?.toISOString().split("T")[0] ?? null;
}

function hasOwnKey<T extends object>(obj: T, key: keyof T) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function mapProjectValues(
  values: Partial<ProjectFormData>,
): Partial<ProjectInsert> {
  const mapped: Partial<ProjectInsert> = {};

  if (hasOwnKey(values, "name") && values.name !== undefined) {
    mapped.name = values.name;
  }

  if (hasOwnKey(values, "description")) {
    mapped.description = values.description ?? null;
  }

  if (hasOwnKey(values, "status") && values.status !== undefined) {
    mapped.status = values.status;
  }

  if (hasOwnKey(values, "totalValue") && values.totalValue !== undefined) {
    mapped.totalValue = values.totalValue.toString();
  }

  if (hasOwnKey(values, "startDate")) {
    mapped.startDate = toDbDate(values.startDate);
  }

  if (hasOwnKey(values, "deliveryDate")) {
    mapped.deliveryDate = toDbDate(values.deliveryDate);
  }

  if (hasOwnKey(values, "deletedAt")) {
    mapped.deletedAt = values.deletedAt ?? null;
  }

  return mapped;
}

export function mapProjectCreateValues(
  values: ProjectFormData,
  organizationId: string,
  clientId: string,
): ProjectInsert {
  const mapped = mapProjectValues(values);

  return {
    organizationId,
    clientId,
    name: values.name,
    status: values.status,
    totalValue: values.totalValue.toString(),
    description: mapped.description ?? null,
    startDate: mapped.startDate ?? null,
    deliveryDate: mapped.deliveryDate ?? null,
    deletedAt: mapped.deletedAt ?? null,
  };
}
