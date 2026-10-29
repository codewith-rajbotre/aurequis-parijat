
"use client";

import { useState } from "react";
import { Mail, MessageCircle, Crown, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ContactDialog from "./contact-dialog";

export default function ContactPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="relative flex min-h-[calc(100dvh-8rem)] items-center justify-center overflow-hidden bg-background px-4 pb-16 pt-20 sm:px-6 sm:py-16">
      {/* Contact Us button in the top-right corner */}
      <Button
        onClick={() => setContactOpen(true)}
        className="absolute right-4 top-4 bg-brand-gold text-black hover:opacity-90 sm:right-6 sm:top-6"
      >
        Contact Us
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button>

      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/40">
          <Crown className="h-7 w-7 text-brand-gold" />
        </div>

        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-brand-gold">
          AUREQUIS PARIJAT
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          We&apos;d love to hear from you.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Whether you have a question, need assistance, or want to
          learn more about our world of luxury, our team is here to help.
        </p>

        <div className="mx-auto mt-12 grid max-w-xl gap-4 text-left sm:grid-cols-2">
          <a
            href="mailto:aurequis.parijat@gmail.com"
            className="rounded-xl border border-border p-5 transition-colors hover:border-brand-gold/60"
          >
            <Mail className="mb-4 h-6 w-6 text-brand-gold" />
            <h2 className="font-medium">Email Us</h2>
            <p className="mt-2 wrap-break-word text-sm text-muted-foreground">
              aurequis.parijat@gmail.com
            </p>
          </a>

          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="rounded-xl border border-border p-5 text-left transition-colors hover:border-brand-gold/60"
          >
            <MessageCircle className="mb-4 h-6 w-6 text-brand-gold" />
            <h2 className="font-medium">Personalised Assistance</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Click to send an enquiry to our team.
            </p>
          </button>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Golden Excellence. Timeless Heritage.
        </p>
      </div>

      <ContactDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
      />
    </main>
  );
}
