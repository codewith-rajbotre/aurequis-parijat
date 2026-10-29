"use client";

import { useState } from "react";
import Link from "next/link";

import { Menu } from "lucide-react";

import { SignOutButton } from "@/components/common/sign-out-button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { navigationLinks } from "./navigation";

export function MobileNavbar() {
    // Controlled so the menu closes after navigating; the layout keeps it mounted.
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
                aria-label="Open navigation menu"
            >
                <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[min(20rem,85vw)] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>AUREQUIS PARIJAT</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1 px-2">
                    {navigationLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto p-6">
                    <SignOutButton className="w-full" />
                </div>
            </SheetContent>
        </Sheet>
    );
}
