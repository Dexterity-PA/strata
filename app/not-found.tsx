import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col justify-center pt-44">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-6 font-st-display text-st-h1">Page not found</h1>
      <p className="mt-4 max-w-md text-st-body text-st-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-10">
        <Button href="/">Back to home</Button>
      </div>
    </Section>
  );
}
