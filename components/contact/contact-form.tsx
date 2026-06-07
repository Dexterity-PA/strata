"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/contact/select";
import { DUR, EASE } from "@/lib/animation/motion";
import { useReducedMotion } from "@/lib/animation/use-reduced-motion";

interface FormValues {
  name: string;
  email: string;
  role: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  role: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.role) errors.role = "Please choose one.";
  if (!values.message.trim())
    errors.message = "Please tell us a bit about your situation.";
  return errors;
}

/** Contact form — client-side validation only. */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const reducedMotion = useReducedMotion();

  function setField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear the field's error as soon as the visitor starts correcting it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO(Phase 2): wire this up to a real backend/email send. Until then,
    // submissions are NOT delivered anywhere — this only shows the success
    // state for the UI flow.
    setSubmitted(true);
  }

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: DUR.base, ease: EASE.out };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {submitted ? (
        <motion.div
          key="success"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="rounded-st-md border border-st-line bg-st-surface px-8 py-12 text-center"
          role="status"
        >
          <span aria-hidden className="mx-auto block h-px w-10 bg-st-accent" />
          <p className="mt-8 font-st-display text-st-h3 text-st-ink">
            Thanks for reaching out
          </p>
          <p className="mx-auto mt-3 max-w-md text-st-body text-st-muted">
            I&apos;ll get back to you soon.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: DUR.fast }}
          onSubmit={handleSubmit}
          noValidate
          className="grid gap-6"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name" htmlFor="contact-name" error={errors.name}>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "contact-name-error" : undefined
                }
              />
            </Field>
            <Field label="Email" htmlFor="contact-email" error={errors.email}>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => setField("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
              />
            </Field>
          </div>
          <Field label="You are" htmlFor="contact-role" error={errors.role}>
            <Select
              id="contact-role"
              name="role"
              value={values.role}
              onChange={(e) => setField("role", e.target.value)}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? "contact-role-error" : undefined}
              // Full-strength muted: the 70% placeholder tint fails WCAG AA
              // contrast for real (visible) text on st-surface.
              className={values.role ? undefined : "text-st-muted"}
            >
              <option value="" disabled>
                Select one
              </option>
              <option value="individual">Individual</option>
              <option value="small-business">Small business</option>
            </Select>
          </Field>
          <Field
            label="What can we help with?"
            htmlFor="contact-message"
            error={errors.message}
          >
            <Textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={(e) => setField("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
            />
          </Field>
          <div>
            <Button type="submit">Send message</Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={htmlFor}
        className="font-st-sans text-st-small font-medium text-st-ink"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="font-st-sans text-st-small text-st-accent"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
