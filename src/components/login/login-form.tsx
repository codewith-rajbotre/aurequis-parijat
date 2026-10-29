"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { ApiErrorMessage } from "@/components/errors";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { type AppError, toAppError } from "@/lib/errors";
import {
    inputClassName,
    luxuryCardClassName,
    primaryButtonClassName,
    sectionDescriptionClassName,
    sectionTitleClassName,
} from "@/lib/styles";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AppError | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            const result = await response.json();

            if (result.success) {
                router.replace("/home");
                return;
            }

            setError({
                status: response.status,
                message: result.message ?? "Login failed.",
            });
        } catch (caught) {
            console.error(caught);
            setError(toAppError(caught, undefined, "Something went wrong. Please try again."));
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className={`${luxuryCardClassName} max-w-107.5 p-6 sm:p-10`}>
            <div className="space-y-3 text-center">
                <h1 className={`${sectionTitleClassName} text-4xl`}>
                    AUREQUIS PARIJAT
                </h1>

                <p className={sectionDescriptionClassName}>
                    Reserved for the Exceptional
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6 sm:mt-10"
            >
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                    >
                        Email Address
                    </label>

                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className={inputClassName}
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-foreground"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            required
                            value={password}
                            placeholder="Enter your password"
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            disabled={loading}
                            className={`${inputClassName} pr-12`}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-brand-gold"
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {error && <ApiErrorMessage error={error} />}

                <Button
                    type="submit"
                    disabled={loading}
                    className={primaryButtonClassName}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Authenticating...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>
        </Card>
    );
}