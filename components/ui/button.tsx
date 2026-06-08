import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type ButtonProps = ButtonBaseProps &
  (
    | ({ href: string } & { onClick?: never; type?: never; disabled?: never })
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const base =
  "group inline-flex items-center justify-center gap-2 rounded-st-sm font-st-sans text-st-small font-medium tracking-wide " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-(--st-dur-fast) ease-st-out " +
  "hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-st-ink text-st-paper px-7 py-3.5 shadow-st-sm hover:bg-st-ink-soft hover:shadow-st-md",
  secondary:
    "border border-st-ink/25 text-st-ink px-7 py-3.5 hover:border-st-accent hover:text-st-accent",
  ghost:
    "min-h-11 px-1 py-1 text-st-ink underline decoration-st-accent/40 decoration-1 underline-offset-6 hover:decoration-st-accent hover:text-st-accent",
};

/**
 * Site button. Renders a Next <Link> when `href` is given, otherwise a
 * <button>. Hover motion is transform/color only.
 */
export function Button({
  children,
  variant = "primary",
  className,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], className);

  if (typeof href === "string") {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
