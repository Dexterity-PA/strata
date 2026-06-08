import { test, expect } from "@playwright/test";

test.describe("newsletter signup", () => {
  test("subscribes through the footer without hitting Resend", async ({
    page,
  }) => {
    // Intercept the subscribe API so no contact is ever created in Resend.
    let subscribePayload: Record<string, unknown> | null = null;
    await page.route("**/api/subscribe", async (route) => {
      subscribePayload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/");

    await page.getByLabel("Email address").fill("reader@example.com");
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(page.getByText("Thanks for subscribing")).toBeVisible();
    expect(subscribePayload).toMatchObject({ email: "reader@example.com" });
  });
});
