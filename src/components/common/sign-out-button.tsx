"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function signOut() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    const result = await response.json();

    if (result.success) {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <Button
      variant="outline"
      onClick={signOut}
      className={cn(
        "h-10 rounded-lg border-brand-gold/30 px-5 text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-black",
        className,
      )}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
