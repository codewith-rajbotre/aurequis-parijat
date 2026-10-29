// A failure in a shape the UI can render: `status` picks the colour
// (500-series red, 400-series yellow, anything else plain text).
export interface AppError {
  status: number;
  message: string;
}

export type Result<T> =
  | { data: T; error: null }
  | { data: null; error: AppError };

export class MissingConfigError extends Error {}

const DEFAULT_MESSAGE = "Something went wrong while fetching details.";

function messageOf(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }

  return "";
}

// `status` is the HTTP status from a Supabase response; Supabase reports 0
// when the request never reached the server. Thrown errors have no status.
export function toAppError(
  error: unknown,
  status?: number,
  fallbackMessage = DEFAULT_MESSAGE,
): AppError {
  if (error instanceof MissingConfigError) {
    return { status: 500, message: error.message };
  }

  const message = messageOf(error);

  if (status === 0 || /fetch failed|failed to fetch|ECONNREFUSED|ENOTFOUND|ETIMEDOUT/i.test(message)) {
    return {
      status: 503,
      message: "Connection not found. Please check your network and try again.",
    };
  }

  if (status === undefined || status >= 500) {
    return { status: status ?? 500, message: fallbackMessage };
  }

  return { status, message: message || fallbackMessage };
}
