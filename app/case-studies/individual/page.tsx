import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/animation/reveal";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyCta } from "@/components/case-studies/case-study-cta";
import { ThinkingStep } from "@/components/case-studies/thinking-step";
import { ProseLink, GlossaryLink } from "@/components/case-studies/prose-link";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies/individual" },
  title: "Case study: a new job and some debt",
  description:
    "An illustrative walkthrough of how a made-up person might reason through a new paycheck and a couple of credit card balances. Education, not advice.",
};

/* ------------------------------------------------------------------ */
/*  Trade-offs (illustrative, framed as choices to weigh, not picks)  */
/* ------------------------------------------------------------------ */

interface TradeOff {
  title: string;
  left: string;
  right: string;
}

const TRADE_OFFS: readonly TradeOff[] = [
  {
    title: "Clear the debt faster, or build a starter cushion first",
    left: "Every extra dollar at the cards cuts the interest they charge.",
    right:
      "A small cushion keeps the next surprise from landing straight back on a card.",
  },
  {
    title: "Capture the full match, or throw everything at the cards",
    left: "An employer match is pay you only receive if you contribute.",
    right:
      "The cards keep charging interest every month a balance rides along.",
  },
  {
    title: "Highest rate first, or smallest balance first",
    left: "Starting with the highest rate costs the least in total interest.",
    right:
      "Starting with the smallest balance gives a quick win that is easier to keep up.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function IndividualCaseStudyPage() {
  return (
    <>
      <CaseStudyHero
        eyebrow="Case study, an individual"
        title="A first real paycheck and a couple of balances to sort out"
        intro="A made-up new hire, two credit cards, and the questions someone might ask to turn a vague sense of being behind into a picture they can plan around. Follow the thinking, not the numbers."
        name="Sam"
        situation="they just started a first salaried job and are carrying a couple of credit card balances."
      />

      {/* Steps 01 + 02 */}
      <Section tone="surface" container="narrow">
        <div className="space-y-16 lg:space-y-24">
          <ThinkingStep
            step="01"
            label="The first question"
            title="What is actually being asked here?"
          >
            <p>
              The feeling is familiar: a little behind, a little guilty, not
              sure where to start. The useful move is trading that pile of
              feelings for a picture. One way to begin is with two plain
              questions: what actually comes in each month, and what is each
              balance actually costing?
            </p>
            <p>
              The concept that matters at the start is the gap between{" "}
              <GlossaryLink term="Gross Income">gross income</GlossaryLink>, the
              headline salary, and{" "}
              <GlossaryLink term="Net Income">net income</GlossaryLink>, the
              take-home that actually hits the account. A monthly plan runs on
              the take-home number, not the figure on the offer letter.
            </p>
          </ThinkingStep>

          <ThinkingStep
            step="02"
            label="Get it on paper"
            title="What does the whole picture look like on one page?"
          >
            <p>
              One way people make this concrete is to put the take-home pay at
              the top and list each balance underneath with its rate beside it.
              Say take-home is around $3,200 a month, one card holds $2,400 at
              about 24% APR, and another holds $1,100 at about 19% APR, all
              invented for the example.
            </p>
            <p>
              That rate beside each balance is the{" "}
              <GlossaryLink term="APR (Annual Percentage Rate)">
                APR
              </GlossaryLink>
              , and writing it down is what makes the next questions answerable.
              Two balances stop being one anxious blur and become two specific
              numbers, each with its own cost.
            </p>
          </ThinkingStep>
        </div>
      </Section>

      {/* Steps 03 + 04 */}
      <Section container="narrow">
        <div className="space-y-16 lg:space-y-24">
          <ThinkingStep
            step="03"
            label="Count the cost"
            title="What is the debt actually costing each month?"
          >
            <p>
              A rate is abstract until it is a dollar amount. As an
              illustration, the $2,400 card at 24% runs to roughly $48 of
              interest in a single month before a cent of the balance comes
              down. The{" "}
              <ProseLink href="/tools/debt-cost">Single-debt cost</ProseLink>{" "}
              tool turns a rate into that kind of plain number and shows how
              long a balance lingers at a given payment.
            </p>
            <p>
              Paying only the{" "}
              <GlossaryLink term="Minimum Payment">
                minimum payment
              </GlossaryLink>{" "}
              keeps the balance, and its interest, around for a long time. The
              balances also shape a{" "}
              <GlossaryLink term="Credit Score">credit score</GlossaryLink>{" "}
              through{" "}
              <GlossaryLink term="Credit Utilization">
                credit utilization
              </GlossaryLink>
              , how much of each limit is in use, which is another reason the
              numbers are worth looking at directly.
            </p>
          </ThinkingStep>

          <ThinkingStep
            step="04"
            label="Compare the orders"
            title="Which balance gets the extra dollar first?"
          >
            <p>
              Two common payoff orders show up again and again. The{" "}
              <GlossaryLink term="Debt Avalanche">debt avalanche</GlossaryLink>{" "}
              aims the extra payment at the highest rate first, which costs the
              least in total interest. The{" "}
              <GlossaryLink term="Debt Snowball">debt snowball</GlossaryLink>{" "}
              clears the smallest balance first, which gives an early win that
              is easier to stay motivated by.
            </p>
            <p>
              Some people care most about paying the least overall; others know
              they will only keep going if they see a balance disappear soon.
              The{" "}
              <ProseLink href="/tools/debt">Avalanche or snowball</ProseLink>{" "}
              tool lays the two orders side by side and shows what each one
              costs, so the choice is an informed one rather than a guess.
            </p>
          </ThinkingStep>
        </div>
      </Section>

      {/* Steps 05 + 06 */}
      <Section tone="surface" container="narrow">
        <div className="space-y-16 lg:space-y-24">
          <ThinkingStep
            step="05"
            label="Make room for a cushion"
            title="Where does a safety net fit alongside the debt?"
          >
            <p>
              Here is a real tension worth sitting with: every dollar sent to a
              cushion is a dollar not knocking down interest, yet with no
              cushion at all, the next surprise tends to land right back on a
              card and undo the progress. The concept is an{" "}
              <GlossaryLink term="Emergency Fund">emergency fund</GlossaryLink>,
              and the{" "}
              <ProseLink href="/tools/emergency-fund">
                Emergency fund target
              </ProseLink>{" "}
              tool helps size one.
            </p>
            <p>
              Some people in this spot think about a small starter cushion
              first, then a harder push on the cards once a surprise can no
              longer derail them. One way to think about it is buying a little
              insurance against having to repeat the same work twice.
            </p>
          </ThinkingStep>

          <ThinkingStep
            step="06"
            label="Use what the job adds"
            title="How does the new job change the inputs?"
          >
            <p>
              A first salaried job often brings a retirement plan, and that adds
              options that did not exist before. A{" "}
              <GlossaryLink term="401(k)">401(k)</GlossaryLink> with an{" "}
              <GlossaryLink term="Employer Match">employer match</GlossaryLink>{" "}
              is worth understanding early, because a match is money that only
              shows up if you contribute. That is why some people treat
              capturing at least the match as its own separate question, rather
              than folding it into the debt decision.
            </p>
            <p>
              Pre-tax contributions also lower{" "}
              <GlossaryLink term="Taxable Income">taxable income</GlossaryLink>,
              while a{" "}
              <GlossaryLink term="Roth Account">Roth account</GlossaryLink>{" "}
              trades that break now for tax-free withdrawals later. None of this
              points to where the next dollar has to go. It simply means there
              are more levers on the table than there were last month.
            </p>
          </ThinkingStep>
        </div>
      </Section>

      {/* Trade-offs */}
      <Section container="narrow">
        <ThinkingStep
          step="07"
          label="Weigh the options"
          title="What trade-offs might someone here actually weigh?"
        >
          <p>
            There is no universal correct order for any of this. Naming the
            tensions below, alongside the concept under each one, is what lets a
            person build an order they actually understand and can stick with,
            instead of following a rule they cannot explain.
          </p>
        </ThinkingStep>

        <div className="mt-12 grid gap-6 lg:gap-8">
          {TRADE_OFFS.map((item, i) => (
            <Reveal key={item.title} variant="up" delay={i * 0.05}>
              <div className="rounded-st-lg border border-st-line bg-st-surface p-7 sm:p-8">
                <h3 className="font-st-display text-st-h3 text-st-ink">
                  {item.title}
                </h3>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-8">
                  <p className="flex gap-3 text-st-body text-st-muted">
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 shrink-0 bg-st-accent"
                    />
                    <span>{item.left}</span>
                  </p>
                  <p className="flex gap-3 text-st-body text-st-muted">
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 shrink-0 bg-st-accent"
                    />
                    <span>{item.right}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CaseStudyCta headline="A balance feels heavier as a vague worry than it does as a number with a rate and a plan sitting next to it." />
    </>
  );
}
