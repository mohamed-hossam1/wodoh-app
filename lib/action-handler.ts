import { ActionResult } from "@/types/global";
import { AppError } from "./error";



export async function handleAction<T>(
  fn: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        statusCode: error.statusCode,
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: `Something went wrong ${error}`,
      statusCode: 500,
    };
  }
}