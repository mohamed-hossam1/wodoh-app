import { LucideIcon } from "lucide-react";


export type ActionResult<T = void> =
  | { success: true; data: T }
  | {
      success: false;
      message: string;
      statusCode: number;
      errors?: Record<string, string[]>;
    };

export type StatItem = {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
};

