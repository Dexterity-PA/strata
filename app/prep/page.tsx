import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PrintButton } from "@/components/prep/print-button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/prep" },
  title: "Prep sheet",
  description:
    "A short, printable prep sheet for your first conversation with Strata: the handful of numbers and notes that make it productive.",
};

/* ------------------------------------------------------------------ */
/*  Content (real, production copy in the founder's voice)            */
/* ------------------------------------------------------------------ */

const SECTIONS: ReadonlyArray<{
  heading: string;
  items: ReadonlyArray<string>;
}> = [
  {
    heading: "A typical month",
    items: [
      "Your typical monthly income. A rough average is fine, especially if it moves around. For a business, what the business brings in; for a household, what comes in after taxes.",
      "Your fixed monthly costs. The bills that show up no matter what: rent or mortgage, utilities, insurance, loan payments, subscriptions, and payroll if you have it.",
    ],
  },
  {
    heading: "What you owe, if anything",
    items: [
      "Any debts you are carrying, with three numbers for each: the balance, the interest rate (APR), and the minimum monthly payment. A recent statement has all three in one place.",
    ],
  },
  {
    heading: "The decision on your mind",
    items: [
      "The one question or choice you are weighing right now, written in a sentence. It can be small. The clearer the question, the more useful the conversation.",
    ],
  },
  {
    heading: "Helpful context, optional",
    items: [
      "Recent statements, a budget you already keep, or any notes you have made. Bring what you already have. Please do not build anything new just for this.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function PrepPage() {
  return (
    <Section spacing="none" container="none" className="pt-36 pb-st-section">
      <Container size="narrow">
        {/* Screen-only: print control. Hidden from the printed sheet. */}
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md font-st-sans text-st-small text-st-muted">
            A one-page sheet to bring to a first conversation. Print it, save it
            as a PDF, or just read it. Nothing here is required.
          </p>
          <PrintButton />
        </div>

        {/* The sheet */}
        <article className="rounded-st-lg border border-st-line bg-st-surface p-8 sm:p-12">
          {/* Masthead */}
          <header className="flex flex-col gap-4 border-b border-st-line pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Bring this to our conversation</Eyebrow>
              <h1 className="mt-5 font-st-display text-st-h2 text-st-ink">
                Your first-conversation prep sheet
              </h1>
            </div>
            <div className="font-st-display text-st-h3 leading-none text-st-ink">
              {SITE.shortName}
              <span className="text-st-accent">.</span>
            </div>
          </header>

          <p className="mt-8 max-w-2xl text-st-body-lg leading-relaxed text-st-ink">
            A first conversation goes further when a few numbers are in front of
            us. None of this is homework, and none of it is required. Gather
            what is easy to find, leave the rest, and we will fill in the gaps
            together.
          </p>

          {/* Checklist */}
          <div className="mt-10 grid gap-8">
            {SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2 className="font-st-display text-st-h3 text-st-ink">
                  {section.heading}
                </h2>
                <ul className="mt-4 grid gap-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-1 h-5 w-5 shrink-0 rounded-[4px] border border-st-ink/40"
                      />
                      <span className="text-st-body leading-relaxed text-st-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Reassurance */}
          <p className="mt-10 rounded-st-md border border-st-line bg-st-bg px-6 py-5 text-st-body leading-relaxed text-st-ink">
            If a number is not handy, leave it blank. We can estimate together,
            and a rough figure beats no figure. This is not a test, and there is
            no wrong way to show up.
          </p>

          {/* Footer */}
          <footer className="mt-10 border-t border-st-line pt-6">
            <p className="text-st-small leading-relaxed text-st-muted">
              Strata offers free financial education and planning support, not
              licensed financial advice. When something calls for a licensed
              professional, you will be pointed toward one.
            </p>
            <div className="mt-3 flex flex-col gap-1 font-st-sans text-st-small font-medium text-st-ink sm:flex-row sm:items-center sm:gap-3">
              <span>stratafinancialplanning.com</span>
              <span
                aria-hidden
                className="hidden h-3 w-px bg-st-line sm:block"
              />
              <a
                href={`mailto:${SITE.email}`}
                className="text-st-accent underline decoration-st-accent/40 underline-offset-4"
              >
                {SITE.email}
              </a>
            </div>
          </footer>
        </article>
      </Container>
    </Section>
  );
}
