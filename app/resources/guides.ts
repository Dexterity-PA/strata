/**
 * Resource guides: typed, in-repo educational content. Each guide is plain
 * structured text (paragraphs, subheads, and lists) so the pages render it
 * with the site's existing typography, without a markdown pipeline.
 *
 * This is learning material. It is general financial education, not
 * personalized financial guidance. Copy must always frame Strata as a free
 * educational and planning-support volunteer effort, never as a regulated
 * service.
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

/** Broad subject area, shown as a small label on cards and article headers. */
export type GuideCategory = "Budgeting" | "Saving" | "Credit" | "Foundations";

export interface Guide {
  slug: string;
  title: string;
  /** One-line summary for the grid card and meta description. */
  excerpt: string;
  category: GuideCategory;
  /** Plain-language bullets shown in a "What you'll learn" panel up top. */
  takeaways: string[];
  /** Last reviewed date, ISO format (YYYY-MM-DD). */
  updated: string;
  body: GuideBlock[];
}

const WORDS_PER_MINUTE = 200;

/** Reading time computed from the actual body word count. */
export function readingTime(guide: Guide): string {
  const words = guide.body.reduce((count, block) => {
    if (block.type === "list") {
      return (
        count +
        block.items.reduce(
          (n, item) => n + item.split(/\s+/).filter(Boolean).length,
          0,
        )
      );
    }
    return count + block.text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-06-08" -> "June 8, 2026". No Date object: avoids UTC/local drift. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

/** Other guides in the same category, for the "Related guides" block. */
export function relatedGuides(guide: Guide, limit = 2): Guide[] {
  const sameCategory = GUIDES.filter(
    (g) => g.slug !== guide.slug && g.category === guide.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = GUIDES.filter(
    (g) => g.slug !== guide.slug && g.category !== guide.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const GUIDES: Guide[] = [
  {
    slug: "budgeting-basics",
    title: "Budgeting basics: a plan you’ll actually keep",
    excerpt:
      "A budget is just a plan for your money before the month spends it for you. Here’s how to build one that survives contact with real life.",
    category: "Budgeting",
    updated: "2026-06-08",
    takeaways: [
      "What a budget is, in plain terms, and what it is not",
      "A simple way to split your income that you can adjust",
      "How to handle irregular income and one-off expenses",
      "Why a budget you’ll keep beats a perfect one you’ll abandon",
    ],
    body: [
      {
        type: "p",
        text: "A budget has a bad reputation it doesn’t deserve. People hear the word and picture restriction, spreadsheets, and guilt. In reality a budget is just a plan for your money, written down before the month happens instead of discovered afterward. It answers one question: where do you want your money to go, so you’re not left asking where it went.",
      },
      {
        type: "p",
        text: "The goal isn’t a perfect forecast. It’s a rough map you can follow and adjust. A budget that’s close and that you actually use beats an exact one you abandon by the second week.",
      },
      { type: "h2", text: "Start with what comes in" },
      {
        type: "p",
        text: "Write down your reliable monthly income, the money you can count on. If you’re paid a steady salary, this is easy. If your income changes month to month, use a conservative number, something close to your lower months rather than your best ones. Planning around your good months is how budgets break.",
      },
      { type: "h2", text: "Split it into a few buckets" },
      {
        type: "p",
        text: "You don’t need thirty categories. Most people do well with three groups: needs, wants, and savings or debt payoff. One widely shared starting guideline is to aim roughly for half your take-home pay on needs, about a third on wants, and the rest toward savings and paying down debt. Treat that as a starting point, not a rule. Your rent, your city, and your life decide the real split.",
      },
      {
        type: "list",
        items: [
          "Needs: housing, utilities, groceries, transportation, insurance, minimum debt payments. The things that have real consequences if you skip them.",
          "Wants: dining out, subscriptions, hobbies, travel. Not bad, just flexible. This is the bucket you adjust first when money is tight.",
          "Savings and debt payoff: building a cushion, paying down balances faster than the minimum, saving toward a goal.",
        ],
      },
      {
        type: "p",
        text: "The point of the buckets isn’t precision. It’s that you can see, at a glance, whether your spending matches your priorities. Most people find at least one bucket is bigger than they thought.",
      },
      { type: "h2", text: "Plan for the expenses that aren’t monthly" },
      {
        type: "p",
        text: "The budget killer is the expense you forgot because it only shows up once or twice a year: car registration, an insurance renewal, holidays, an annual subscription. These feel like surprises, but they aren’t. Add them up for the year, divide by twelve, and set that amount aside each month. A $600 annual bill is a $50 monthly line you simply haven’t been writing down.",
      },
      { type: "h2", text: "If your income is irregular" },
      {
        type: "p",
        text: "For freelancers, seasonal workers, and small business owners, the trick is to separate earning from spending. In a good month, don’t spend the whole thing. Pay yourself a steady, modest amount that your lower months can support, and let the surplus from strong months cover the lean ones. The budget runs on your paycheck to yourself, not on the raw swings of the business.",
      },
      { type: "h2", text: "Check it, then adjust" },
      {
        type: "p",
        text: "A budget is a living thing. Once a month, compare what you planned to what actually happened. You’ll be wrong somewhere, everyone is, and that’s the useful part. Move the numbers to match reality, not the other way around. After two or three months of small corrections, the plan starts to fit, and following it stops feeling like effort.",
      },
      {
        type: "p",
        text: "If you’d like a second set of eyes while you sketch out your first budget, that’s exactly the kind of thing Strata helps with. It’s free, there’s nothing to sign up for, and the goal is for you to leave understanding your own plan.",
      },
    ],
  },
  {
    slug: "saving-fundamentals",
    title: "Saving fundamentals: building the habit",
    excerpt:
      "Saving is less about willpower and more about setup. A few small structural choices do most of the work for you.",
    category: "Saving",
    updated: "2026-06-08",
    takeaways: [
      "Why automatic saving beats relying on leftover money",
      "How to set a goal that’s specific enough to act on",
      "The difference between saving and investing, in plain terms",
      "How a little time turns small, regular amounts into real money",
    ],
    body: [
      {
        type: "p",
        text: "Most people try to save the same way: spend through the month, then put away whatever is left. The problem is that there’s rarely anything left, because spending expands to fill whatever is in the account. Saving works far better when you flip the order. Decide the amount first, move it out of reach, and let the rest of your spending fit around it.",
      },
      { type: "h2", text: "Pay yourself first, automatically" },
      {
        type: "p",
        text: "The single most effective saving habit is an automatic transfer. On the day you’re paid, a set amount moves into a separate savings account before you have a chance to spend it. You’re not relying on willpower at the end of the month, when willpower is lowest. You’re making the decision once and letting it run.",
      },
      {
        type: "p",
        text: "Keep that money somewhere slightly inconvenient. A separate savings account, ideally one without a card attached, adds just enough friction that you won’t dip into it for an ordinary purchase. The money sitting in your everyday checking account looks spendable, and eventually it gets spent.",
      },
      { type: "h2", text: "Give the money a job" },
      {
        type: "p",
        text: "Saving toward nothing in particular is hard to sustain. Saving for something specific is much easier. Name the goal and put a number and a rough date on it: a $1,500 cushion by spring, a replacement laptop by the holidays, a deposit on an apartment within the year. A goal with a name and a deadline tells you how much to set aside and gives you a reason to keep going.",
      },
      {
        type: "p",
        text: "It helps to start with one small, fast goal before a large, slow one. Reaching a modest target quickly proves the system works and builds the momentum to tackle bigger ones.",
      },
      { type: "h2", text: "Saving versus investing" },
      {
        type: "p",
        text: "These two words get used interchangeably, but they do different jobs. Saving is money you keep safe and can reach quickly, usually in a bank account. Its value won’t grow much, but it also won’t fall, which is exactly what you want for money you might need soon. Investing means putting money into things like stocks or funds, where the value can rise over time but can also drop in the short term. That tradeoff makes investing better suited to money you won’t need for many years.",
      },
      {
        type: "p",
        text: "A simple way to think about it: short-term money and your safety cushion belong in savings, where they’re stable. Long-term money has room to be invested. Where exactly the line falls depends on your situation, and big decisions about investing are worth discussing with a licensed professional.",
      },
      { type: "h2", text: "Time does the heavy lifting" },
      {
        type: "p",
        text: "Small amounts saved regularly add up faster than people expect, because of how interest builds on itself over time. Money you set aside earns a little, and then that growth earns a little too. The earlier and more consistently you start, the more this effect works in your favor. You don’t need a large amount to begin. You need a small amount and the consistency to keep going.",
      },
      {
        type: "p",
        text: "If you want help picking a realistic amount to automate, or sorting which money should stay liquid, reach out to Strata. It’s free, and the aim is to leave you with a plan you understand and can run yourself.",
      },
    ],
  },
  {
    slug: "emergency-funds",
    title: "Emergency funds: your first safety net",
    excerpt:
      "An emergency fund is the buffer between an unexpected expense and a debt spiral. Here’s how much to aim for and how to get there.",
    category: "Saving",
    updated: "2026-06-08",
    takeaways: [
      "What counts as a real emergency, and what doesn’t",
      "A sensible target, and a smaller first milestone to start with",
      "Where to keep the money so it’s safe but reachable",
      "How to rebuild it after you’ve had to use it",
    ],
    body: [
      {
        type: "p",
        text: "An emergency fund is money set aside for the things you can’t plan but can be almost certain will eventually happen: a car repair, a medical bill, a sudden gap in income. Its job is to absorb a shock so that one bad week doesn’t become a credit card balance that follows you for years. For most people, it’s the first financial cushion worth building, before paying extra on low-rate debt or investing.",
      },
      { type: "h2", text: "What an emergency actually is" },
      {
        type: "p",
        text: "An emergency is unexpected, necessary, and urgent. A broken furnace in winter qualifies. A sale on something you wanted does not. Holding that line is what keeps the fund there when you genuinely need it. It helps to keep this money clearly separate from your everyday accounts and your other savings goals, so it doesn’t quietly get spent on near-emergencies that are really just wants in a hurry.",
      },
      { type: "h2", text: "How much to aim for" },
      {
        type: "p",
        text: "A commonly cited target is three to six months of essential expenses. Essential means the stripped-down version: housing, utilities, food, insurance, minimum debt payments, the basics that keep going no matter what. Not your average month with its dinners out and travel. The right number within that range depends on how steady your income is. Someone with one reliable salary might lean toward three months. Someone with variable or seasonal income, or who supports a family on a single income, leans toward six or more.",
      },
      { type: "h2", text: "Start smaller than that" },
      {
        type: "p",
        text: "Three to six months can feel impossible when you’re starting from zero, and an impossible goal is a discouraging one. So set a first milestone that feels reachable: a starter fund of, say, $500 or $1,000. That amount alone covers a large share of the everyday emergencies that would otherwise go on a credit card. Hit the small target first, feel the relief of having it, then keep building toward the larger one.",
      },
      { type: "h2", text: "Where to keep it" },
      {
        type: "p",
        text: "An emergency fund has two requirements that pull in opposite directions. It needs to be safe, so its value doesn’t drop right when you need it, and it needs to be reachable within a day or two. That points to a plain savings account, kept separate from your checking. It should not be invested in the stock market, where it could be down exactly when an emergency strikes, and it shouldn’t be so locked away that you can’t get to it in time.",
      },
      { type: "h2", text: "Rebuild it after you use it" },
      {
        type: "p",
        text: "Using your emergency fund isn’t a failure. It’s the fund doing precisely what it was for. The only step that matters afterward is to start refilling it, the same way you built it the first time, with a steady automatic transfer. The fund is a renewable cushion, not a one-time achievement.",
      },
      {
        type: "p",
        text: "If you want help working out your own essential-expenses number, that’s a short, free conversation Strata is glad to have. You’ll leave with an actual figure to aim for instead of a vague sense that you should save more.",
      },
    ],
  },
  {
    slug: "understanding-credit",
    title: "Understanding credit and your credit score",
    excerpt:
      "Credit is just a record of how you’ve handled borrowed money. Knowing how the score is built takes most of the mystery out of it.",
    category: "Credit",
    updated: "2026-06-08",
    takeaways: [
      "What a credit score is and the rough range it falls in",
      "The main factors that move a score up or down",
      "Why on-time payments and low balances matter most",
      "How to check your credit and read your report",
    ],
    body: [
      {
        type: "p",
        text: "Credit is a record of how you’ve borrowed and repaid money over time. A credit score is a number that summarizes that record, used by lenders to estimate how likely you are to repay what you borrow. It influences whether you’re approved for a loan or a card, the interest rate you’re offered, and sometimes things further afield, like a rental application or a deposit on utilities.",
      },
      {
        type: "p",
        text: "The number itself can feel arbitrary, but it isn’t. It’s built from a handful of factors you can understand and influence.",
      },
      { type: "h2", text: "The range, roughly" },
      {
        type: "p",
        text: "The most common credit scores run from about 300 at the low end to about 850 at the top. Higher is better, and the difference between a fair score and a strong one can mean meaningfully lower interest rates over the life of a loan. You don’t need a perfect score to get good terms. Once you’re in the upper range, the gains from squeezing out the last few points are small.",
      },
      { type: "h2", text: "What the score is built from" },
      {
        type: "p",
        text: "Scoring models weigh several things. The exact formulas are proprietary, but the major ingredients are well known and consistent across models:",
      },
      {
        type: "list",
        items: [
          "Payment history: whether you pay on time. This is the single biggest factor. A pattern of on-time payments helps more than almost anything else, and missed payments hurt the most.",
          "Amounts owed: how much of your available credit you’re using, often called utilization. Using a small fraction of your limits looks better than running them near the max.",
          "Length of credit history: how long your accounts have been open. Older accounts generally help, which is why closing your oldest card can backfire.",
          "Credit mix and new credit: having different types of credit, and not opening many new accounts in a short span.",
        ],
      },
      { type: "h2", text: "The two habits that matter most" },
      {
        type: "p",
        text: "If you do nothing else, do these two. First, pay every bill on time, every time. Even one payment that lands thirty days late can leave a mark that lingers. Setting payments to automatic, at least the minimum, is a simple guard against a slip. Second, keep your balances low relative to your limits. Carrying a balance that uses a large share of your available credit weighs on the score, even if you never miss a payment. Paying down what you owe is one of the faster ways to improve the number.",
      },
      { type: "h2", text: "Check your own credit" },
      {
        type: "p",
        text: "You’re entitled to see what’s on your credit report, and checking your own report does not lower your score. It’s worth doing once in a while to catch errors, accounts you don’t recognize, or signs of fraud, all of which are more common than people assume. If you find a mistake, you have the right to dispute it with the credit bureau, and correcting an error can sometimes lift a score on its own.",
      },
      {
        type: "p",
        text: "Building credit is slow and undramatic, which is the honest truth of it. There’s no trick, just consistent habits over time. If you’d like help reading your own report or making a plan to strengthen your credit, reach out to Strata. It’s free, and there’s nothing to sell.",
      },
    ],
  },
  {
    slug: "how-interest-works",
    title: "How interest works: APR, compounding, and the cost of borrowing",
    excerpt:
      "Interest is the price of money over time. Understand it once and a lot of financial decisions get clearer.",
    category: "Foundations",
    updated: "2026-06-08",
    takeaways: [
      "What interest is, from both sides of a loan",
      "What APR means and why it’s the number to compare",
      "How compounding makes balances grow, for better and worse",
      "Why the same rate costs very differently over time",
    ],
    body: [
      {
        type: "p",
        text: "Interest is the price of using money over time. When you borrow, you pay it. When you save or lend, you earn it. Almost every financial product, from a savings account to a mortgage to a credit card, is built on this one idea, so understanding it pays off across the board.",
      },
      { type: "h2", text: "The basic shape" },
      {
        type: "p",
        text: "At its simplest, interest is a percentage of an amount, charged or paid over a period of time. Borrow $1,000 at 10% a year and, roughly speaking, a year of holding that debt costs about $100. Save $1,000 at 4% and a year earns you about $40. The rate and the time are the two levers. A higher rate or a longer time means more interest, in whichever direction it’s flowing.",
      },
      { type: "h2", text: "APR: the number to compare" },
      {
        type: "p",
        text: "When you borrow, the figure to look for is the APR, the annual percentage rate. APR expresses the yearly cost of a loan as a percentage, and for many products it’s designed to fold in certain fees as well as the plain interest. That makes it more useful than a headline rate for comparing two offers, because it’s closer to the true annual cost. When a lender shows you a low monthly rate or a teaser figure, find the APR before you compare. Two loans with similar monthly payments can carry very different APRs once the term and fees are accounted for.",
      },
      { type: "h2", text: "Compounding" },
      {
        type: "p",
        text: "Compounding is interest earning interest. When interest is added to your balance, the next round of interest is calculated on the new, larger balance. Over short periods the effect is minor. Over long periods it becomes the main story.",
      },
      {
        type: "p",
        text: "On savings, compounding works for you: the longer money sits, the more its growth feeds further growth. On debt, the same mechanism works against you. A credit card balance left unpaid is charged interest, that interest is added to what you owe, and next month’s interest is charged on the larger total. This is how a balance can grow even when you’ve stopped spending on the card, and why paying only the minimum can stretch a debt out for years.",
      },
      { type: "h2", text: "Why the same rate costs differently" },
      {
        type: "p",
        text: "Two things change how much a given interest rate actually costs you: how long you carry the balance, and how often the interest compounds. A loan paid off quickly costs far less in total interest than the same loan stretched over a long term, even at an identical rate. This is the reasoning behind paying more than the minimum when you can. Every extra dollar toward the balance is a dollar that stops generating interest.",
      },
      {
        type: "p",
        text: "When you’re weighing a loan or trying to understand what a balance is really costing you, the two questions to ask are simple: what is the APR, and how long will I carry this. If you’d like to walk through the numbers on a specific debt or compare a couple of offers, Strata can sit down and do that with you, free of charge. This is general education, and a borrowing decision specific to your situation may call for a licensed professional.",
      },
    ],
  },
  {
    slug: "banking-basics",
    title: "Banking basics: choosing and using accounts",
    excerpt:
      "Checking, savings, fees, and the fine print. A plain tour of the accounts most people use every day.",
    category: "Foundations",
    updated: "2026-06-08",
    takeaways: [
      "What checking and savings accounts are each for",
      "The common fees to watch for and how to avoid them",
      "What deposit insurance protects and why it matters",
      "Simple habits that keep an account healthy",
    ],
    body: [
      {
        type: "p",
        text: "A bank account is the plumbing under almost everything else in your financial life. It’s where your income lands, where your bills are paid from, and where your savings sit. The accounts themselves aren’t complicated, but the details, especially the fees, are worth knowing so the plumbing works for you instead of quietly costing you.",
      },
      { type: "h2", text: "Checking versus savings" },
      {
        type: "p",
        text: "The two everyday accounts do different jobs. A checking account is for money in motion: receiving your pay, paying bills, swiping a card, withdrawing cash. It’s built for frequent access and usually earns little or no interest. A savings account is for money at rest: your emergency fund and your goals. It’s designed to be dipped into less often and typically earns more interest than checking, though how much varies widely between banks.",
      },
      {
        type: "p",
        text: "A common, effective setup is to use both together. Your paycheck arrives in checking, your bills are paid from it, and an automatic transfer moves a set amount into savings each payday. The separation keeps your saved money out of sight and out of the path of everyday spending.",
      },
      { type: "h2", text: "Watch the fees" },
      {
        type: "p",
        text: "Fees are where ordinary accounts quietly leak money. The common ones are worth recognizing so you can avoid or eliminate them:",
      },
      {
        type: "list",
        items: [
          "Monthly maintenance fees: a flat charge just for holding the account. Many banks waive these if you keep a minimum balance or set up direct deposit, and plenty of accounts charge none at all.",
          "Overdraft fees: charged when you spend more than your balance. These can be steep. You can often turn off overdraft coverage so a transaction is simply declined instead.",
          "ATM fees: charged for using an out-of-network machine, sometimes by both your bank and the ATM owner. Sticking to in-network ATMs avoids them.",
          "Minimum balance fees: charged when your balance drops below a set floor.",
        ],
      },
      {
        type: "p",
        text: "None of these are unavoidable. If an account is charging you fees you can’t easily escape, that’s a sign to ask the bank about other account options or to compare what else is available. Fee-free checking and savings accounts are common.",
      },
      { type: "h2", text: "Deposit insurance" },
      {
        type: "p",
        text: "Money held in a deposit account at an insured bank or credit union is protected by government-backed deposit insurance, up to a legal limit per depositor, per institution. In practice that means if the institution itself were to fail, your insured deposits would be safe up to that limit. It’s a quiet but important reason a savings account is the right home for money you can’t afford to lose, like your emergency fund. If you’re ever unsure whether an institution is insured, you can confirm it before opening an account.",
      },
      { type: "h2", text: "Habits that keep an account healthy" },
      {
        type: "list",
        items: [
          "Keep a small buffer in checking so a forgotten charge doesn’t trigger an overdraft.",
          "Check your account regularly, even briefly, to catch errors and unfamiliar charges early.",
          "Automate the bills and the transfers you can, so nothing depends on remembering.",
          "Review your fees once a year, and switch accounts if you’re paying for things you don’t need to.",
        ],
      },
      {
        type: "p",
        text: "If you’d like help comparing account options or untangling fees you’re not sure about, that’s a normal thing to bring to Strata. It’s free, there’s no product behind it, and the goal is for you to understand your own setup.",
      },
    ],
  },
];
