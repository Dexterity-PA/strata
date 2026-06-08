import Link from "next/link";
import type { ReactNode } from "react";
import { termAnchorId } from "@/app/glossary/terms";
import { cn } from "@/lib/utils";

const linkClasses =
  "text-st-accent underline decoration-st-accent/40 underline-offset-4 " +
  "transition-colors duration-(--st-dur-fast) hover:decoration-st-accent";

interface ProseLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Inline prose link in the site's gold-underline style. Used for the running
 * links to /tools and /glossary inside a case-study walkthrough.
 */
export function ProseLink({ href, children, className }: ProseLinkProps) {
  return (
    <Link href={href} className={cn(linkClasses, className)}>
      {children}
    </Link>
  );
}

interface GlossaryLinkProps {
  /** Exact glossary term string, e.g. "Cash Flow". Must match an entry. */
  term: string;
  /** Link text. Defaults to the term itself when omitted. */
  children?: ReactNode;
  className?: string;
}

/**
 * Link to a specific glossary entry. The href is derived from the same
 * anchor helper the glossary page uses, so the target always resolves.
 */
export function GlossaryLink({ term, children, className }: GlossaryLinkProps) {
  return (
    <ProseLink href={`/glossary#${termAnchorId(term)}`} className={className}>
      {children ?? term}
    </ProseLink>
  );
}
