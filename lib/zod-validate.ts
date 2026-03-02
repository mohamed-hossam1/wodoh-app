import { z } from "zod";
import { ValidationError } from "./error";

export function zodValidate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors as Record<
      string,
      string[]
    >;
    throw new ValidationError(fieldErrors);
  }

  return result.data;
}
