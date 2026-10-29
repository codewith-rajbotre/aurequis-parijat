"use client";

import Link from "next/link";

import { MobileNavbar } from "./mobile-navbar";
import { NavbarLinks } from "./navbar-links";
import { NavbarLogo } from "./navbar-logo";

import { ThemeSelector } from "../common/theme-toggle";
import { SignOutButton } from "@/components/common/sign-out-button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="container mx-auto flex h-20 items-center justify-between gap-3 px-4 lg:px-6">
        <Link href="/" aria-label="AUREQUIS PARIJAT Home">
          <NavbarLogo />
        </Link>

        <NavbarLinks />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeSelector />

          <SignOutButton className="hidden lg:inline-flex" />

          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}
