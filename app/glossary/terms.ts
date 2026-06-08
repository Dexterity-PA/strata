/**
 * Glossary content: plain-language definitions of common personal and
 * small-business finance terms. Educational and neutral, written to be read
 * by someone seeing the word for the first time. This is reference material,
 * not financial advice or a recommendation.
 *
 * Each entry is { term, definition, category, seeAlso? }. Keep definitions
 * short, jargon-free, and free of long dashes (use commas, colons, or
 * periods). Every string in a seeAlso list must match another entry's `term`
 * exactly so the cross-links resolve.
 */

export type GlossaryCategory =
  | "Budgeting & Cash Flow"
  | "Saving & Investing"
  | "Credit & Debt"
  | "Taxes"
  | "Retirement"
  | "Insurance"
  | "Small Business"
  | "Banking & Accounts"
  | "Real Estate & Mortgages"
  | "Investing Vehicles"
  | "Economic Concepts"
  | "Estate Planning";

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: GlossaryCategory;
  /** Related terms, referenced by their exact `term` string. */
  seeAlso?: readonly string[];
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
  "Banking & Accounts",
  "Real Estate & Mortgages",
  "Investing Vehicles",
  "Economic Concepts",
  "Estate Planning",
];

/**
 * Stable, URL-safe id for a term, used as the anchor target the A to Z bar
 * and the "see also" links jump to. Lowercased, with every run of
 * non-alphanumeric characters collapsed to a single hyphen.
 */
export function termAnchorId(term: string): string {
  return (
    "term-" +
    term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  // ── Budgeting & Cash Flow ────────────────────────────────────────────────
  {
    term: "Budget",
    definition:
      "A plan for the money you expect to come in and go out over a set period, usually a month. It helps you decide where your money goes before it is spent.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Cash Flow", "Fixed Expense", "Variable Expense"],
  },
  {
    term: "Cash Flow",
    definition:
      "The movement of money into and out of your accounts over time. Positive cash flow means more is coming in than going out.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Budget", "Working Capital", "Runway"],
  },
  {
    term: "Gross Income",
    definition:
      "Your total earnings before any taxes or deductions are taken out.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Net Income", "Taxable Income"],
  },
  {
    term: "Net Income",
    definition:
      "The money you actually keep after taxes and deductions are removed. This is often called take-home pay.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Gross Income", "Deduction"],
  },
  {
    term: "Fixed Expense",
    definition:
      "A cost that stays about the same each month, such as rent or a loan payment. It is easy to plan around because it rarely changes.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Variable Expense", "Overhead"],
  },
  {
    term: "Variable Expense",
    definition:
      "A cost that changes from month to month, such as groceries, fuel, or utility bills.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Fixed Expense", "Budget"],
  },
  {
    term: "Emergency Fund",
    definition:
      "Money set aside to cover unexpected costs, such as a car repair, a medical bill, or a gap in income.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Liquidity", "Runway", "Sinking Fund"],
  },
  {
    term: "Zero-Based Budget",
    definition:
      "A budgeting approach where every dollar of income is assigned a specific purpose so that income minus all allocations equals zero. This does not mean you spend everything; savings and investments count as allocations.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Budget", "Spending Plan"],
  },
  {
    term: "50/30/20 Rule",
    definition:
      "A simple budgeting guideline that allocates roughly half of take-home pay to needs, thirty percent to wants, and twenty percent to savings or debt payoff.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Budget", "Discretionary Spending", "Saving Rate"],
  },
  {
    term: "Pay Yourself First",
    definition:
      "A savings habit where money is set aside for savings or investments at the start of each pay period, before other spending occurs.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Emergency Fund", "Saving Rate"],
  },
  {
    term: "Discretionary Spending",
    definition:
      "Money spent on non-essential items such as dining out, entertainment, and hobbies, as opposed to necessities like housing and utilities.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Fixed Expense", "Variable Expense", "Budget"],
  },
  {
    term: "Sinking Fund",
    definition:
      "Money saved gradually over time for a known future expense, such as a vacation, a car, or an annual insurance premium. It spreads a large cost into smaller, manageable contributions.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Emergency Fund", "Budget"],
  },
  {
    term: "Irregular Income",
    definition:
      "Earnings that vary month to month, common among freelancers, contractors, and commission-based workers. Budgeting on irregular income often involves using the lowest expected monthly amount as a baseline.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Budget", "Cash Flow"],
  },
  {
    term: "Budget Variance",
    definition:
      "The difference between what you planned to spend or earn and what actually happened. A favorable variance means you spent less or earned more than planned.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Budget"],
  },
  {
    term: "Spending Plan",
    definition:
      "Another name for a budget, emphasizing that the goal is intentional direction of money rather than restriction.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Budget", "Zero-Based Budget"],
  },
  {
    term: "Saving Rate",
    definition:
      "The percentage of income set aside as savings rather than spent. It is calculated by dividing the amount saved by gross or net income, depending on the convention used.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Gross Income", "Net Income", "Pay Yourself First"],
  },
  {
    term: "Envelope Method",
    definition:
      "A cash-based budgeting technique where money for specific spending categories is divided into physical or digital envelopes. Once an envelope is empty, no more spending occurs in that category for the period.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Budget", "Discretionary Spending"],
  },
  {
    term: "Net Worth",
    definition:
      "What you own minus what you owe. It is a simple snapshot of where your finances stand at a moment in time.",
    category: "Budgeting & Cash Flow",
    seeAlso: ["Asset", "Liability"],
  },

  // ── Saving & Investing ───────────────────────────────────────────────────
  {
    term: "Principal",
    definition:
      "The original amount of money you save, invest, or borrow, before any interest is added.",
    category: "Saving & Investing",
    seeAlso: ["Interest Rate", "Amortization"],
  },
  {
    term: "Interest Rate",
    definition:
      "The percentage charged on money you borrow, or paid on money you save, usually measured over a year.",
    category: "Saving & Investing",
    seeAlso: [
      "Compound Interest",
      "APR (Annual Percentage Rate)",
      "APY (Annual Percentage Yield)",
    ],
  },
  {
    term: "Compound Interest",
    definition:
      "Interest earned on both your original money and on the interest already added to it, so the balance grows faster over time.",
    category: "Saving & Investing",
    seeAlso: ["Interest Rate", "APY (Annual Percentage Yield)", "Principal"],
  },
  {
    term: "APY (Annual Percentage Yield)",
    definition:
      "The real rate of return on savings over one year, including the effect of compounding. It lets you compare savings accounts fairly.",
    category: "Saving & Investing",
    seeAlso: ["Compound Interest", "APR (Annual Percentage Rate)"],
  },
  {
    term: "Liquidity",
    definition:
      "How quickly something can be turned into cash without losing much value. A checking account is very liquid; a house is not.",
    category: "Saving & Investing",
    seeAlso: ["Asset", "Emergency Fund", "Working Capital"],
  },
  {
    term: "Asset",
    definition:
      "Something you own that has value, such as cash, a car, a home, or an investment.",
    category: "Saving & Investing",
    seeAlso: ["Liability", "Net Worth"],
  },
  {
    term: "Liability",
    definition:
      "Something you owe, such as a loan, a credit card balance, or an unpaid bill.",
    category: "Saving & Investing",
    seeAlso: ["Asset", "Net Worth"],
  },
  {
    term: "Inflation",
    definition:
      "The gradual rise in prices over time, which means the same amount of money buys a little less than it used to.",
    category: "Saving & Investing",
    seeAlso: ["Purchasing Power", "Consumer Price Index (CPI)"],
  },
  {
    term: "Risk Tolerance",
    definition:
      "A person's willingness and ability to accept losses or swings in the value of their investments in exchange for the possibility of higher returns.",
    category: "Saving & Investing",
    seeAlso: ["Market Volatility", "Diversification"],
  },
  {
    term: "Diversification",
    definition:
      "Spreading money across different types of investments so that a loss in one area does not wipe out the whole portfolio.",
    category: "Saving & Investing",
    seeAlso: ["Portfolio", "Risk Tolerance"],
  },
  {
    term: "Portfolio",
    definition:
      "The full collection of investments someone holds, which may include stocks, bonds, real estate, and cash accounts.",
    category: "Saving & Investing",
    seeAlso: ["Diversification", "Rebalancing", "Asset"],
  },
  {
    term: "Return on Investment",
    definition:
      "A measure of how much gain or loss an investment produces relative to its cost, expressed as a percentage.",
    category: "Saving & Investing",
    seeAlso: ["Capital Gain", "Portfolio"],
  },
  {
    term: "Dollar-Cost Averaging",
    definition:
      "Investing a fixed amount of money at regular intervals regardless of the current price. This approach buys more shares when prices are low and fewer when prices are high.",
    category: "Saving & Investing",
    seeAlso: ["Market Volatility", "Portfolio"],
  },
  {
    term: "Rebalancing",
    definition:
      "Adjusting a portfolio back to its original target mix of investments after market changes have shifted the proportions.",
    category: "Saving & Investing",
    seeAlso: ["Portfolio", "Diversification"],
  },
  {
    term: "Capital Gain",
    definition:
      "The profit earned when an investment is sold for more than it cost to buy. Gains held for longer periods may be taxed at different rates than those held for shorter periods.",
    category: "Saving & Investing",
    seeAlso: ["Capital Gains Tax", "Return on Investment"],
  },
  {
    term: "Dividend",
    definition:
      "A payment some companies make to shareholders from their profits, usually on a regular schedule. Dividends can be taken as cash or reinvested to buy more shares.",
    category: "Saving & Investing",
    seeAlso: ["Stock", "Portfolio"],
  },
  {
    term: "Market Volatility",
    definition:
      "The degree to which the price of an investment rises and falls over a period. High volatility means large swings; low volatility means relatively steady prices.",
    category: "Saving & Investing",
    seeAlso: ["Risk Tolerance", "Dollar-Cost Averaging"],
  },
  {
    term: "Bear Market",
    definition:
      "A prolonged period of falling investment prices, generally defined as a decline of twenty percent or more from a recent peak. Bear markets often coincide with economic downturns.",
    category: "Saving & Investing",
    seeAlso: ["Bull Market", "Market Cycle", "Market Volatility"],
  },
  {
    term: "Bull Market",
    definition:
      "A prolonged period of rising investment prices, generally marked by broad optimism and strong economic conditions.",
    category: "Saving & Investing",
    seeAlso: ["Bear Market", "Market Cycle"],
  },

  // ── Credit & Debt ────────────────────────────────────────────────────────
  {
    term: "APR (Annual Percentage Rate)",
    definition:
      "The yearly cost of borrowing, including interest and certain fees, shown as a single percentage so loans are easier to compare.",
    category: "Credit & Debt",
    seeAlso: ["Interest Rate", "APY (Annual Percentage Yield)", "Refinance"],
  },
  {
    term: "Amortization",
    definition:
      "Paying down a loan through regular, equal payments over time. Early payments cover mostly interest, while later ones go mostly toward the principal you borrowed.",
    category: "Credit & Debt",
    seeAlso: ["Principal", "Refinance"],
  },
  {
    term: "Credit Score",
    definition:
      "A number that sums up how reliably you have repaid borrowed money. Lenders use it to judge how risky it is to lend to you.",
    category: "Credit & Debt",
    seeAlso: ["Credit Utilization", "Credit Report"],
  },
  {
    term: "Credit Utilization",
    definition:
      "The share of your available credit you are currently using. Keeping it low generally helps your credit score.",
    category: "Credit & Debt",
    seeAlso: ["Credit Score", "Minimum Payment"],
  },
  {
    term: "Collateral",
    definition:
      "An asset you pledge to back a loan. If the loan is not repaid, the lender can claim the asset.",
    category: "Credit & Debt",
    seeAlso: ["Asset", "Secured Debt"],
  },
  {
    term: "Minimum Payment",
    definition:
      "The smallest amount you can pay on a debt to keep it in good standing. Paying only this keeps the balance, and the interest, around longer.",
    category: "Credit & Debt",
    seeAlso: ["APR (Annual Percentage Rate)", "Credit Utilization"],
  },
  {
    term: "Debt Snowball",
    definition:
      "A payoff method where you clear your smallest balances first to build momentum and motivation.",
    category: "Credit & Debt",
    seeAlso: ["Debt Avalanche"],
  },
  {
    term: "Debt Avalanche",
    definition:
      "A payoff method where you target the debt with the highest interest rate first, which saves the most money over time.",
    category: "Credit & Debt",
    seeAlso: ["Debt Snowball", "Interest Rate"],
  },
  {
    term: "Refinance",
    definition:
      "Replacing an existing loan with a new one, often to get a lower interest rate or a different repayment term.",
    category: "Credit & Debt",
    seeAlso: ["APR (Annual Percentage Rate)", "Amortization"],
  },
  {
    term: "Credit Report",
    definition:
      "A detailed record of your borrowing history, including open accounts, balances, payment history, and public records like bankruptcies. Lenders, landlords, and employers may review it.",
    category: "Credit & Debt",
    seeAlso: ["Credit Score", "Hard Inquiry"],
  },
  {
    term: "Hard Inquiry",
    definition:
      "A check of your credit report triggered when you apply for credit, such as a loan or a credit card. Multiple hard inquiries in a short period can lower your credit score slightly.",
    category: "Credit & Debt",
    seeAlso: ["Soft Inquiry", "Credit Score", "Credit Report"],
  },
  {
    term: "Soft Inquiry",
    definition:
      "A check of your credit report that does not affect your credit score, such as when you check your own credit or a lender pre-screens you for an offer.",
    category: "Credit & Debt",
    seeAlso: ["Hard Inquiry", "Credit Report"],
  },
  {
    term: "Debt-to-Income Ratio",
    definition:
      "Your total monthly debt payments divided by your gross monthly income, expressed as a percentage. Lenders use it to assess your capacity to take on more debt.",
    category: "Credit & Debt",
    seeAlso: ["Gross Income", "Amortization"],
  },
  {
    term: "Secured Debt",
    definition:
      "A loan backed by an asset the lender can seize if you default, such as a mortgage or a car loan.",
    category: "Credit & Debt",
    seeAlso: ["Collateral", "Unsecured Debt"],
  },
  {
    term: "Unsecured Debt",
    definition:
      "A loan with no collateral backing it, such as most credit cards and personal loans. Because the lender has no asset to claim, interest rates are typically higher.",
    category: "Credit & Debt",
    seeAlso: ["Secured Debt", "APR (Annual Percentage Rate)"],
  },
  {
    term: "Bankruptcy",
    definition:
      "A legal process that allows individuals or businesses overwhelmed by debt to seek relief by having some debts discharged or restructured under court supervision.",
    category: "Credit & Debt",
    seeAlso: ["Credit Report", "Unsecured Debt"],
  },
  {
    term: "Grace Period",
    definition:
      "A window of time after a payment due date during which no penalty or interest is charged. Many credit cards offer a grace period on new purchases if the previous balance is paid in full.",
    category: "Credit & Debt",
    seeAlso: ["Minimum Payment", "APR (Annual Percentage Rate)"],
  },
  {
    term: "Balance Transfer",
    definition:
      "Moving an existing debt from one credit card or loan to another, often to take advantage of a lower interest rate.",
    category: "Credit & Debt",
    seeAlso: ["APR (Annual Percentage Rate)", "Credit Utilization"],
  },
  {
    term: "Charge-Off",
    definition:
      "When a creditor declares a debt unlikely to be collected and removes it from their active books, usually after several months of missed payments. The debt still legally exists and may be sold to a collection agency.",
    category: "Credit & Debt",
    seeAlso: ["Credit Report", "Bankruptcy"],
  },

  // ── Taxes ────────────────────────────────────────────────────────────────
  {
    term: "Taxable Income",
    definition:
      "The portion of your income that is actually used to calculate the tax you owe, after deductions are applied.",
    category: "Taxes",
    seeAlso: ["Deduction", "Gross Income"],
  },
  {
    term: "Deduction",
    definition:
      "An expense you can subtract from your income to lower the amount that gets taxed.",
    category: "Taxes",
    seeAlso: ["Taxable Income", "Tax Credit", "Standard Deduction"],
  },
  {
    term: "Tax Credit",
    definition:
      "An amount that lowers your tax bill directly, dollar for dollar. A credit is usually worth more than a deduction of the same size.",
    category: "Taxes",
    seeAlso: ["Deduction", "Taxable Income"],
  },
  {
    term: "W-2",
    definition:
      "A form an employer sends each year showing how much you were paid and how much tax was withheld.",
    category: "Taxes",
    seeAlso: ["1099", "Tax Withholding"],
  },
  {
    term: "1099",
    definition:
      "A form that reports income you earned outside regular employment, such as freelance, contract, or gig work.",
    category: "Taxes",
    seeAlso: ["W-2", "Self-Employment Tax"],
  },
  {
    term: "Marginal Tax Rate",
    definition:
      "The tax rate applied to the last dollar you earn. Because income taxes use brackets, only income above each threshold is taxed at the higher rate.",
    category: "Taxes",
    seeAlso: ["Tax Bracket", "Effective Tax Rate"],
  },
  {
    term: "Effective Tax Rate",
    definition:
      "The average rate at which your total income is taxed, found by dividing your total tax bill by your taxable income. It is lower than your marginal rate because lower income layers are taxed at lower rates.",
    category: "Taxes",
    seeAlso: ["Marginal Tax Rate", "Tax Bracket"],
  },
  {
    term: "Tax Bracket",
    definition:
      "A range of income taxed at a specific rate. The tax system applies progressively higher rates as income rises through each bracket.",
    category: "Taxes",
    seeAlso: ["Marginal Tax Rate", "Taxable Income"],
  },
  {
    term: "Standard Deduction",
    definition:
      "A fixed dollar amount set by the government that reduces your taxable income without requiring you to list individual expenses. Most filers use the standard deduction because it is simpler and often larger than itemizing.",
    category: "Taxes",
    seeAlso: ["Deduction", "Itemized Deduction", "Taxable Income"],
  },
  {
    term: "Itemized Deduction",
    definition:
      "A list of specific qualifying expenses, such as mortgage interest, state taxes, and charitable gifts, that reduce your taxable income. You claim itemized deductions only when they add up to more than the standard deduction.",
    category: "Taxes",
    seeAlso: ["Standard Deduction", "Deduction"],
  },
  {
    term: "Self-Employment Tax",
    definition:
      "Taxes covering Social Security and Medicare contributions for people who work for themselves. Employees split this cost with their employer; self-employed people pay both shares.",
    category: "Taxes",
    seeAlso: ["FICA", "1099", "Estimated Tax"],
  },
  {
    term: "Estimated Tax",
    definition:
      "Quarterly tax payments made to the government by people whose income is not subject to withholding, such as freelancers, business owners, and investors.",
    category: "Taxes",
    seeAlso: ["Self-Employment Tax", "Tax Withholding"],
  },
  {
    term: "Capital Gains Tax",
    definition:
      "Tax owed on the profit from selling an investment or asset. The rate generally depends on how long the asset was held before the sale.",
    category: "Taxes",
    seeAlso: ["Capital Gain", "Tax-Loss Harvesting"],
  },
  {
    term: "Tax-Loss Harvesting",
    definition:
      "Selling investments at a loss to offset gains elsewhere, which can reduce your capital gains tax for the year. The proceeds are often reinvested in a similar asset.",
    category: "Taxes",
    seeAlso: ["Capital Gains Tax", "Capital Gain"],
  },
  {
    term: "FICA",
    definition:
      "The Federal Insurance Contributions Act tax, which funds Social Security and Medicare. It is withheld from employee paychecks and matched by employers.",
    category: "Taxes",
    seeAlso: ["Self-Employment Tax", "Tax Withholding"],
  },
  {
    term: "Tax Withholding",
    definition:
      "The portion of each paycheck your employer sends directly to the government as a prepayment of your income taxes.",
    category: "Taxes",
    seeAlso: ["W-2", "Estimated Tax"],
  },
  {
    term: "Filing Status",
    definition:
      "A category, such as single, married filing jointly, or head of household, that determines your tax bracket and standard deduction amount.",
    category: "Taxes",
    seeAlso: ["Standard Deduction", "Tax Bracket"],
  },
  {
    term: "Tax Extension",
    definition:
      "A request to extend the deadline for filing your tax return, usually by several months. An extension to file is not an extension to pay; any taxes owed are still due by the original deadline.",
    category: "Taxes",
    seeAlso: ["Estimated Tax"],
  },
  {
    term: "Alternative Minimum Tax (AMT)",
    definition:
      "A parallel tax calculation designed to ensure that higher-income taxpayers pay at least a minimum amount, regardless of deductions and credits they might otherwise use.",
    category: "Taxes",
    seeAlso: ["Taxable Income", "Deduction"],
  },
  {
    term: "Roth Conversion",
    definition:
      "Moving money from a traditional pre-tax retirement account into a Roth account, triggering income tax on the converted amount now in exchange for tax-free growth and withdrawals later.",
    category: "Taxes",
    seeAlso: ["Roth Account", "Traditional IRA", "Taxable Income"],
  },

  // ── Retirement ───────────────────────────────────────────────────────────
  {
    term: "401(k)",
    definition:
      "A retirement savings account offered through an employer. Contributions often come straight out of your paycheck and may be matched by your employer.",
    category: "Retirement",
    seeAlso: [
      "Employer Match",
      "IRA (Individual Retirement Account)",
      "Roth Account",
    ],
  },
  {
    term: "IRA (Individual Retirement Account)",
    definition:
      "A retirement account you open on your own to save for the future with certain tax benefits.",
    category: "Retirement",
    seeAlso: ["401(k)", "Roth Account", "Traditional IRA"],
  },
  {
    term: "Roth Account",
    definition:
      "A retirement account funded with money that has already been taxed, so qualified withdrawals later are tax-free.",
    category: "Retirement",
    seeAlso: [
      "IRA (Individual Retirement Account)",
      "401(k)",
      "Traditional IRA",
    ],
  },
  {
    term: "Traditional IRA",
    definition:
      "A retirement account funded with pre-tax or tax-deductible contributions. Withdrawals in retirement are taxed as ordinary income.",
    category: "Retirement",
    seeAlso: [
      "Roth Account",
      "IRA (Individual Retirement Account)",
      "Roth Conversion",
    ],
  },
  {
    term: "Employer Match",
    definition:
      "Money your employer adds to your retirement account based on the amount you contribute yourself. It is often described as a percentage of your contribution, up to a limit.",
    category: "Retirement",
    seeAlso: ["401(k)"],
  },
  {
    term: "Required Minimum Distribution (RMD)",
    definition:
      "The minimum amount you must withdraw each year from most retirement accounts once you reach a certain age, as required by tax law.",
    category: "Retirement",
    seeAlso: ["IRA (Individual Retirement Account)", "401(k)"],
  },
  {
    term: "Vesting Schedule",
    definition:
      "A timeline that determines when you gain full ownership of employer contributions to your retirement account. Some schedules vest gradually; others vest all at once after a certain period.",
    category: "Retirement",
    seeAlso: ["Employer Match", "401(k)"],
  },
  {
    term: "Pension",
    definition:
      "A retirement plan where an employer provides a defined monthly benefit in retirement, typically based on years of service and salary history.",
    category: "Retirement",
    seeAlso: ["401(k)", "Annuity"],
  },
  {
    term: "Social Security Benefits",
    definition:
      "Monthly payments from the government's Social Security program, available to eligible retirees, disabled workers, and some family members. Benefit amounts are based on lifetime earnings and the age at which benefits begin.",
    category: "Retirement",
    seeAlso: ["FICA", "Pension"],
  },
  {
    term: "Safe Withdrawal Rate",
    definition:
      "A guideline for how much of a retirement portfolio can be withdrawn each year with a low risk of running out of money over a long retirement. The concept is used for planning, not as a guarantee.",
    category: "Retirement",
    seeAlso: ["Portfolio", "Required Minimum Distribution (RMD)"],
  },
  {
    term: "Catch-Up Contribution",
    definition:
      "An extra contribution allowed for workers above a certain age to put more money into retirement accounts than the standard limit.",
    category: "Retirement",
    seeAlso: ["401(k)", "IRA (Individual Retirement Account)"],
  },
  {
    term: "Rollover IRA",
    definition:
      "An IRA funded by moving money from a workplace retirement plan, such as a 401(k), when you leave a job. The rollover preserves the money's tax-deferred status.",
    category: "Retirement",
    seeAlso: ["IRA (Individual Retirement Account)", "401(k)"],
  },
  {
    term: "Annuity",
    definition:
      "A contract with an insurance company where you exchange a lump sum or series of payments for a stream of income, either for a set period or for the rest of your life.",
    category: "Retirement",
    seeAlso: ["Pension", "Insurance Claim"],
  },
  {
    term: "Target Date Fund",
    definition:
      "A mutual fund designed for retirement in a specific year. It automatically shifts from a more growth-oriented mix of investments to a more conservative one as the target date approaches.",
    category: "Retirement",
    seeAlso: ["Mutual Fund", "Diversification", "Rebalancing"],
  },
  {
    term: "Beneficiary Designation",
    definition:
      "A form attached to a financial account or insurance policy naming who receives the assets when the account holder dies. These designations pass assets outside of a will and typically override it.",
    category: "Retirement",
    seeAlso: ["Beneficiary", "Will", "IRA (Individual Retirement Account)"],
  },

  // ── Insurance ────────────────────────────────────────────────────────────
  {
    term: "Premium",
    definition:
      "The amount you pay, usually each month, to keep an insurance policy active.",
    category: "Insurance",
    seeAlso: ["Deductible", "Beneficiary"],
  },
  {
    term: "Deductible",
    definition:
      "The amount you pay out of pocket before your insurance starts covering a cost.",
    category: "Insurance",
    seeAlso: ["Premium", "Out-of-Pocket Maximum"],
  },
  {
    term: "Beneficiary",
    definition:
      "The person or entity named to receive money from an account or insurance policy when the account holder or insured person dies.",
    category: "Insurance",
    seeAlso: ["Premium", "Beneficiary Designation"],
  },
  {
    term: "Life Insurance",
    definition:
      "A policy that pays a lump sum to named beneficiaries when the insured person dies. It is commonly used to replace lost income or cover debts and final expenses.",
    category: "Insurance",
    seeAlso: ["Term Life Insurance", "Whole Life Insurance", "Beneficiary"],
  },
  {
    term: "Term Life Insurance",
    definition:
      "Life insurance that lasts for a set period, such as ten or twenty years. If the insured person dies within that term, the policy pays the death benefit. If not, the coverage ends with no payout.",
    category: "Insurance",
    seeAlso: ["Life Insurance", "Whole Life Insurance", "Premium"],
  },
  {
    term: "Whole Life Insurance",
    definition:
      "A type of permanent life insurance that lasts for the insured person's entire life and accumulates a cash value over time that the policyholder can borrow against.",
    category: "Insurance",
    seeAlso: ["Term Life Insurance", "Life Insurance", "Premium"],
  },
  {
    term: "Liability Coverage",
    definition:
      "Insurance that pays for damages or injuries you cause to others. Auto and homeowners policies typically include liability coverage.",
    category: "Insurance",
    seeAlso: ["Umbrella Insurance", "Homeowners Insurance"],
  },
  {
    term: "Umbrella Insurance",
    definition:
      "Extra liability coverage that kicks in when the limits of your auto or homeowners policy are exceeded. It provides broad protection against large claims.",
    category: "Insurance",
    seeAlso: ["Liability Coverage", "Homeowners Insurance"],
  },
  {
    term: "Health Savings Account (HSA)",
    definition:
      "A tax-advantaged savings account available to people enrolled in a high-deductible health plan. Money contributed can be used tax-free for qualifying medical expenses and rolls over year to year.",
    category: "Insurance",
    seeAlso: ["Deductible", "Flexible Spending Account (FSA)"],
  },
  {
    term: "Flexible Spending Account (FSA)",
    definition:
      "An employer-sponsored account that lets employees set aside pre-tax dollars for qualifying medical or dependent care expenses. Unlike an HSA, unused funds generally do not roll over to the next year.",
    category: "Insurance",
    seeAlso: ["Health Savings Account (HSA)", "Deductible"],
  },
  {
    term: "Copay",
    definition:
      "A fixed dollar amount you pay for a medical service, such as a doctor visit, at the time of the appointment. The insurance plan covers the remainder.",
    category: "Insurance",
    seeAlso: ["Deductible", "Coinsurance", "Out-of-Pocket Maximum"],
  },
  {
    term: "Coinsurance",
    definition:
      "The percentage of a medical bill you pay after meeting your deductible. For example, with eighty percent coinsurance coverage, the plan pays eighty percent and you pay twenty percent.",
    category: "Insurance",
    seeAlso: ["Deductible", "Copay", "Out-of-Pocket Maximum"],
  },
  {
    term: "Out-of-Pocket Maximum",
    definition:
      "The most you will pay for covered medical expenses in a plan year. After reaching this limit, insurance covers one hundred percent of covered costs for the rest of the year.",
    category: "Insurance",
    seeAlso: ["Deductible", "Copay", "Coinsurance"],
  },
  {
    term: "Disability Insurance",
    definition:
      "Insurance that replaces a portion of your income if you are unable to work due to illness or injury. Short-term policies cover brief periods; long-term policies can extend for years or until retirement age.",
    category: "Insurance",
    seeAlso: ["Premium", "Life Insurance"],
  },
  {
    term: "Long-Term Care Insurance",
    definition:
      "Insurance that helps cover the cost of extended care services, such as in-home assistance or nursing facility stays, that health insurance and Medicare typically do not fully cover.",
    category: "Insurance",
    seeAlso: ["Premium", "Disability Insurance"],
  },
  {
    term: "Renters Insurance",
    definition:
      "Insurance for people who rent rather than own their home. It covers personal belongings against loss and provides liability protection, but does not cover the structure itself.",
    category: "Insurance",
    seeAlso: ["Liability Coverage", "Homeowners Insurance"],
  },
  {
    term: "Insurance Claim",
    definition:
      "A formal request submitted to an insurance company asking for payment after a covered loss or event. The insurer reviews the claim and determines how much to pay based on the policy terms.",
    category: "Insurance",
    seeAlso: ["Premium", "Deductible"],
  },
  {
    term: "Homeowners Insurance",
    definition:
      "Insurance that covers damage to your home and belongings from events like fire, storms, or theft, and includes liability protection if someone is injured on your property.",
    category: "Insurance",
    seeAlso: ["Liability Coverage", "Renters Insurance", "Premium"],
  },

  // ── Small Business ────────────────────────────────────────────────────────
  {
    term: "Revenue",
    definition:
      "The total money a business takes in from sales before any costs are subtracted.",
    category: "Small Business",
    seeAlso: ["Gross Profit", "Profit Margin"],
  },
  {
    term: "Gross Profit",
    definition:
      "What is left from revenue after subtracting the direct cost of producing the goods or services sold.",
    category: "Small Business",
    seeAlso: ["Revenue", "Profit Margin", "Cost of Goods Sold (COGS)"],
  },
  {
    term: "Profit Margin",
    definition:
      "The share of revenue left as profit after costs, shown as a percentage. It shows how much of each dollar of sales a business keeps.",
    category: "Small Business",
    seeAlso: ["Gross Profit", "Revenue", "Break-Even Point"],
  },
  {
    term: "Break-Even Point",
    definition:
      "The level of sales at which a business covers all its costs exactly, with neither a profit nor a loss.",
    category: "Small Business",
    seeAlso: ["Profit Margin", "Overhead"],
  },
  {
    term: "Overhead",
    definition:
      "The ongoing costs of running a business that are not tied to a single sale, such as rent, software, and utilities.",
    category: "Small Business",
    seeAlso: ["Fixed Expense", "Break-Even Point", "Operating Expenses"],
  },
  {
    term: "Working Capital",
    definition:
      "The cash a business has on hand for day-to-day operations, found by subtracting short-term debts from short-term assets.",
    category: "Small Business",
    seeAlso: ["Liquidity", "Cash Flow", "Runway"],
  },
  {
    term: "Runway",
    definition:
      "How many months a business can keep operating before it runs out of cash, found by dividing the cash on hand by what is spent each month.",
    category: "Small Business",
    seeAlso: ["Working Capital", "Cash Flow"],
  },
  {
    term: "Depreciation",
    definition:
      "Spreading the cost of a large purchase, such as equipment or a vehicle, across the years it is actually used.",
    category: "Small Business",
    seeAlso: ["Asset", "Overhead"],
  },
  {
    term: "Invoice",
    definition:
      "A document a business sends to a customer requesting payment for goods or services delivered. It lists what was provided, the amount owed, and when payment is due.",
    category: "Small Business",
    seeAlso: ["Accounts Receivable", "Cash Flow"],
  },
  {
    term: "Accounts Receivable",
    definition:
      "Money owed to a business by its customers for goods or services already delivered but not yet paid for.",
    category: "Small Business",
    seeAlso: ["Invoice", "Accounts Payable", "Cash Flow"],
  },
  {
    term: "Accounts Payable",
    definition:
      "Money a business owes to its suppliers or vendors for goods and services it has received but not yet paid for.",
    category: "Small Business",
    seeAlso: ["Accounts Receivable", "Cash Flow"],
  },
  {
    term: "Balance Sheet",
    definition:
      "A financial statement showing what a business owns (assets), owes (liabilities), and the difference (equity) at a specific point in time.",
    category: "Small Business",
    seeAlso: ["Asset", "Liability", "Equity"],
  },
  {
    term: "Payroll",
    definition:
      "The total amount a business pays its employees, including wages, salaries, and payroll taxes. Managing payroll also involves withholding the correct taxes from each paycheck.",
    category: "Small Business",
    seeAlso: ["FICA", "Tax Withholding"],
  },
  {
    term: "Sole Proprietorship",
    definition:
      "The simplest business structure, where one person owns and runs the business. There is no legal separation between the owner and the business, so the owner is personally responsible for business debts.",
    category: "Small Business",
    seeAlso: ["Limited Liability Company (LLC)", "Self-Employment Tax"],
  },
  {
    term: "Limited Liability Company (LLC)",
    definition:
      "A business structure that separates the owner's personal assets from business debts and liabilities, offering protection that a sole proprietorship does not.",
    category: "Small Business",
    seeAlso: ["Sole Proprietorship", "Liability"],
  },
  {
    term: "Cost of Goods Sold (COGS)",
    definition:
      "The direct costs of producing or purchasing the specific goods a business sells, such as materials and direct labor. It is subtracted from revenue to find gross profit.",
    category: "Small Business",
    seeAlso: ["Gross Profit", "Revenue"],
  },
  {
    term: "Operating Expenses",
    definition:
      "The day-to-day costs of running a business that are not directly tied to production, such as marketing, administrative salaries, and office supplies.",
    category: "Small Business",
    seeAlso: ["Overhead", "Profit Margin"],
  },
  {
    term: "Retained Earnings",
    definition:
      "The cumulative profits a business has kept and reinvested rather than distributed to owners. They appear on the balance sheet as part of equity.",
    category: "Small Business",
    seeAlso: ["Equity", "Balance Sheet", "Profit Margin"],
  },
  {
    term: "Equity",
    definition:
      "In a business context, equity is the owner's stake in the business after all liabilities are subtracted from all assets. It grows when a business is profitable.",
    category: "Small Business",
    seeAlso: ["Asset", "Liability", "Retained Earnings"],
  },
  {
    term: "Business Credit",
    definition:
      "A credit profile established in a business's name, separate from the owner's personal credit. Lenders and suppliers may check it when evaluating financing or payment terms.",
    category: "Small Business",
    seeAlso: ["Credit Score", "Limited Liability Company (LLC)"],
  },

  // ── Banking & Accounts ───────────────────────────────────────────────────
  {
    term: "Checking Account",
    definition:
      "A bank account designed for frequent transactions, such as paying bills, making purchases, and receiving direct deposits. Most checking accounts come with a debit card and checks.",
    category: "Banking & Accounts",
    seeAlso: ["Savings Account", "Overdraft", "Direct Deposit"],
  },
  {
    term: "Savings Account",
    definition:
      "A bank account that holds money you are not spending immediately while earning a small amount of interest. It is designed for saving rather than daily transactions.",
    category: "Banking & Accounts",
    seeAlso: [
      "Checking Account",
      "APY (Annual Percentage Yield)",
      "High-Yield Savings Account",
    ],
  },
  {
    term: "High-Yield Savings Account",
    definition:
      "A savings account, often offered by online banks, that pays a significantly higher interest rate than a traditional savings account. It is still FDIC-insured up to applicable limits.",
    category: "Banking & Accounts",
    seeAlso: [
      "Savings Account",
      "FDIC Insurance",
      "APY (Annual Percentage Yield)",
    ],
  },
  {
    term: "Money Market Account",
    definition:
      "A bank account that typically offers a higher interest rate than a standard savings account. It may allow limited check-writing or debit card access and is insured by the FDIC up to applicable limits.",
    category: "Banking & Accounts",
    seeAlso: ["Savings Account", "FDIC Insurance", "Checking Account"],
  },
  {
    term: "Certificate of Deposit (CD)",
    definition:
      "A savings product offered by banks where you deposit money for a fixed period, such as six months or five years, and receive a fixed interest rate in return. Withdrawing early usually triggers a penalty.",
    category: "Banking & Accounts",
    seeAlso: ["Savings Account", "APY (Annual Percentage Yield)", "Liquidity"],
  },
  {
    term: "FDIC Insurance",
    definition:
      "Federal Deposit Insurance Corporation coverage that protects depositors at insured banks up to a set limit per depositor, per account category, per institution. It protects savings if a bank fails.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "Savings Account"],
  },
  {
    term: "Overdraft",
    definition:
      "When a withdrawal or payment exceeds the available balance in your account, resulting in a negative balance. Banks may decline the transaction or cover it and charge a fee.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "Overdraft Protection"],
  },
  {
    term: "Overdraft Protection",
    definition:
      "A bank service that automatically covers transactions when your checking account balance falls short, either by linking another account or through a short-term line of credit.",
    category: "Banking & Accounts",
    seeAlso: ["Overdraft", "Checking Account"],
  },
  {
    term: "Wire Transfer",
    definition:
      "An electronic transfer of funds between banks, typically used for large or time-sensitive payments. Wire transfers are fast but usually involve fees on both the sending and receiving ends.",
    category: "Banking & Accounts",
    seeAlso: ["ACH Transfer", "Electronic Funds Transfer (EFT)"],
  },
  {
    term: "ACH Transfer",
    definition:
      "An electronic transfer through the Automated Clearing House network, commonly used for direct deposit, bill payments, and person-to-person transfers. ACH transfers are typically free but take one to several business days.",
    category: "Banking & Accounts",
    seeAlso: [
      "Wire Transfer",
      "Direct Deposit",
      "Electronic Funds Transfer (EFT)",
    ],
  },
  {
    term: "Direct Deposit",
    definition:
      "An electronic payment sent straight into a bank account, commonly used by employers for paychecks and by the government for tax refunds or benefits.",
    category: "Banking & Accounts",
    seeAlso: ["ACH Transfer", "Checking Account"],
  },
  {
    term: "Electronic Funds Transfer (EFT)",
    definition:
      "Any electronic movement of money between accounts, including direct deposits, ACH transfers, wire transfers, and debit card transactions.",
    category: "Banking & Accounts",
    seeAlso: ["ACH Transfer", "Wire Transfer", "Direct Deposit"],
  },
  {
    term: "Bank Statement",
    definition:
      "A monthly summary from your bank listing all deposits, withdrawals, fees, and the starting and ending balances for a specific period.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "Bank Reconciliation"],
  },
  {
    term: "Bank Reconciliation",
    definition:
      "The process of comparing your personal records against your bank statement to confirm every transaction matches and the balances agree.",
    category: "Banking & Accounts",
    seeAlso: ["Bank Statement", "Checking Account"],
  },
  {
    term: "Routing Number",
    definition:
      "A nine-digit number that identifies a specific bank or credit union in the United States. It is used alongside an account number for direct deposits, wire transfers, and check processing.",
    category: "Banking & Accounts",
    seeAlso: ["Account Number", "ACH Transfer"],
  },
  {
    term: "Account Number",
    definition:
      "A unique number assigned to your specific account at a bank. Combined with the routing number, it identifies exactly where money should be sent or drawn from.",
    category: "Banking & Accounts",
    seeAlso: ["Routing Number", "Checking Account"],
  },
  {
    term: "Minimum Balance",
    definition:
      "The lowest account balance a bank requires to avoid fees or to earn interest. Falling below this threshold may trigger a monthly fee.",
    category: "Banking & Accounts",
    seeAlso: ["Monthly Maintenance Fee", "Checking Account"],
  },
  {
    term: "Monthly Maintenance Fee",
    definition:
      "A recurring charge a bank may apply to your account each month. It is often waived if you meet certain conditions such as maintaining a minimum balance or setting up direct deposit.",
    category: "Banking & Accounts",
    seeAlso: ["Minimum Balance", "Checking Account"],
  },
  {
    term: "Mobile Check Deposit",
    definition:
      "A feature offered by most banks that lets you deposit a paper check by photographing it with a smartphone app.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "Bank Statement"],
  },
  {
    term: "Compound Frequency",
    definition:
      "How often interest is calculated and added to an account balance, such as daily, monthly, or annually. More frequent compounding results in slightly more interest earned over the same period.",
    category: "Banking & Accounts",
    seeAlso: ["Compound Interest", "APY (Annual Percentage Yield)"],
  },
  {
    term: "Cashier's Check",
    definition:
      "A check guaranteed by a bank, drawn on the bank's own funds rather than an individual's account. It is used when a recipient requires assurance that the funds are available.",
    category: "Banking & Accounts",
    seeAlso: ["Wire Transfer", "Checking Account"],
  },
  {
    term: "Stop Payment",
    definition:
      "A request to a bank to cancel a check or payment that has not yet been processed. Banks typically charge a fee for this service.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "Bank Statement"],
  },
  {
    term: "Float",
    definition:
      "The time between when a check is written and when the funds are actually deducted from the account. Electronic payments have largely eliminated float for most transactions.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "ACH Transfer"],
  },
  {
    term: "ATM Fee",
    definition:
      "A charge applied when you use an ATM outside your bank's network. Both the ATM operator and your own bank may charge a fee for the same transaction.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "Monthly Maintenance Fee"],
  },
  {
    term: "Credit Union",
    definition:
      "A member-owned, not-for-profit financial cooperative that offers banking services similar to a bank. Profits are returned to members through lower fees and better rates rather than to outside shareholders.",
    category: "Banking & Accounts",
    seeAlso: ["Checking Account", "Savings Account", "FDIC Insurance"],
  },

  // ── Real Estate & Mortgages ───────────────────────────────────────────────
  {
    term: "Mortgage",
    definition:
      "A loan used to purchase real estate, where the property itself serves as collateral. The borrower makes monthly payments that cover both principal and interest over the loan term.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Down Payment", "Amortization", "Fixed-Rate Mortgage"],
  },
  {
    term: "Down Payment",
    definition:
      "The portion of a home's purchase price paid upfront in cash. The mortgage covers the remainder.",
    category: "Real Estate & Mortgages",
    seeAlso: [
      "Mortgage",
      "Loan-to-Value Ratio (LTV)",
      "Private Mortgage Insurance (PMI)",
    ],
  },
  {
    term: "Home Equity",
    definition:
      "The portion of your home's value that you own outright, found by subtracting the outstanding mortgage balance from the home's current market value.",
    category: "Real Estate & Mortgages",
    seeAlso: [
      "Mortgage",
      "Home Equity Line of Credit (HELOC)",
      "Loan-to-Value Ratio (LTV)",
    ],
  },
  {
    term: "Loan-to-Value Ratio (LTV)",
    definition:
      "The ratio of your mortgage balance to the appraised value of the property, expressed as a percentage. A lower LTV generally means better loan terms and may eliminate the need for private mortgage insurance.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Down Payment", "Private Mortgage Insurance (PMI)"],
  },
  {
    term: "Private Mortgage Insurance (PMI)",
    definition:
      "Insurance required by many lenders when a borrower's down payment is below a certain threshold. It protects the lender if the borrower defaults and is typically removed once sufficient equity is reached.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Down Payment", "Loan-to-Value Ratio (LTV)", "Mortgage"],
  },
  {
    term: "Fixed-Rate Mortgage",
    definition:
      "A mortgage with an interest rate that stays the same for the entire loan term. Monthly principal and interest payments are predictable and do not change.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Adjustable-Rate Mortgage (ARM)", "Amortization"],
  },
  {
    term: "Adjustable-Rate Mortgage (ARM)",
    definition:
      "A mortgage with an interest rate that is fixed for an initial period and then adjusts periodically based on a market index. Payments can rise or fall after the initial period ends.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Fixed-Rate Mortgage", "Interest Rate", "Mortgage"],
  },
  {
    term: "Closing Costs",
    definition:
      "Fees and expenses paid at the finalization of a real estate purchase or refinance, separate from the down payment. They can include lender fees, title insurance, appraisal fees, and prepaid taxes.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Title Insurance", "Property Appraisal"],
  },
  {
    term: "Escrow",
    definition:
      "A neutral third-party account that holds funds during a transaction until all conditions are met. In mortgages, it also refers to a lender-managed account that collects monthly property tax and insurance payments on the borrower's behalf.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Property Tax", "Homeowners Insurance"],
  },
  {
    term: "Property Appraisal",
    definition:
      "An independent professional assessment of a property's market value. Lenders require an appraisal to confirm the property is worth at least as much as the loan amount.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Loan-to-Value Ratio (LTV)"],
  },
  {
    term: "Title Insurance",
    definition:
      "Insurance that protects homebuyers and lenders from financial loss due to defects in the property's ownership history, such as undisclosed liens or ownership disputes.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Closing Costs", "Mortgage"],
  },
  {
    term: "Property Tax",
    definition:
      "A tax levied by a local government on real estate based on the assessed value of the property. It is a recurring expense of home ownership paid annually or collected monthly through escrow.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Escrow", "Mortgage", "Itemized Deduction"],
  },
  {
    term: "Mortgage Points",
    definition:
      "Upfront fees paid to a lender to reduce the interest rate on a mortgage. One point equals one percent of the loan amount. Whether points lower the total cost depends on how long the borrower keeps the loan.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Closing Costs", "Interest Rate"],
  },
  {
    term: "Mortgage Pre-Approval",
    definition:
      "A lender's written confirmation that a borrower qualifies for a loan up to a specified amount, based on a review of income, credit, and assets. It strengthens an offer in a competitive market.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Credit Score", "Debt-to-Income Ratio"],
  },
  {
    term: "Foreclosure",
    definition:
      "A legal process through which a lender takes possession of a property after the borrower fails to make mortgage payments. The lender then typically sells the property to recover the outstanding loan balance.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Mortgage", "Collateral", "Short Sale"],
  },
  {
    term: "Short Sale",
    definition:
      "A sale of a property for less than the outstanding mortgage balance, typically arranged when a borrower cannot afford the home and foreclosure is the alternative. The lender must approve the sale.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Foreclosure", "Mortgage"],
  },
  {
    term: "Home Equity Line of Credit (HELOC)",
    definition:
      "A revolving credit line secured by your home equity that lets you borrow, repay, and borrow again up to a set limit. Interest is charged only on what you actually draw.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Home Equity", "Mortgage", "Home Equity Loan"],
  },
  {
    term: "Home Equity Loan",
    definition:
      "A lump-sum loan secured by your home equity with a fixed interest rate and fixed repayment schedule. Unlike a HELOC, the entire amount is disbursed at once.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Home Equity", "Home Equity Line of Credit (HELOC)"],
  },
  {
    term: "Cap Rate",
    definition:
      "Short for capitalization rate. It estimates the annual return a property would produce if purchased with cash, found by dividing net operating income by the property's value.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Rental Yield", "Real Estate Investment Trust (REIT)"],
  },
  {
    term: "Rental Yield",
    definition:
      "The annual rental income a property generates as a percentage of its purchase price or current value. It is one measure used to compare investment properties.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Cap Rate", "Cash Flow"],
  },
  {
    term: "Real Estate Investment Trust (REIT)",
    definition:
      "A company that owns and typically operates income-producing real estate. Shares can be bought and sold like stocks, giving investors exposure to real estate without directly owning property.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Dividend", "Stock", "Diversification"],
  },
  {
    term: "Earnest Money",
    definition:
      "A deposit made by a homebuyer when submitting an offer to signal genuine interest. It is typically applied toward the down payment or closing costs at settlement.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Down Payment", "Closing Costs", "Escrow"],
  },
  {
    term: "Deed",
    definition:
      "A legal document that transfers ownership of real property from one party to another. Recording it with the local government establishes the new owner's claim.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Title Insurance", "Mortgage"],
  },
  {
    term: "Buyer's Market",
    definition:
      "A real estate market condition where supply exceeds demand, giving buyers more negotiating power and typically resulting in lower prices and longer listing times.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Seller's Market"],
  },
  {
    term: "Seller's Market",
    definition:
      "A real estate market condition where demand exceeds supply, giving sellers more negotiating power and typically resulting in higher prices and faster sales.",
    category: "Real Estate & Mortgages",
    seeAlso: ["Buyer's Market"],
  },

  // ── Investing Vehicles ───────────────────────────────────────────────────
  {
    term: "Stock",
    definition:
      "A share of ownership in a company. Stockholders may benefit from price appreciation and dividends but also bear the risk of losing value if the company performs poorly.",
    category: "Investing Vehicles",
    seeAlso: ["Dividend", "Portfolio", "Brokerage Account"],
  },
  {
    term: "Bond",
    definition:
      "A loan made by an investor to a government or corporation. The issuer pays periodic interest and returns the principal at maturity.",
    category: "Investing Vehicles",
    seeAlso: ["Treasury Securities", "Corporate Bond", "Municipal Bond"],
  },
  {
    term: "Mutual Fund",
    definition:
      "A pooled investment vehicle that collects money from many investors and uses it to buy a diversified portfolio of securities, managed by a professional.",
    category: "Investing Vehicles",
    seeAlso: ["Index Fund", "Expense Ratio", "Diversification"],
  },
  {
    term: "Index Fund",
    definition:
      "A fund designed to replicate the performance of a market index, such as a broad stock index. Because it simply tracks an index rather than relying on active management, costs are typically very low.",
    category: "Investing Vehicles",
    seeAlso: ["Mutual Fund", "Exchange-Traded Fund (ETF)", "Expense Ratio"],
  },
  {
    term: "Exchange-Traded Fund (ETF)",
    definition:
      "A fund that holds a collection of securities and trades on a stock exchange like an individual stock. ETFs often track an index and tend to have low costs.",
    category: "Investing Vehicles",
    seeAlso: ["Index Fund", "Mutual Fund", "Brokerage Account"],
  },
  {
    term: "Expense Ratio",
    definition:
      "The annual cost of owning a fund, expressed as a percentage of assets. It covers management fees and operating costs and is deducted from the fund's returns.",
    category: "Investing Vehicles",
    seeAlso: ["Mutual Fund", "Index Fund", "Return on Investment"],
  },
  {
    term: "Brokerage Account",
    definition:
      "An account held at a financial firm that allows you to buy and sell investments such as stocks, bonds, and funds. Unlike retirement accounts, there are no contribution limits but also no special tax advantages.",
    category: "Investing Vehicles",
    seeAlso: ["Stock", "Exchange-Traded Fund (ETF)", "Capital Gains Tax"],
  },
  {
    term: "Money Market Fund",
    definition:
      "A type of mutual fund that invests in short-term, high-quality debt instruments. It aims for a stable value and is used to hold cash while earning a modest return.",
    category: "Investing Vehicles",
    seeAlso: ["Mutual Fund", "Liquidity", "Treasury Securities"],
  },
  {
    term: "Treasury Securities",
    definition:
      "Debt instruments issued by the federal government to finance its operations. They come in various maturities, from short-term bills to longer-term notes and bonds, and are backed by the full faith and credit of the government.",
    category: "Investing Vehicles",
    seeAlso: ["Bond", "I-Bond", "Money Market Fund"],
  },
  {
    term: "I-Bond",
    definition:
      "A type of savings bond issued by the federal government with an interest rate that adjusts based on inflation. It is designed to protect purchasing power and has purchase limits per person per year.",
    category: "Investing Vehicles",
    seeAlso: ["Treasury Securities", "Inflation", "Purchasing Power"],
  },
  {
    term: "Municipal Bond",
    definition:
      "A bond issued by a state, city, or local government to fund public projects. Interest income is often exempt from federal income tax and sometimes from state and local taxes as well.",
    category: "Investing Vehicles",
    seeAlso: ["Bond", "Tax Credit", "Corporate Bond"],
  },
  {
    term: "Corporate Bond",
    definition:
      "A bond issued by a company to raise capital. It pays fixed interest and returns the principal at maturity. Corporate bonds generally offer higher interest than government bonds to compensate for higher risk.",
    category: "Investing Vehicles",
    seeAlso: ["Bond", "Bond Rating", "Municipal Bond"],
  },
  {
    term: "Preferred Stock",
    definition:
      "A class of stock that gives shareholders priority over common stockholders when dividends are paid and if the company is liquidated. Preferred stock often pays a fixed dividend but typically does not carry voting rights.",
    category: "Investing Vehicles",
    seeAlso: ["Stock", "Dividend"],
  },
  {
    term: "Blue-Chip Stock",
    definition:
      "Stock in a large, well-established company with a long history of stable earnings and dividends. The term suggests reliability relative to smaller or newer companies.",
    category: "Investing Vehicles",
    seeAlso: ["Stock", "Dividend", "Growth Stock"],
  },
  {
    term: "Growth Stock",
    definition:
      "Stock in a company expected to grow its earnings faster than average. Growth stocks often reinvest profits rather than pay dividends, so returns depend primarily on price appreciation.",
    category: "Investing Vehicles",
    seeAlso: ["Value Stock", "Stock", "Return on Investment"],
  },
  {
    term: "Value Stock",
    definition:
      "Stock that appears to trade at a lower price than its financial fundamentals suggest it is worth. Investors buy value stocks expecting the market to eventually recognize the underlying value.",
    category: "Investing Vehicles",
    seeAlso: ["Growth Stock", "Stock"],
  },
  {
    term: "Hedge Fund",
    definition:
      "A privately managed investment fund typically available only to accredited investors. Hedge funds often use complex strategies and have wide latitude in what they invest in.",
    category: "Investing Vehicles",
    seeAlso: ["Mutual Fund", "Portfolio"],
  },
  {
    term: "Options Contract",
    definition:
      "A financial contract that gives the buyer the right, but not the obligation, to buy or sell an asset at a specific price before a set expiration date.",
    category: "Investing Vehicles",
    seeAlso: ["Stock", "Brokerage Account", "Market Volatility"],
  },
  {
    term: "529 Plan",
    definition:
      "A tax-advantaged savings account designed to fund education expenses. Contributions grow tax-free, and withdrawals are tax-free when used for qualifying educational costs.",
    category: "Investing Vehicles",
    seeAlso: ["Tax Credit", "Brokerage Account"],
  },
  {
    term: "UTMA Account",
    definition:
      "A custodial account under the Uniform Transfers to Minors Act, allowing an adult to hold assets on behalf of a minor. The minor gains full control of the assets when they reach adulthood.",
    category: "Investing Vehicles",
    seeAlso: ["Brokerage Account", "529 Plan"],
  },
  {
    term: "Sector Fund",
    definition:
      "A mutual fund or ETF that focuses on companies within a specific industry or economic sector, such as technology, healthcare, or energy.",
    category: "Investing Vehicles",
    seeAlso: ["Mutual Fund", "Exchange-Traded Fund (ETF)", "Diversification"],
  },
  {
    term: "Load Fund",
    definition:
      "A mutual fund that charges a sales commission, either when you buy (front-end load) or when you sell (back-end load). No-load funds do not charge this commission.",
    category: "Investing Vehicles",
    seeAlso: ["Mutual Fund", "Expense Ratio"],
  },
  {
    term: "Benchmark",
    definition:
      "A standard, such as a market index, used to evaluate the performance of an investment or portfolio. A fund that consistently trails its benchmark is typically seen as underperforming.",
    category: "Investing Vehicles",
    seeAlso: ["Index Fund", "Portfolio", "Return on Investment"],
  },
  {
    term: "Bid-Ask Spread",
    definition:
      "The difference between the highest price a buyer will pay (bid) and the lowest price a seller will accept (ask) for a security. A narrow spread indicates a liquid market; a wide spread suggests lower liquidity.",
    category: "Investing Vehicles",
    seeAlso: ["Liquidity", "Exchange-Traded Fund (ETF)"],
  },

  // ── Economic Concepts ─────────────────────────────────────────────────────
  {
    term: "Gross Domestic Product (GDP)",
    definition:
      "The total value of all goods and services produced within a country over a specific period, typically a year or a quarter. It is a broad measure of economic activity and size.",
    category: "Economic Concepts",
    seeAlso: ["Recession", "Market Cycle"],
  },
  {
    term: "Recession",
    definition:
      "A significant, widespread decline in economic activity lasting more than a few months. It is often defined as two consecutive quarters of shrinking GDP.",
    category: "Economic Concepts",
    seeAlso: ["Gross Domestic Product (GDP)", "Bear Market", "Market Cycle"],
  },
  {
    term: "Consumer Price Index (CPI)",
    definition:
      "A measure of the average change over time in the prices paid by urban consumers for a basket of goods and services. It is a commonly used indicator of inflation.",
    category: "Economic Concepts",
    seeAlso: ["Inflation", "Purchasing Power", "Federal Reserve"],
  },
  {
    term: "Federal Reserve",
    definition:
      "The central bank of the United States, responsible for conducting monetary policy, supervising banks, and maintaining financial stability. Its decisions on interest rates affect borrowing costs throughout the economy.",
    category: "Economic Concepts",
    seeAlso: ["Federal Funds Rate", "Monetary Policy", "Inflation"],
  },
  {
    term: "Federal Funds Rate",
    definition:
      "The interest rate at which banks lend reserve balances to each other overnight. The Federal Reserve targets this rate as a primary tool of monetary policy, and changes ripple through other interest rates in the economy.",
    category: "Economic Concepts",
    seeAlso: ["Federal Reserve", "Monetary Policy", "Interest Rate"],
  },
  {
    term: "Monetary Policy",
    definition:
      "Actions taken by a central bank, such as the Federal Reserve, to influence the money supply and interest rates in order to achieve economic goals like stable prices and employment.",
    category: "Economic Concepts",
    seeAlso: ["Federal Reserve", "Federal Funds Rate", "Fiscal Policy"],
  },
  {
    term: "Fiscal Policy",
    definition:
      "Government decisions about spending and taxation used to influence economic conditions. Increased spending or tax cuts are generally stimulative; reduced spending or higher taxes are generally contractionary.",
    category: "Economic Concepts",
    seeAlso: ["Monetary Policy", "National Debt", "Budget Deficit"],
  },
  {
    term: "Deflation",
    definition:
      "A general decline in prices across an economy. While lower prices may seem beneficial, deflation can signal weak demand and can make debt burdens heavier in real terms.",
    category: "Economic Concepts",
    seeAlso: ["Inflation", "Purchasing Power", "Recession"],
  },
  {
    term: "Stagflation",
    definition:
      "An unusual economic condition where high inflation and high unemployment occur simultaneously, combined with slow or stagnant economic growth.",
    category: "Economic Concepts",
    seeAlso: ["Inflation", "Recession"],
  },
  {
    term: "Purchasing Power",
    definition:
      "The quantity of goods and services that a unit of currency can buy. Inflation erodes purchasing power over time; deflation increases it.",
    category: "Economic Concepts",
    seeAlso: ["Inflation", "Deflation", "Consumer Price Index (CPI)"],
  },
  {
    term: "Yield Curve",
    definition:
      "A graph that plots interest rates on bonds of the same credit quality but different maturities. An inverted yield curve, where short-term rates are higher than long-term rates, has historically preceded recessions.",
    category: "Economic Concepts",
    seeAlso: ["Bond", "Interest Rate", "Recession"],
  },
  {
    term: "National Debt",
    definition:
      "The total amount of money a government owes to its creditors, accumulated from years of spending more than it collects in taxes.",
    category: "Economic Concepts",
    seeAlso: ["Budget Deficit", "Fiscal Policy"],
  },
  {
    term: "Budget Deficit",
    definition:
      "When a government spends more than it collects in revenue over a given period, requiring it to borrow the difference. Persistent deficits add to the national debt.",
    category: "Economic Concepts",
    seeAlso: ["National Debt", "Fiscal Policy"],
  },
  {
    term: "Bond Rating",
    definition:
      "A grade assigned by a credit rating agency to indicate the creditworthiness of a bond issuer. Higher-rated bonds carry lower default risk and typically offer lower interest rates.",
    category: "Economic Concepts",
    seeAlso: ["Bond", "Corporate Bond", "Interest Rate"],
  },
  {
    term: "Systemic Risk",
    definition:
      "The risk that the failure of one institution or market segment could trigger a broader collapse across the financial system, as interconnections allow problems to spread rapidly.",
    category: "Economic Concepts",
    seeAlso: ["Market Volatility", "Recession"],
  },
  {
    term: "Market Cycle",
    definition:
      "The recurring pattern of expansion, peak, contraction, and recovery in financial markets and the broader economy. No two cycles are identical in duration or magnitude.",
    category: "Economic Concepts",
    seeAlso: ["Bear Market", "Bull Market", "Recession"],
  },
  {
    term: "Trade Deficit",
    definition:
      "When a country imports more goods and services than it exports, resulting in a negative balance of trade. The opposite condition, where exports exceed imports, is a trade surplus.",
    category: "Economic Concepts",
    seeAlso: ["Gross Domestic Product (GDP)", "Fiscal Policy"],
  },
  {
    term: "Money Supply",
    definition:
      "The total amount of money in circulation in an economy at a given time, including cash, deposits, and other liquid instruments. Central banks monitor and influence it as part of monetary policy.",
    category: "Economic Concepts",
    seeAlso: ["Monetary Policy", "Federal Reserve", "Inflation"],
  },
  {
    term: "Interest Rate Risk",
    definition:
      "The risk that rising interest rates will reduce the value of existing fixed-rate investments, particularly bonds, because newer issues offer higher yields.",
    category: "Economic Concepts",
    seeAlso: ["Interest Rate", "Bond", "Market Volatility"],
  },
  {
    term: "Supply and Demand",
    definition:
      "The economic principle that prices are driven by the relationship between how much of something is available (supply) and how much consumers want it (demand). When demand exceeds supply, prices tend to rise; when supply exceeds demand, they tend to fall.",
    category: "Economic Concepts",
    seeAlso: ["Inflation", "Market Cycle"],
  },

  // ── Estate Planning ───────────────────────────────────────────────────────
  {
    term: "Estate",
    definition:
      "Everything a person owns at the time of death, including real property, financial accounts, personal possessions, and debts. An estate is distributed according to a will, trust, or the laws of the state if neither exists.",
    category: "Estate Planning",
    seeAlso: ["Will", "Trust", "Probate"],
  },
  {
    term: "Will",
    definition:
      "A legal document stating how a person's assets should be distributed after death and who should care for minor children. Without a will, the state decides distribution according to its default rules.",
    category: "Estate Planning",
    seeAlso: ["Estate", "Executor", "Probate"],
  },
  {
    term: "Trust",
    definition:
      "A legal arrangement where one party (the trustee) holds and manages assets for the benefit of another (the beneficiary). Trusts can be used to avoid probate, protect assets, or specify conditions for distribution.",
    category: "Estate Planning",
    seeAlso: ["Revocable Living Trust", "Irrevocable Trust", "Beneficiary"],
  },
  {
    term: "Revocable Living Trust",
    definition:
      "A trust created during the grantor's lifetime that can be changed or revoked at any time. Assets in a revocable trust pass to beneficiaries without going through probate.",
    category: "Estate Planning",
    seeAlso: ["Trust", "Probate", "Irrevocable Trust"],
  },
  {
    term: "Irrevocable Trust",
    definition:
      "A trust that generally cannot be changed or revoked after it is created. Because the assets are transferred out of the grantor's estate, they may be protected from creditors and estate taxes.",
    category: "Estate Planning",
    seeAlso: ["Trust", "Revocable Living Trust", "Estate Tax"],
  },
  {
    term: "Executor",
    definition:
      "The person named in a will who is responsible for administering the estate, paying debts, filing final tax returns, and distributing assets to beneficiaries.",
    category: "Estate Planning",
    seeAlso: ["Will", "Probate", "Fiduciary"],
  },
  {
    term: "Probate",
    definition:
      "The court-supervised process of validating a will and overseeing the distribution of an estate. It can be time-consuming and is a public record. Assets held in trusts or with named beneficiaries typically avoid probate.",
    category: "Estate Planning",
    seeAlso: ["Will", "Estate", "Revocable Living Trust"],
  },
  {
    term: "Power of Attorney",
    definition:
      "A legal document granting someone authority to act on another person's behalf in financial or legal matters. A durable power of attorney remains effective even if the person becomes incapacitated.",
    category: "Estate Planning",
    seeAlso: ["Healthcare Proxy", "Fiduciary"],
  },
  {
    term: "Healthcare Proxy",
    definition:
      "A legal document designating someone to make medical decisions on your behalf if you are unable to do so. It is also called a healthcare power of attorney.",
    category: "Estate Planning",
    seeAlso: ["Power of Attorney", "Living Will"],
  },
  {
    term: "Living Will",
    definition:
      "A legal document expressing your wishes about end-of-life medical treatment if you become unable to communicate them, such as instructions about life support or resuscitation.",
    category: "Estate Planning",
    seeAlso: ["Healthcare Proxy", "Power of Attorney"],
  },
  {
    term: "Intestate",
    definition:
      "Dying without a valid will. When this happens, the state's laws determine how the estate is distributed, which may not reflect the deceased person's wishes.",
    category: "Estate Planning",
    seeAlso: ["Will", "Probate", "Estate"],
  },
  {
    term: "Estate Tax",
    definition:
      "A tax levied on the value of a person's estate before assets are distributed to heirs. It applies only above a certain threshold and is separate from the inheritance tax paid by recipients.",
    category: "Estate Planning",
    seeAlso: ["Estate", "Inheritance Tax", "Irrevocable Trust"],
  },
  {
    term: "Inheritance Tax",
    definition:
      "A tax paid by the person who receives assets from an estate, as opposed to the estate tax, which is paid by the estate itself. Not all states or countries impose it.",
    category: "Estate Planning",
    seeAlso: ["Estate Tax", "Estate"],
  },
  {
    term: "Gift Tax",
    definition:
      "A federal tax on the transfer of money or property to another person when the giver receives nothing, or less than full value, in return. The tax is paid by the giver, not the recipient.",
    category: "Estate Planning",
    seeAlso: ["Annual Gift Exclusion", "Estate Tax"],
  },
  {
    term: "Annual Gift Exclusion",
    definition:
      "The amount you can give to any single individual in a year without triggering gift tax reporting requirements. Amounts above this threshold count against a lifetime exemption.",
    category: "Estate Planning",
    seeAlso: ["Gift Tax", "Estate Tax"],
  },
  {
    term: "Stepped-Up Basis",
    definition:
      "A tax rule that resets the cost basis of an inherited asset to its market value at the time of the original owner's death. This can reduce or eliminate capital gains tax when the heir sells the asset.",
    category: "Estate Planning",
    seeAlso: ["Capital Gains Tax", "Inheritance Tax", "Asset"],
  },
  {
    term: "Guardianship",
    definition:
      "A legal relationship where a court appoints someone to make personal and financial decisions for a minor or incapacitated adult who cannot do so independently.",
    category: "Estate Planning",
    seeAlso: ["Will", "Power of Attorney"],
  },
  {
    term: "Per Stirpes",
    definition:
      "A Latin legal term used in wills and beneficiary designations meaning that if a beneficiary dies before the account holder, that beneficiary's share passes to their descendants rather than being divided among remaining beneficiaries.",
    category: "Estate Planning",
    seeAlso: ["Will", "Beneficiary Designation"],
  },
  {
    term: "Fiduciary",
    definition:
      "A person or organization legally and ethically obligated to act in another party's best interest. Executors, trustees, and certain financial professionals hold fiduciary duties.",
    category: "Estate Planning",
    seeAlso: ["Executor", "Trust", "Power of Attorney"],
  },
  {
    term: "Contingent Beneficiary",
    definition:
      "A backup beneficiary who receives assets only if the primary beneficiary is unable to, typically because they have predeceased the account holder.",
    category: "Estate Planning",
    seeAlso: ["Beneficiary", "Beneficiary Designation", "Per Stirpes"],
  },
];
