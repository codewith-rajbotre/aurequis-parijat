import { Info } from "lucide-react";

import { ErrorMessageBase, type ErrorMessageProps } from "./error-message-base";

// Any other error: plain text colour.
export function ErrorMessage({
  message = "Something went wrong.",
  ...props
}: ErrorMessageProps) {
  return (
    <ErrorMessageBase
      message={message}
      icon={Info}
      textClassName="text-muted-foreground"
      boxClassName="border-border bg-muted/40"
      {...props}
    />
  );
}
