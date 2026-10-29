import type { AppError } from "@/lib/errors";

import { ApiErrorMessage } from "@/components/errors";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: number | null;
  // When set, the card shows the error in place of the value.
  error?: AppError | null;
}

export function StatCard({ label, value, error }: StatCardProps) {
  return (
    <Card className="min-w-0 rounded-3xl border-border bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40">
      <CardContent className="space-y-2 p-4 sm:p-6">
        {error ? (
          <ApiErrorMessage error={error} compact />
        ) : (
          <p className="text-3xl font-bold text-brand-gold">{value}</p>
        )}

        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
