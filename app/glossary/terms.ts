/**
 * Glossary content: plain-language definitions of common personal and
 * small-business finance terms. Educational and neutral, written to be read
 * by someone seeing the word for the first time. This is reference material,
 * not financial advice or a recommendation.
 *
 * Each entry is { term, definition, category }. Keep definitions short,
 * jargon-free, and free of long dashes (use commas, colons, or periods).
 */

export type GlossaryCategory =
  | "Budgeting & Cash Flow"
  | "Saving & Investing"
  | "Credit & Debt"
  | "Taxes"
  | "Retirement"
  | "Insurance"
  | "Small Business";

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: GlossaryCategory;
}

/** Display order for the category filter. */
export const GLOSSARY_CATEGORIES: readonly GlossaryCategory[] = [
  "Budgeting & Cash Flow",
  "Saving & Investing",
  "Credit & Debt",
  "Taxes",
  "Retirement",
  "Insurance",
  "Small Business",
];

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  // Budgeting & Cash Flow
  {
    term: "Budget",
    definition:
      "A plan for the money you expect to come in and go out over a set period, usually a month. It helps you decide where your money goes before it is spent.",
    category: "Budgeting & Cash Flow",
  },
  {
    term: "Cash Flow",
    definition:
      "The movement of money into and out of your accounts over time. Positive cash flow means more is coming in than going out.",
    category: "Budgeting & Cash Flow",
  },
  {
    term: "Gross Income",
    definition:
      "Your total earnings before any taxes or deductions are taken out.",
    category: "Budgeting & Cash Flow",
  },
  {
    term: "Net Income",
    definition:
      "The money you actually keep after taxes and deductions are removed. This is often called take-home pay.",
    category: "Budgeting & Cash Flow",
  },
  {
    term: "Fixed Expense",
    definition:
      "A cost that stays about the same each month, such as rent or a loan payment. It is easy to plan around because it rarely changes.",
    category: "Budgeting & Cash Flow",
  },
  {
    term: "Variable Expense",
    definition:
      "A cost that changes from month to month, such as groceries, fuel, or utility bills.",
    category: "Budgeting & Cash Flow",
  },
  {
    term: "Emergency Fund",
    definition:
      "Money set aside to cover unexpected costs, such as a car repair, a medical bill, or a gap in income.",
    category: "Budgeting & Cash Flow",
  },

  // Saving & Investing
  {
    term: "Principal",
    definition:
      "The original amount of money you save, invest, or borrow, before any interest is added.",
    category: "Saving & Investing",
  },
  {
    term: "Interest Rate",
    definition:
      "The percentage charged on money you borrow, or paid on money you save, usually measured over a year.",
    category: "Saving & Investing",
  },
  {
    term: "Compound Interest",
    definition:
      "Interest earned on both your original money and on the interest already added to it, so the balance grows faster over time.",
    category: "Saving & Investing",
  },
  {
    term: "APY (Annual Percentage Yield)",
    definition:
      "The real rate of return on savings over one year, including the effect of compounding. It lets you compare savings accounts fairly.",
    category: "Saving & Investing",
  },
  {
    term: "Liquidity",
    definition:
      "How quickly something can be turned into cash without losing much value. A checking account is very liquid; a house is not.",
    category: "Saving & Investing",
  },
  {
    term: "Asset",
    definition:
      "Something you own that has value, such as cash, a car, a home, or an investment.",
    category: "Saving & Investing",
  },
  {
    term: "Liability",
    definition:
      "Something you owe, such as a loan, a credit card balance, or an unpaid bill.",
    category: "Saving & Investing",
  },
  {
    term: "Net Worth",
    definition:
      "What you own minus what you owe. It is a simple snapshot of where your finances stand at a moment in time.",
    category: "Saving & Investing",
  },
  {
    term: "Inflation",
    definition:
      "The gradual rise in prices over time, which means the same amount of money buys a little less than it used to.",
    category: "Saving & Investing",
  },

  // Credit & Debt
  {
    term: "APR (Annual Percentage Rate)",
    definition:
      "The yearly cost of borrowing, including interest and certain fees, shown as a single percentage so loans are easier to compare.",
    category: "Credit & Debt",
  },
  {
    term: "Amortization",
    definition:
      "Paying down a loan through regular, equal payments over time. Early payments cover mostly interest, while later ones go mostly toward the principal you borrowed.",
    category: "Credit & Debt",
  },
  {
    term: "Credit Score",
    definition:
      "A number that sums up how reliably you have repaid borrowed money. Lenders use it to judge how risky it is to lend to you.",
    category: "Credit & Debt",
  },
  {
    term: "Credit Utilization",
    definition:
      "The share of your available credit you are currently using. Keeping it low generally helps your credit score.",
    category: "Credit & Debt",
  },
  {
    term: "Collateral",
    definition:
      "An asset you pledge to back a loan. If the loan is not repaid, the lender can claim the asset.",
    category: "Credit & Debt",
  },
  {
    term: "Minimum Payment",
    definition:
      "The smallest amount you can pay on a debt to keep it in good standing. Paying only this keeps the balance, and the interest, around longer.",
    category: "Credit & Debt",
  },
  {
    term: "Debt Snowball",
    definition:
      "A payoff method where you clear your smallest balances first to build momentum and motivation.",
    category: "Credit & Debt",
  },
  {
    term: "Debt Avalanche",
    definition:
      "A payoff method where you target the debt with the highest interest rate first, which saves the most money over time.",
    category: "Credit & Debt",
  },
  {
    term: "Refinance",
    definition:
      "Replacing an existing loan with a new one, often to get a lower interest rate or a different repayment term.",
    category: "Credit & Debt",
  },

  // Taxes
  {
    term: "Taxable Income",
    definition:
      "The portion of your income that is actually used to calculate the tax you owe, after deductions are applied.",
    category: "Taxes",
  },
  {
    term: "Deduction",
    definition:
      "An expense you can subtract from your income to lower the amount that gets taxed.",
    category: "Taxes",
  },
  {
    term: "Tax Credit",
    definition:
      "An amount that lowers your tax bill directly, dollar for dollar. A credit is usually worth more than a deduction of the same size.",
    category: "Taxes",
  },
  {
    term: "W-2",
    definition:
      "A form an employer sends each year showing how much you were paid and how much tax was withheld.",
    category: "Taxes",
  },
  {
    term: "1099",
    definition:
      "A form that reports income you earned outside regular employment, such as freelance, contract, or gig work.",
    category: "Taxes",
  },

  // Retirement
  {
    term: "401(k)",
    definition:
      "A retirement savings account offered through an employer. Contributions often come straight out of your paycheck.",
    category: "Retirement",
  },
  {
    term: "IRA (Individual Retirement Account)",
    definition:
      "A retirement account you open on your own to save for the future with certain tax benefits.",
    category: "Retirement",
  },
  {
    term: "Roth Account",
    definition:
      "A retirement account funded with money that has already been taxed, so qualified withdrawals later are tax-free.",
    category: "Retirement",
  },
  {
    term: "Employer Match",
    definition:
      "Money your employer adds to your retirement account based on the amount you contribute yourself.",
    category: "Retirement",
  },

  // Insurance
  {
    term: "Premium",
    definition:
      "The amount you pay, usually each month, to keep an insurance policy active.",
    category: "Insurance",
  },
  {
    term: "Deductible",
    definition:
      "The amount you pay out of pocket before your insurance starts covering a cost.",
    category: "Insurance",
  },
  {
    term: "Beneficiary",
    definition:
      "The person you name to receive money from an account or insurance policy if something happens to you.",
    category: "Insurance",
  },

  // Small Business
  {
    term: "Revenue",
    definition:
      "The total money a business takes in from sales before any costs are subtracted.",
    category: "Small Business",
  },
  {
    term: "Gross Profit",
    definition:
      "What is left from revenue after subtracting the direct cost of producing the goods or services sold.",
    category: "Small Business",
  },
  {
    term: "Profit Margin",
    definition:
      "The share of revenue left as profit after costs, shown as a percentage. It shows how much of each dollar of sales a business keeps.",
    category: "Small Business",
  },
  {
    term: "Break-Even Point",
    definition:
      "The level of sales at which a business covers all its costs exactly, with neither a profit nor a loss.",
    category: "Small Business",
  },
  {
    term: "Overhead",
    definition:
      "The ongoing costs of running a business that are not tied to a single sale, such as rent, software, and utilities.",
    category: "Small Business",
  },
  {
    term: "Working Capital",
    definition:
      "The cash a business has on hand for day-to-day operations, found by subtracting short-term debts from short-term assets.",
    category: "Small Business",
  },
  {
    term: "Runway",
    definition:
      "How many months a business can keep operating before it runs out of cash, found by dividing the cash on hand by what is spent each month.",
    category: "Small Business",
  },
  {
    term: "Depreciation",
    definition:
      "Spreading the cost of a large purchase, such as equipment or a vehicle, across the years it is actually used.",
    category: "Small Business",
  },
];
