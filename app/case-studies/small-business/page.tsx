import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/animation/reveal";
import { CaseStudyHero } from "@/components/case-studies/case-study-hero";
import { CaseStudyCta } from "@/components/case-studies/case-study-cta";
import { ThinkingStep } from "@/components/case-studies/thinking-step";
import { ProseLink, GlossaryLink } from "@/components/case-studies/prose-link";

export const metadata: Metadata = {
  alternates: { canonical: "/case-studies/small-business" },
  title: "Case study: a seasonal small business",
  description:
    "An illustrative walkthrough of how a made-up seasonal business owner might reason through uneven cash flow. Education and a way of thinking, not advice.",
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
    title: "A bigger cushion, or a smaller debt",
    left: "More cash set aside buys a calmer winter and fewer tight nights.",
    right:
      "Putting the same dollars toward a line of credit lowers what interest costs over time.",
  },
  {
    title: "Steady owner pay, or peak-season pay",
    left: "A level draw across the year is easier to budget for at home.",
    right:
      "Taking more in the busy months leaves more in the business when work is scarce.",
  },
  {
    title: "Save hard in summer, or invest in growth",
    left: "Banking the busy-season surplus is safety you can see.",
    right:
      "Spending it on a hire or equipment is a bet that next year brings in more.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function SmallBusinessCaseStudyPage() {
  return (
    <>
      <CaseStudyHero
        eyebrow="Case study, small business"
        title="Reading a seasonal business through one uneven year"
        intro="A made-up landscaper, a feast-and-famine calendar, and the questions someone might ask to make a slow winter feel less like a cliff. Follow the thinking, not the numbers."
        name="Dana"
        situation="they run a small seasonal landscaping business that is busy through spring and summer and very quiet in winter."
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
              The feeling is easy to name: winter is scary. The useful move is
              turning that dread into a question you can actually look at.
              Instead of &ldquo;will we be okay,&rdquo; one way to start is
              &ldquo;will the money coming in during the slow months cover the
              costs that show up no matter what.&rdquo;
            </p>
            <p>
              The relevant concept here is{" "}
              <GlossaryLink term="Cash Flow">cash flow</GlossaryLink>, the
              timing of money moving in and out. It is a different thing from
              whether the business turns a profit over a full year. A business
              can be profitable across twelve months and still have a couple of
              months where the account runs uncomfortably thin.
            </p>
          </ThinkingStep>

          <ThinkingStep
            step="02"
            label="Get it on paper"
            title="What does the shape of the year look like?"
          >
            <p>
              One way people make a seasonal year concrete is to write down each
              month&rsquo;s expected money in, so the dips are visible instead
              of vague. Say the busy months bring in around $9,000 and the slow
              months around $2,000, purely as illustrative figures. Seeing the
              gap written out is usually less frightening than carrying it
              around as a worry.
            </p>
            <p>
              It also helps to keep{" "}
              <GlossaryLink term="Revenue">revenue</GlossaryLink>, the money
              coming in, separate from profit, what is left after costs. A
              strong headline number for the year does not promise that every
              month pays for itself, which is exactly why the slow stretch
              deserves its own look.
            </p>
          </ThinkingStep>
        </div>
      </Section>

      {/* Steps 03 + 04 */}
      <Section container="narrow">
        <div className="space-y-16 lg:space-y-24">
          <ThinkingStep
            step="03"
            label="Sort the costs"
            title="Which costs hold steady no matter the season?"
          >
            <p>
              Some costs rise and fall with the work, like fuel and seasonal
              help. Those are{" "}
              <GlossaryLink term="Variable Expense">
                variable expenses
              </GlossaryLink>
              . Others arrive every month regardless of how many lawns get
              mowed: insurance, a truck payment, software. Those are{" "}
              <GlossaryLink term="Fixed Expense">fixed expenses</GlossaryLink>,
              part of the business&rsquo;s{" "}
              <GlossaryLink term="Overhead">overhead</GlossaryLink>.
            </p>
            <p>
              Say the fixed costs land around $3,500 a month, just as an
              example. That reframes the slow season into a sharp, answerable
              question: in a $2,000 month, what covers the gap up to $3,500? The
              number that has to be filled is suddenly specific instead of
              looming.
            </p>
          </ThinkingStep>

          <ThinkingStep
            step="04"
            label="Measure the cushion"
            title="How long would today's cash actually last?"
          >
            <p>
              The concept that fits here is{" "}
              <GlossaryLink term="Runway">runway</GlossaryLink>: how many months
              the cash on hand would cover the shortfall if income paused. The{" "}
              <ProseLink href="/tools/runway">Cash runway</ProseLink> tool is
              built for exactly this kind of estimate.
            </p>
            <p>
              As an illustration, if there is around $7,000 set aside and each
              slow month leaves a gap of roughly $1,500, that cushion stretches
              across several lean months. The value is not the exact figure, it
              is the shift: &ldquo;winter is scary&rdquo; becomes &ldquo;the
              cushion covers about four slow months,&rdquo; which is something a
              person can plan around.
            </p>
          </ThinkingStep>
        </div>
      </Section>

      {/* Steps 05 + 06 */}
      <Section tone="surface" container="narrow">
        <div className="space-y-16 lg:space-y-24">
          <ThinkingStep
            step="05"
            label="Size the buffer"
            title="How big should the slow-season cushion be?"
          >
            <p>
              The money a business keeps on hand to cover its day-to-day costs
              is its{" "}
              <GlossaryLink term="Working Capital">
                working capital
              </GlossaryLink>
              . The{" "}
              <ProseLink href="/tools/buffer">Slow-season buffer</ProseLink>{" "}
              tool frames the question directly: across the quiet stretch, how
              much does the business need on hand so the steady costs stay
              covered until the busy season refills the account?
            </p>
            <p>
              Some owners in this spot think about setting aside a slice of
              every busy-month dollar, so the cushion is built quietly through
              summer rather than scrambled together in December. One way to
              think about it is paying the winter version of the business in
              advance, while the work is there to pay it with.
            </p>
          </ThinkingStep>

          <ThinkingStep
            step="06"
            label="Check the pricing"
            title="Is the work even priced to carry the whole year?"
          >
            <p>
              A slow season is partly a timing question and partly a pricing
              one. If the busy months have to fund the quiet ones, the margin in
              peak season has to be wide enough to stretch. The concepts in play
              are <GlossaryLink term="Gross Profit">gross profit</GlossaryLink>,{" "}
              <GlossaryLink term="Profit Margin">profit margin</GlossaryLink>,
              and the{" "}
              <GlossaryLink term="Break-Even Point">
                break-even point
              </GlossaryLink>
              .
            </p>
            <p>
              The{" "}
              <ProseLink href="/tools/breakeven">
                Breakeven calculator
              </ProseLink>{" "}
              shows how much work just keeps the lights on before a dollar is
              left over to save, and the{" "}
              <ProseLink href="/tools/pricing">
                Pricing and margin checker
              </ProseLink>{" "}
              helps test whether a price leaves room to build the cushion at
              all. One way to read the result: a thin peak-season margin and a
              long winter are a hard combination, and that is worth knowing
              before the winter arrives.
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
            None of the choices below has a single right answer. The point of
            naming them, alongside the concept underneath each one, is that the
            decision becomes yours to reason about instead of something that
            just happens to the business.
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

      <CaseStudyCta headline="A slow season feels different once it is a number on a page instead of a worry in the back of your head." />
    </>
  );
}
