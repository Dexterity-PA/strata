import { test, expect } from "@playwright/test";

test.describe("tool calculators", () => {
  test("breakeven calculator computes units and revenue", async ({ page }) => {
    await page.goto("/tools/breakeven");

    await page.getByLabel("Fixed monthly costs").fill("10000");
    await page.getByLabel("Price per unit").fill("50");
    await page.getByLabel("Variable cost per unit").fill("30");

    // Margin is 50 - 30 = 20 per unit. Units are ceil(10000 / 20) = 500.
    // Breakeven revenue is 500 * 50 = 25,000.
    const result = page.getByRole("status");
    await expect(result).toContainText("$20");
    await expect(result).toContainText("500");
    await expect(result).toContainText("$25,000");
  });

  test("emergency fund calculator computes the target and timeline", async ({
    page,
  }) => {
    await page.goto("/tools/emergency-fund");

    await page.getByLabel("Essential monthly expenses").fill("2000");
    await page
      .getByRole("group", { name: "Months of cushion" })
      .getByText("6", { exact: true })
      .click();
    await page.getByLabel("Already saved (optional)").fill("3000");
    await page.getByLabel("Monthly contribution (optional)").fill("500");

    // Target is 2000 * 6 = 12,000. The gap is 12,000 - 3,000 = 9,000.
    // Time to target is ceil(9,000 / 500) = 18 months, shown as "1 yr 6 mo".
    const result = page.getByRole("status");
    await expect(result).toContainText("$12,000");
    await expect(result).toContainText("$9,000");
    await expect(result).toContainText("1 yr 6 mo");
  });
});
