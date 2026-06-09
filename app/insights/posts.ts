/**
 * Insights posts — typed, in-repo content. Each post is plain structured
 * text (paragraphs + subheads) so the pages can render it with the site's
 * existing typography, without a markdown pipeline.
 */

/**
 * A run of inline content inside a paragraph: a plain string, or a prose link
 * (rendered with the site's gold-underline ProseLink). Lets a paragraph carry
 * an inline link to a tool or glossary page without a markdown pipeline.
 */
export type Inline = string | { text: string; href: string };

export type PostBlock =
  | { type: "p"; text: string | Inline[] }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

/** Flatten a block to plain text, for word counts and meta. */
function blockText(block: PostBlock): string {
  const { text } = block;
  if (typeof text === "string") return text;
  return text
    .map((span) => (typeof span === "string" ? span : span.text))
    .join("");
}

/** An interactive tool embedded near the end of an article body. */
export type PostTool = "buffer" | "debt";

export interface Post {
  slug: string;
  title: string;
  /** One-line summary for the grid card and meta description. */
  excerpt: string;
  /** Publication date, ISO format (YYYY-MM-DD). */
  date: string;
  body: PostBlock[];
  /** When set, the matching calculator renders inline near the body's end. */
  tool?: PostTool;
}

const WORDS_PER_MINUTE = 200;

/** Reading time computed from the actual body word count. */
export function readingTime(post: Post): string {
  const words = post.body.reduce(
    (count, block) =>
      count + blockText(block).split(/\s+/).filter(Boolean).length,
    0,
  );
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

/** "2026-06-07" -> "June 7, 2026". No Date object: avoids UTC/local drift. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export const POSTS: Post[] = [
  {
    slug: "what-an-interest-rate-actually-costs-you",
    title: "What an interest rate actually costs you",
    excerpt:
      "A rate is easy to nod at and hard to feel. Turning the percentage back into dollars is how the cost stops being abstract.",
    date: "2026-06-08",
    body: [
      {
        type: "p",
        text: "A rate is easy to nod at and hard to feel. “Twenty-two percent” sounds like a number on a statement, not like money leaving your pocket. So it helps to turn the percentage back into dollars, because that is the form the cost actually arrives in.",
      },
      {
        type: "p",
        text: "Say you carry $3,000 on a card at 22 percent and pay only the minimum. Most of that first payment does not touch what you borrowed. It goes to interest, the fee for keeping the balance another month. The principal, the actual $3,000, barely moves. The next month, interest is charged again on a balance that is almost as big as it was before. That is the part that catches people: you can make a payment every month, on time, and watch the balance sit nearly still. You are paying to stand in place.",
      },
      {
        type: "p",
        text: "The longer a balance lives, the more this compounds against you. A debt you stretch over years can quietly cost you a large share of the original amount again, just in interest, before it is gone. The same logic runs in reverse on the saving side, where time works for you instead of against you. On debt, time is the thing charging rent.",
      },
      {
        type: "p",
        text: "Two numbers change the story more than anything else: the rate, and how long you carry the balance. A lower rate slows the meter. A shorter payoff window shuts it off sooner. You do not need a formula to use this. You need to know that every extra month is another month of rent on money you already spent, and that paying anything above the minimum goes after the balance itself, which is the only thing that actually ends the cycle.",
      },
      {
        type: "p",
        text: [
          "If you want to see this in real numbers for a debt you are carrying, the ",
          { text: "single-debt cost tool", href: "/tools/debt-cost" },
          " shows what one balance costs you over time and how long it takes to clear. Seeing your own figure tends to land harder than any example.",
        ],
      },
      {
        type: "p",
        text: "None of this is a verdict on your situation. It is just the mechanism, laid out plainly, so the number on the statement stops being abstract.",
      },
    ],
  },
  {
    slug: "emergency-fund-how-big-and-why",
    title: "Emergency fund: how big, and why",
    excerpt:
      "“Three to six months” answers a question you have not asked yet. Start with what you are actually protecting against, and the size follows.",
    date: "2026-06-06",
    body: [
      {
        type: "p",
        text: "Most advice about emergency funds skips the only question that matters to the person asking: how much is enough? “Three to six months of expenses” gets repeated so often it has stopped meaning anything. It is a fine starting point, but it is an answer to a question you have not asked yet, which is what you are actually protecting against.",
      },
      {
        type: "p",
        text: "An emergency fund is not a savings goal in the usual sense. It is insurance you pay yourself. Its job is narrow: to keep one bad event, a lost job, a broken-down car, a medical bill, a slow month, from turning into a cascade where you borrow at a high rate, miss other payments, and dig a hole that takes far longer to climb out of than the original problem deserved. The fund exists to absorb the shock so the rest of your finances keep standing.",
      },
      {
        type: "p",
        text: "That reframing answers the size question better than any rule of thumb. The right number depends on how exposed you are and how fast money would stop. Someone with steady pay, low fixed costs, and other people who could help is exposed to less than someone with irregular income, a mortgage, dependents, and no backstop. A one-income household needs a deeper cushion than a two-income one, because there is no second paycheck to lean on while the first is rebuilt. The more uneven your income or the higher your fixed costs, the more months you want sitting in reserve.",
      },
      {
        type: "p",
        text: "The other half of the picture is where it lives. An emergency fund only works if you can reach it the day you need it, without selling something at a loss or waiting days for a transfer. That usually points toward something boring and liquid rather than anything invested for growth. The point of this money is not to earn; it is to be there.",
      },
      {
        type: "p",
        text: [
          "The hardest part is rarely the logic. It is starting when the full target feels impossibly far off. A first cushion, even a small one, changes your options the next time something goes wrong, and you build toward the larger number from there. If you want a figure to aim at based on your own costs, the ",
          { text: "emergency fund tool", href: "/tools/emergency-fund" },
          " sizes a target and shows how long it would take to build at a pace you set.",
        ],
      },
      {
        type: "p",
        text: "This is the reasoning, not a recommendation for your situation. What counts as enough is yours to decide, and the honest answer is that it depends on what you are protecting.",
      },
    ],
  },
  {
    slug: "reading-your-own-cash-flow",
    title: "Reading your own cash flow",
    excerpt:
      "Your bank balance tells you where you stand today. It doesn’t tell you why. Here’s how to read the story underneath it.",
    date: "2026-06-07",
    body: [
      {
        type: "p",
        text: "A bank balance is a snapshot. It tells you where you stand at this exact moment, and nothing else. Plenty of businesses look fine on a Tuesday and are in real trouble by the end of the month, and the balance never warned them.",
      },
      {
        type: "p",
        text: "Cash flow is the story underneath the snapshot. It comes down to two questions: what came in this month, and what went out. Owners hear “cash flow” and picture spreadsheets and accounting software, but you can get most of the value with a bank statement and twenty minutes.",
      },
      { type: "h2", text: "The twenty-minute version" },
      {
        type: "p",
        text: "Pull your last three months of statements. For each month, write down two numbers: total deposits and total withdrawals. Subtract. Now you have three monthly numbers that tell you whether the business added cash, burned cash, or roughly broke even. Most owners have never seen these three numbers written down, and they’re almost always surprised by at least one of them.",
      },
      {
        type: "p",
        text: "Surprised how? A landscaper might find that May looked great because customers prepaid for June work. The May balance was real money, but it was June’s money. Spend it in May and June gets tight, and it feels like bad luck instead of what it actually was: timing.",
      },
      { type: "h2", text: "Timing is most of the story" },
      {
        type: "p",
        text: "That’s the single biggest thing the balance hides. Money in and money out almost never line up. You pay for materials in week one and get paid for the job in week six. Rent leaves on the 1st whether or not your biggest customer pays on the 30th like they promised.",
      },
      {
        type: "p",
        text: "So when you look at your three monthly numbers, ask where the lumps are. Which deposits are for work you haven’t done yet? Which bills land all at once, like insurance, taxes, or that annual software renewal? A month that “felt slow” sometimes just had a quarterly bill in it. A month that felt great sometimes borrowed from the next one.",
      },
      {
        type: "p",
        text: "Once you see the pattern, decisions get easier. You stop reading a fat balance as permission to spend, and start asking whose money it is: yours, or next month’s.",
      },
      { type: "h2", text: "Keep it small" },
      {
        type: "p",
        text: "You don’t need to categorize every transaction or buy anything. Three numbers a month, on paper, kept somewhere you’ll see them. Do it for a few months and you’ll start predicting your own tight spots before they arrive, which is most of what financial planning actually is.",
      },
      {
        type: "p",
        text: "If you’d like a second pair of eyes on those numbers, that’s exactly the kind of thing Strata does. It’s free, and there’s nothing to sign up for. Reach out and we’ll look together.",
      },
    ],
  },
  {
    slug: "planning-for-the-slow-season",
    title: "Planning for the slow season before it arrives",
    excerpt:
      "If your business has a slow season, you already know when it starts. Here’s how to build the buffer that gets you through it.",
    date: "2026-06-07",
    body: [
      {
        type: "p",
        text: "Every seasonal business owner knows when the slow months are. Ask a landscaper, a tax preparer, a shop near a college campus. They’ll tell you the dates. And yet the slow season still manages to arrive like a surprise, because knowing it’s coming and being ready for it are different things.",
      },
      {
        type: "p",
        text: "Being ready is mostly one number and one habit.",
      },
      { type: "h2", text: "The number: your bare-minimum month" },
      {
        type: "p",
        text: "Add up what it costs to keep the doors open in a month where nothing good happens. Rent, insurance, loan payments, utilities, the payroll you’d keep no matter what, your own minimum draw. Not the average month. The stripped-down one.",
      },
      {
        type: "p",
        text: "Say that’s $9,000. If your slow season runs three months and you typically bring in about $4,000 a month during it, the gap is $5,000 a month, or $15,000 for the season. That’s your buffer target. Not a vague “we should save more,” but an actual figure with your business’s name on it.",
      },
      {
        type: "p",
        text: "Most owners have never run this calculation, and it takes about fifteen minutes. The number is usually smaller than the dread. Dread doesn’t have a denominator.",
      },
      { type: "h2", text: "The habit: pay the buffer like a bill" },
      {
        type: "p",
        text: "A buffer you build “when there’s extra” doesn’t get built. There’s never extra. The fix is to treat the buffer like a creditor during your busy months: a fixed transfer, on a schedule, into a separate account.",
      },
      {
        type: "p",
        text: "Separate matters. Money sitting in your operating account looks spendable, and eventually it gets spent. A second account at the same bank is fine. The point is the small bit of friction, and the clean mental line: that money already has a job.",
      },
      {
        type: "p",
        text: "If your busy season runs six months and the target is $15,000, that’s $2,500 a month, or about $577 a week. Weekly works better for a lot of owners. The amounts feel survivable, and one bad week only costs you a small slice of the plan.",
      },
      { type: "h2", text: "Two things that make it easier" },
      {
        type: "p",
        text: "First, move your annual expenses out of the slow months where you can. Insurance renewals and software contracts often land wherever they happened to be first signed. A renewal date is usually negotiable. People just don’t ask.",
      },
      {
        type: "p",
        text: "Second, if you can already see that this year’s buffer won’t be enough, talk to your landlord or suppliers now, while you’re current and the conversation is easy. “Can we do reduced rent in January and make it up in April” lands very differently in October than it does in February.",
      },
      {
        type: "p",
        text: "None of this is complicated. It’s just easier to skip than to do, especially mid-season when cash feels fine and the slow months feel far away. That’s exactly when the work matters.",
      },
      {
        type: "p",
        text: "If you want help finding your own bare-minimum number, reach out. It’s free, it takes one conversation, and you’ll leave with an actual figure instead of the dread.",
      },
    ],
    tool: "buffer",
  },
  {
    slug: "where-your-money-actually-goes",
    title: "Where your money actually goes",
    excerpt:
      "You don’t need a budget system. You need one honest hour with last month’s statement.",
    date: "2026-06-07",
    body: [
      {
        type: "p",
        text: "Most budgeting advice asks you to predict the future. Set limits, assign categories, plan the month before it happens. That works for some people. For most, the system collapses within a few weeks and takes a chunk of self-respect down with it.",
      },
      {
        type: "p",
        text: "There’s a simpler exercise that doesn’t ask you to change anything, predict anything, or promise anything. You just look backward, once, honestly.",
      },
      { type: "h2", text: "One statement, one hour" },
      {
        type: "p",
        text: "Take last month’s bank and card statements. Go line by line, and sort each charge into a handful of piles. Not thirty categories. Something like: housing, food, transport, subscriptions, debt payments, and everything else. Pen and paper is fine. A blank spreadsheet is fine.",
      },
      {
        type: "p",
        text: "Two rules. First, no judging while you sort. You’re an accountant right now, not a critic, and if you stop to feel bad about each line you won’t finish. Finishing is the whole game. Second, actually total the piles. The totals are the product.",
      },
      { type: "h2", text: "What people find" },
      {
        type: "p",
        text: "Nearly everyone is wrong about at least one pile, usually by a lot. The classic is food, where the grocery number people carry in their heads ignores every delivery order and gas-station stop. The other is subscriptions. Ten dollars here, eight there, a free trial from March that quietly converted. That pile can come out over $200 a month for someone who would have guessed $60.",
      },
      {
        type: "p",
        text: "The gap between what you’d have guessed and what’s on the paper is the most useful financial information you can get for free. It tells you where your attention hasn’t been.",
      },
      { type: "h2", text: "Then change one thing" },
      {
        type: "p",
        text: "This is where most plans overreach. The statement shows you five problems, you resolve to fix all five, and by the 20th of the month the whole project is abandoned.",
      },
      {
        type: "p",
        text: "Pick one pile. The one with the biggest gap between guess and reality, or just the one that annoyed you most. Make one change to it: cancel the subscriptions you forgot existed, or set a single number for delivery orders. Leave everything else alone. Next month, run the hour again and watch that one pile.",
      },
      {
        type: "p",
        text: "That’s the entire system. No app, no envelopes, no guilt about small pleasures. An honest look backward beats an ambitious plan forward, mostly because you’ll actually repeat it.",
      },
      {
        type: "p",
        text: "And if you’d rather not do that hour alone, that’s a normal thing to want. Sitting with someone while they go through a statement, without judgment, is a lot of what I do at Strata. It’s free. Reach out if it would help.",
      },
    ],
  },
  {
    slug: "the-order-to-pay-off-debt",
    title: "The order to pay off debt",
    excerpt:
      "Avalanche saves more money. Snowball keeps more people going. The math and the psychology, plainly.",
    date: "2026-06-07",
    body: [
      {
        type: "p",
        text: "If you have several debts and some money left over each month, the question is what order to pay them in. There are two standard answers, and people argue about them with surprising heat. Both work. They’re just optimizing for different things.",
      },
      {
        type: "p",
        text: "First, the part both methods agree on: make the minimum payment on everything, every month, no matter what. The ordering question is only about where the extra goes.",
      },
      { type: "h2", text: "Avalanche: highest interest rate first" },
      {
        type: "p",
        text: "Point every spare dollar at the debt with the highest rate, and when it’s gone, move to the next highest. This is the mathematically correct answer. Interest is the price you pay to hold a debt, and the highest rate is the most expensive debt to keep, so you evict it first.",
      },
      {
        type: "p",
        text: "Say you have three debts: a $3,000 credit card at 24%, a $1,500 store card at 18%, and an $8,000 car loan at 7%. The avalanche order is exactly that. The credit card costs about $60 a month in interest just to exist. The car loan, despite being far bigger, costs about $47. Killing the 24% first means every month afterward you bleed less, and over the full payoff the savings can run to hundreds of dollars.",
      },
      { type: "h2", text: "Snowball: smallest balance first" },
      {
        type: "p",
        text: "Point every spare dollar at the smallest debt, regardless of rate. In the example above, you’d hit the $1,500 store card first, even at 18%.",
      },
      {
        type: "p",
        text: "The case for it is human rather than mathematical. With the snowball you get a win fast. One account closed, one bill gone, one less thing in your head. Then your payments concentrate on the next one and the wins keep coming. Researchers who study this find that people who clear small accounts early are more likely to stick with a payoff plan, and a plan you stick with beats a plan you abandon by any amount of interest.",
      },
      { type: "h2", text: "So which one?" },
      {
        type: "p",
        text: "Run both orders on your own debts and look at the difference in total interest. Sometimes it’s large, and the avalanche earns its keep. Often it’s smaller than you’d expect, a few hundred dollars over a couple of years, and then the honest question is about you, not the spreadsheet. If you’ve started debt payoff before and quit, that’s information. Buy the momentum.",
      },
      {
        type: "p",
        text: "There’s also nothing wrong with a hybrid: knock out one tiny balance for the morale, then switch to highest-rate ordering.",
      },
      {
        type: "p",
        text: "One caution. Whatever order you pick, be careful with consolidation offers and balance transfers that promise to simplify everything. Some genuinely help. Some just reset the clock with fees attached. Read the rate that applies after the promotional period, not the rate in the headline.",
      },
      {
        type: "p",
        text: "This is education, not personalized advice, and your situation may have wrinkles a short post can’t see. If you want to sit down and run your numbers both ways, that’s a thing I’m glad to do with you, free, no pitch. Reach out.",
      },
    ],
    tool: "debt",
  },
  {
    slug: "why-good-guidance-is-unevenly-distributed",
    title: "Why good financial guidance is so unevenly distributed",
    excerpt:
      "The people who most need a clear answer about money are the least likely to get one. A note on why, and what one volunteer can do about it.",
    date: "2026-06-07",
    body: [
      {
        type: "p",
        text: "Here is roughly how the financial guidance industry works. Most advisors are paid as a percentage of the money they manage, commonly around 1% a year. One percent of two million dollars is $20,000 a year, every year. One percent of eight thousand dollars is $80. The same hour of work, priced four hundred times apart.",
      },
      {
        type: "p",
        text: "So advisors set minimums. Many won’t take clients below $250,000 or $500,000 in investable assets, and well-known firms are often higher. That isn’t villainy; it’s arithmetic. An advisor with rent and staff can’t spend Tuesday afternoon on a client who generates $80.",
      },
      {
        type: "p",
        text: "The result is a strange inversion. The family with two million dollars, who would be fine under almost any reasonable plan, gets quarterly check-ins and someone who answers the phone. The family running a corner store on thin margins, where one good decision about debt or one bad lease could change everything, gets nobody. Or worse than nobody: whoever is paid on commission to sell them something.",
      },
      {
        type: "p",
        text: "The store owner’s questions usually aren’t even hard. What order do I pay these debts? Can I afford this hire? Why is there never cash in March? A person who knows the basics and has no stake in the answer can resolve most of these in an afternoon. The knowledge isn’t rare. The access is.",
      },
      { type: "h2", text: "“It’s all free online” is true and useless" },
      {
        type: "p",
        text: "Everything you’d want to know about money is on the internet, free. It’s also drowning in contradiction and sales copy. Search any financial question and you’ll get sixty answers, half of them written to sell you the product mentioned in paragraph four. The hard part was never finding information. It’s knowing which of it applies to you, and there’s no search result for that. That takes a person who has looked at your numbers.",
      },
      {
        type: "p",
        text: "People with money get that person by paying. Everyone else gets a search results page and a guess.",
      },
      { type: "h2", text: "Why Strata exists" },
      {
        type: "p",
        text: "I’m a high school student. I should say that plainly, because it’s the first honest thing to know about Strata. I’ve spent years deep in economics and finance, and somewhere along the way it sank in that the most useful thing I could do with any of it isn’t a stock pitch competition. It’s sitting down with a neighbor who has a real question and no one to ask.",
      },
      {
        type: "p",
        text: "Strata is volunteer work. Free, no products, no commissions, no “free consultation” that turns into a pitch, because there is nothing to pitch. I’m not a licensed advisor and I don’t pretend to be one. This is education and planning support, and when a question genuinely needs a licensed professional, I’ll say so and help you find one.",
      },
      {
        type: "p",
        text: "One volunteer doesn’t fix a structural problem, and I won’t claim otherwise. But the gap is made of individual people with individual questions, and any one of those can be closed in an afternoon, for free, by someone who shows up. That part I can do.",
      },
      {
        type: "p",
        text: "If you’re on the wrong side of this gap, reach out. The whole point is that you’re exactly who this is for.",
      },
    ],
  },
];
