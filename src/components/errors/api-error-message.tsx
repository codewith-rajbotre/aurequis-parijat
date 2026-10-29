import type { AppError } from "@/lib/errors";

import { Error400Message } from "./error-400-message";
import { Error500Message } from "./error-500-message";
import { ErrorMessage } from "./error-message";
import type { ErrorMessageProps } from "./error-message-base";

interface ApiErrorMessageProps extends Omit<ErrorMessageProps, "message"> {
  error: AppError;
}

// Picks the right message component from the error's status code.
export function ApiErrorMessage({ error, ...props }: ApiErrorMessageProps) {
  if (error.status >= 500) {
    return <Error500Message message={error.message} {...props} />;
  }

  if (error.status >= 400) {
    return <Error400Message message={error.message} {...props} />;
  }

  return <ErrorMessage message={error.message} {...props} />;
}
