"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mirrors the server-side pattern in app/api/subscribe/route.ts.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Slim footer newsletter signup — validates client-side, then subscribes the
 * email to the Resend audience via POST /api/subscribe. Lives on the inverse
 * (deep navy) footer ground, so the light-ground Input/Button primitives get
 * dark-ground color overrides here.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Honeypot — humans never see this field; the API drops filled submissions.
  const [company, setCompany] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (!email.trim() || !EMAIL_PATTERN.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company }),
      });
      if (response.ok) {
        setSubscribed(true);
        return;
      }
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      // Surface validation messages; keep everything else calm and generic.
      setError(
        response.status === 400 && data?.error
          ? data.error
          : "Something went wrong. Please try again.",
      );
    } catch {
      setError(
        "We couldn't reach the server. Please check your connection and try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-sm">
        <h2 className="mb-3 text-st-eyebrow font-medium uppercase tracking-[0.18em] text-st-accent-bright">
          Newsletter
        </h2>
        <p className="text-st-small text-st-paper/65">
          Occasional, practical money tips. No spam, unsubscribe anytime.
        </p>
      </div>

      {subscribed ? (
        <p role="status" className="text-st-small text-st-paper">
          You&apos;re in — thanks for subscribing.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative w-full md:max-w-md"
        >
          {/* Honeypot: visually hidden and skipped by keyboard/screen readers.
              Bots that auto-fill every field reveal themselves here. */}
          <div
            aria-hidden="true"
            className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden"
          >
            <label htmlFor="newsletter-company">Company</label>
            <input
              id="newsletter-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear the error as soon as the visitor starts correcting it.
                if (error) setError(null);
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "newsletter-email-error" : undefined}
              className="border-st-paper/25 bg-st-paper/10 text-st-paper placeholder:text-st-paper/50 focus:border-st-accent-bright"
            />
            <Button
              type="submit"
              disabled={pending}
              className="shrink-0 bg-st-paper px-6 text-st-ink hover:bg-st-paper/90"
            >
              {pending ? "Subscribing…" : "Subscribe"}
            </Button>
          </div>
          {error && (
            <p
              id="newsletter-email-error"
              role="alert"
              className="mt-2 text-st-small text-st-accent-bright"
            >
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
