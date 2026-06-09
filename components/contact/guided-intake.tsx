"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types + content (real, production copy in the founder's voice)    */
/* ------------------------------------------------------------------ */

type Audience = "small-business" | "individual";

interface AudienceOption {
  value: Audience;
  label: string;
  hint: string;
}

const AUDIENCE_OPTIONS: readonly AudienceOption[] = [
  {
    value: "small-business",
    label: "For a business",
    hint: "You run or help run a small business.",
  },
  {
    value: "individual",
    label: "For yourself or your household",
    hint: "You are looking at your own money.",
  },
];

// Tappable example chips per branch. Selecting one fills the question field
// with a friendly starter the visitor can edit.
const CHIPS: Record<Audience, readonly string[]> = {
  "small-business": [
    "Getting a handle on cash flow",
    "Getting through a slow season",
    "Pricing my work",
  ],
  individual: [
    "Building a budget that holds",
    "Which debt to pay off first",
    "Saving for something specific",
  ],
};

const TOTAL_STEPS = 3;

const STEP_TITLES: Record<1 | 2 | 3, string> = {
  1: "Who is this for?",
  2: "What is on your mind?",
  3: "Where can I reach you?",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GuidedIntake() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);

  const [audience, setAudience] = useState<Audience | "">("");
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  // Honeypot: humans never see this; a filled value is treated as a bot.
  const [company, setCompany] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const reducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const baseId = useId();

  /** Move to a step and shift focus to its heading for screen-reader context. */
  function goToStep(next: 1 | 2 | 3) {
    setError(null);
    setStep(next);
    // Defer focus until the new step has rendered.
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  function pickChip(value: string) {
    setQuestion(value);
    setError(null);
  }

  async function submit() {
    setPending(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role: audience,
          message: question.trim(),
          details: details.trim(),
          company,
        }),
      });
      if (response.ok) {
        setDone(true);
        window.requestAnimationFrame(() => headingRef.current?.focus());
        return;
      }
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setSubmitError(
        response.status === 400 && data?.error
          ? data.error
          : "Something went wrong sending your message. Please try again.",
      );
    } catch {
      setSubmitError(
        "I could not reach the server. Please check your connection and try again.",
      );
    } finally {
      setPending(false);
    }
  }

  /** The form's submit routes by the current step, so Enter advances too. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    if (step === 1) {
      if (!audience) {
        setError("Pick the one that fits best.");
        return;
      }
      goToStep(2);
    } else if (step === 2) {
      if (!question.trim()) {
        setError("Tell me a little about what is on your mind.");
        return;
      }
      goToStep(3);
    } else {
      if (!name.trim()) {
        setError("Please add your name so I know who I am talking to.");
        return;
      }
      if (!EMAIL_PATTERN.test(email.trim())) {
        setError("Please add an email address I can reply to.");
        return;
      }
      void submit();
    }
  }

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: DUR.base, ease: EASE.out };

  if (done) {
    return (
      <Confirmation
        headingRef={headingRef}
        audience={audience as Audience}
        question={question.trim()}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8">
      {/* Honeypot: off-screen, skipped by keyboard and screen readers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden"
      >
        <label htmlFor={`${baseId}-company`}>Company</label>
        <input
          id={`${baseId}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <Progress step={step} />

      {/* Announce step changes to assistive tech. */}
      <p aria-live="polite" className="sr-only">
        {`Step ${step} of ${TOTAL_STEPS}: ${STEP_TITLES[step]}`}
      </p>

      {/* Keyed (not AnimatePresence) so the new step's heading mounts
          synchronously and focus can move to it. Enter-only animation;
          steps advance on state, never gated on an animation completing. */}
      <motion.div
        key={step}
        initial={reducedMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={transition}
        className="grid gap-7"
      >
        <div>
          <p className="font-st-sans text-st-small font-medium uppercase tracking-[0.16em] text-st-accent">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-st-display text-st-h2 text-st-ink outline-none"
          >
            {STEP_TITLES[step]}
          </h2>
        </div>

        {step === 1 ? (
          <fieldset className="grid gap-4">
            <legend className="sr-only">Who is this for?</legend>
            {AUDIENCE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className={cn(
                  "group flex cursor-pointer items-start gap-4 rounded-st-md border bg-st-surface p-5 transition-colors duration-(--st-dur-fast)",
                  audience === option.value
                    ? "border-st-accent ring-1 ring-st-accent"
                    : "border-st-line hover:border-st-accent/50",
                )}
              >
                <input
                  type="radio"
                  name="audience"
                  value={option.value}
                  checked={audience === option.value}
                  onChange={() => {
                    setAudience(option.value);
                    setError(null);
                  }}
                  className="mt-1 h-4 w-4 accent-st-accent"
                />
                <span className="grid gap-1">
                  <span className="font-st-sans text-st-body font-medium text-st-ink">
                    {option.label}
                  </span>
                  <span className="font-st-sans text-st-small text-st-muted">
                    {option.hint}
                  </span>
                </span>
              </label>
            ))}
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-5">
            <Field
              label="The one money question on your mind"
              htmlFor={`${baseId}-question`}
            >
              <Textarea
                id={`${baseId}-question`}
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setError(null);
                }}
                placeholder="A sentence or two is plenty. Plain language is perfect."
              />
            </Field>
            {audience ? (
              <div className="grid gap-2">
                <p className="font-st-sans text-st-small text-st-muted">
                  Or start from one of these:
                </p>
                <div className="flex flex-wrap gap-2">
                  {CHIPS[audience].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => pickChip(chip)}
                      className="inline-flex min-h-11 items-center rounded-st-sm border border-st-line bg-st-surface px-3.5 font-st-sans text-st-small text-st-ink transition-colors duration-(--st-dur-fast) hover:border-st-accent hover:text-st-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-st-accent"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Your name" htmlFor={`${baseId}-name`}>
                <Input
                  id={`${baseId}-name`}
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                />
              </Field>
              <Field label="Email" htmlFor={`${baseId}-email`}>
                <Input
                  id={`${baseId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                />
              </Field>
            </div>
            <Field
              label="Anything else you want me to know (optional)"
              htmlFor={`${baseId}-details`}
            >
              <Textarea
                id={`${baseId}-details`}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Context, timing, or anything that would help me prepare. Skip it if there is nothing to add."
              />
            </Field>
          </div>
        ) : null}

        {error ? (
          <p className="font-st-sans text-st-small text-st-accent" role="alert">
            {error}
          </p>
        ) : null}

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          <Button type="submit" disabled={pending}>
            {step < TOTAL_STEPS
              ? "Continue"
              : pending
                ? "Sending…"
                : "Send it over"}
          </Button>
          {step > 1 ? (
            <button
              type="button"
              onClick={() => goToStep((step - 1) as 1 | 2 | 3)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center font-st-sans text-st-small font-medium text-st-muted underline decoration-st-line underline-offset-4 transition-colors duration-(--st-dur-fast) hover:text-st-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-st-accent"
            >
              Back
            </button>
          ) : null}
          {step === TOTAL_STEPS ? (
            <span className="font-st-sans text-st-small text-st-muted">
              Free, no obligation.
            </span>
          ) : null}
        </div>

        {submitError ? (
          <p className="font-st-sans text-st-small text-st-accent" role="alert">
            {submitError}
          </p>
        ) : null}
      </motion.div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Confirmation: "what happens next", not a generic thanks           */
/* ------------------------------------------------------------------ */

function Confirmation({
  headingRef,
  audience,
  question,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  audience: Audience;
  question: string;
}) {
  const audienceLine =
    audience === "small-business"
      ? "for your business"
      : "for yourself or your household";

  return (
    <div role="status" className="grid gap-8">
      <div>
        <span aria-hidden className="block h-px w-10 bg-st-accent" />
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-7 font-st-display text-st-h2 text-st-ink outline-none"
        >
          Got it. Here is what happens next.
        </h2>
      </div>

      <div className="rounded-st-md border border-st-line bg-st-surface p-6">
        <p className="font-st-sans text-st-small font-medium uppercase tracking-[0.16em] text-st-accent">
          What you told me
        </p>
        <p className="mt-3 text-st-body text-st-ink">
          You reached out {audienceLine}, and the question on your mind is:
        </p>
        <blockquote className="mt-3 border-l-2 border-st-accent/40 pl-4 font-st-display text-st-h3 leading-snug text-st-ink">
          {question}
        </blockquote>
      </div>

      <div className="grid gap-4 text-st-body-lg text-st-muted">
        <p>
          I will read this myself and get back to you to find a time to talk.
          That might be a short call or a back-and-forth over email, whichever
          is easier for you.
        </p>
        <p>
          There is no cost and no obligation, and nothing here turns into a
          sales pitch. If your situation ever calls for a licensed professional,
          I will tell you and point you toward one.
        </p>
      </div>

      <div className="rounded-st-md border border-st-line bg-st-bg p-6">
        <p className="font-st-display text-st-h3 text-st-ink">
          Want to come prepared?
        </p>
        <p className="mt-2 text-st-body text-st-muted">
          Here is a short prep sheet with the handful of numbers that make a
          first conversation productive. It is optional, and you can fill in as
          much or as little as you like.
        </p>
        <div className="mt-5">
          <Button href="/prep" variant="secondary">
            Open the prep sheet
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Progress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div aria-hidden className="flex items-center gap-2">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          className={cn(
            "h-1 flex-1 rounded-full transition-colors duration-(--st-dur-base)",
            n <= step ? "bg-st-accent" : "bg-st-line",
          )}
        />
      ))}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={htmlFor}
        className="font-st-sans text-st-small font-medium text-st-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
