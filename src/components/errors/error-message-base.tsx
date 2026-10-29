import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ErrorMessageProps {
  message?: string;
  // Compact renders inline text only, for small spots like a count box.
  compact?: boolean;
  className?: string;
}

interface ErrorMessageBaseProps extends ErrorMessageProps {
  message: string;
  icon: LucideIcon;
  textClassName: string;
  boxClassName: string;
}

// Shared layout for every error message; the per-status files only pick colours and defaults.
export function ErrorMessageBase({
  message,
  icon: Icon,
  textClassName,
  boxClassName,
  compact = false,
  className,
}: ErrorMessageBaseProps) {
  if (compact) {
    return (
      <p
        role="alert"
        className={cn("flex min-w-0 items-start gap-1.5 text-xs leading-5 wrap-anywhere", textClassName, className)}
      >
        <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        {message}
      </p>
    );
  }

  return (
    <div
      role="alert"
      className={cn(
        "flex min-w-0 items-start gap-3 rounded-2xl border p-4 text-sm wrap-anywhere",
        textClassName,
        boxClassName,
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
