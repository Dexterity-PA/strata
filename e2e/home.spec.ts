import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("loads and shows the hero", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Good financial guidance");

    await expect(page.getByText("A student-led initiative")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Start a conversation" }).first(),
    ).toBeVisible();
  });
});
