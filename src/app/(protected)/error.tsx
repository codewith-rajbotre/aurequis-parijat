"use client";

import { useEffect } from "react";

import { RotateCw } from "lucide-react";

import { Error500Message } from "@/components/errors";
import { Button } from "@/components/ui/button";

// Fallback for unexpected errors; the navbar and footer from the layout stay visible.
export default function ProtectedError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-20">
      <Error500Message className="w-full" />

      <Button variant="outline" onClick={() => unstable_retry()}>
        <RotateCw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </section>
  );
}
