import { test, expect } from "@playwright/test";

test.describe("faq accordion", () => {
  test("opens and closes an answer", async ({ page }) => {
    await page.goto("/faq");

    // The first item starts open, so use a closed one to exercise the toggle.
    const toggle = page.getByRole("button", {
      name: "Are you a licensed financial advisor?",
    });
    const answer = page.getByText(
      "Strata provides financial education and planning support",
    );

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(answer).toBeHidden();

    // Open it.
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(answer).toBeVisible();

    // Close it again.
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(answer).toBeHidden();
  });
});
