"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, MessageCircle, Phone, Send, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormValues, contactSchema } from "@/lib/validations/contacts";
import { submitContactEnquiry } from "@/actions/contact-actions";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactDialog({
  open,
  onOpenChange,
}: ContactDialogProps) {
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onBlur",
  });

  const errors = form.formState.errors;

  async function onSubmit(values: ContactFormValues) {
    setSubmitMessage("");

    try {
      const result = await submitContactEnquiry(values);

      if (!result.success) {
        setSubmitMessage(result.message);
        return;
      }

      setSubmitMessage(result.message);
      form.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setSubmitMessage("Unable to submit your enquiry. Please try again.");
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setSubmitMessage("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-border bg-background sm:max-w-lg">
        <DialogHeader className="space-y-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/40">
            <MessageCircle className="h-5 w-5 text-brand-gold" />
          </div>

          <DialogTitle className="text-2xl font-semibold">
            Let&apos;s Connect
          </DialogTitle>

          <DialogDescription className="leading-6">
            Contact AUREQUIS PARIJAT for enquiries and assistance. Provide
            either your email address or phone number.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 pt-3"
        >
          {/* Full name */}
          <div className="space-y-2">
            <Label htmlFor="contact-name">Full Name *</Label>

            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="contact-name"
                placeholder="Enter your full name"
                autoComplete="name"
                className="pl-9"
                aria-invalid={!!errors.name}
                {...form.register("name")}
              />
            </div>

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="pl-9"
                aria-invalid={!!errors.email}
                {...form.register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone Number</Label>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                id="contact-phone"
                type="tel"
                inputMode="numeric"
                placeholder="10-digit phone number"
                autoComplete="tel-national"
                maxLength={10}
                className="pl-9"
                aria-invalid={!!errors.phone}
                {...form.register("phone")}
              />
            </div>

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Contact method guidance */}
          {!form.watch("email")?.trim() && !form.watch("phone")?.trim() && (
            <p className="text-xs text-muted-foreground">
              Email or phone is required. You do not need to provide both.
            </p>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="contact-message">Your Message *</Label>

            <Textarea
              id="contact-message"
              placeholder="Tell us how we can assist you..."
              rows={4}
              className="resize-y"
              aria-invalid={!!errors.message}
              {...form.register("message")}
            />

            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Company email */}
          <div className="rounded-lg border border-border p-3">
            <p className="text-sm text-muted-foreground">
              Prefer to contact us directly?
            </p>

            <a
              href="mailto:aurequis.parijat@gmail.com"
              className="mt-1 inline-block break-all text-sm font-medium text-brand-gold underline underline-offset-4"
            >
              aurequis.parijat@gmail.com
            </a>
          </div>

          {/* Submission feedback */}
          {submitMessage && (
            <p
              role="status"
              aria-live="polite"
              className={`text-sm ${
                submitMessage ===
                "Your enquiry has been submitted successfully."
                  ? "text-green-600"
                  : "text-destructive"
              }`}
            >
              {submitMessage}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-brand-gold text-black hover:opacity-90"
            >
              <Send className="mr-2 h-4 w-4" />

              {form.formState.isSubmitting ? "Submitting..." : "Send Enquiry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
