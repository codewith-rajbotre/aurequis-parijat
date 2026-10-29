import { OctagonAlert } from "lucide-react";

import { ErrorMessageBase, type ErrorMessageProps } from "./error-message-base";

// 500-series: server or connection failures, shown in red.
export function Error500Message({
  message = "Something went wrong on our side. Please try again later.",
  ...props
}: ErrorMessageProps) {
  return (
    <ErrorMessageBase
      message={message}
      icon={OctagonAlert}
      textClassName="text-red-600 dark:text-red-400"
      boxClassName="border-red-500/30 bg-red-500/10"
      {...props}
    />
  );
}
