import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-st-sm border border-st-line bg-st-surface px-4 py-3 font-st-sans text-st-body text-st-ink " +
  "placeholder:text-st-muted/70 transition-colors duration-(--st-dur-fast) " +
  "focus:border-st-accent focus:outline-none focus-visible:outline-none " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/** Styled text input primitive. Forms are composed in later phases. */
export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}

/** Styled textarea primitive. Forms are composed in later phases. */
export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldClasses, "min-h-32 resize-y", className)}
      {...props}
    />
  );
}
