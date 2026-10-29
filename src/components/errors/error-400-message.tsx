import { TriangleAlert } from "lucide-react";

import { ErrorMessageBase, type ErrorMessageProps } from "./error-message-base";

// 400-series: bad requests, missing access or not found, shown in yellow.
export function Error400Message({
  message = "The request could not be completed.",
  ...props
}: ErrorMessageProps) {
  return (
    <ErrorMessageBase
      message={message}
      icon={TriangleAlert}
      textClassName="text-yellow-700 dark:text-yellow-400"
      boxClassName="border-yellow-500/30 bg-yellow-500/10"
      {...props}
    />
  );
}
