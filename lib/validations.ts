import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const clientsSchema = z.object({
  name: z.string().min(1, { message: "Client name is required." }),
  phone: z
    .string()
    .min(11, { message: "Invalid phone number" })
    .max(11, { message: "Invalid phone number" }),
  deletedAt: z.date().nullable().optional(),
});

export const projectStatus = ["active", "completed", "paused"] as const;
export const projectsSchema = z.object({
  name: z.string().min(1, { message: "Project name is required." }),
  description: z.string().nullable().optional(),
  status: z.enum(projectStatus),
  totalValue: z.coerce.number().min(0),
  startDate: z.coerce.date().nullable().optional(),
  deliveryDate: z.coerce.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
});
