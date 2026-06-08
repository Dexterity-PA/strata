"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Section } from "@/components/layout/section";
import { StrataMotif } from "@/components/strata/StrataMotif";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for local debugging and any attached logging.
    console.error(error);
  }, [error]);

  return (
    <Section
      container="none"
      className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden pt-44"
    >
      <StrataMotif variant="lines" density="sparse" className="opacity-50" />
      <Container className="relative">
        <Eyebrow>Something interrupted</Eyebrow>
        <h1 className="mt-6 font-st-display text-st-h1">
          This page hit a snag.
        </h1>
        <p className="mt-4 max-w-md text-st-body text-st-muted">
          Nothing to worry about on your end. Try loading it again, or head back
          and pick up where you left off.
        </p>
        {error.digest ? (
          <p className="mt-3 font-st-sans text-st-small text-st-muted/80">
            Reference: {error.digest}
          </p>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Return home
          </Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
