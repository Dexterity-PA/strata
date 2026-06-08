import { test, expect } from "@playwright/test";

test.describe("contact form", () => {
  test("completes the guided intake without sending a real email", async ({
    page,
  }) => {
    // Intercept the contact API so nothing is ever delivered through Resend.
    let contactPayload: Record<string, unknown> | null = null;
    await page.route("**/api/contact", async (route) => {
      contactPayload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contact");

    // Step 1: who the inquiry is for.
    await page.getByRole("radio", { name: /For a business/ }).check();
    await page.getByRole("button", { name: "Continue" }).click();

    // Step 2: the money question.
    await page
      .getByLabel("The one money question on your mind")
      .fill("How should I manage cash flow through a slow season?");
    await page.getByRole("button", { name: "Continue" }).click();

    // Step 3: contact details.
    await page.getByLabel("Your name").fill("Jordan Tester");
    await page.getByLabel("Email", { exact: true }).fill("jordan@example.com");
    await page.getByRole("button", { name: "Send it over" }).click();

    // The confirmation replaces the form once the submission succeeds.
    await expect(
      page.getByRole("heading", {
        name: "Got it. Here is what happens next.",
      }),
    ).toBeVisible();

    // The intercepted request carried the values the form collected.
    expect(contactPayload).toMatchObject({
      name: "Jordan Tester",
      email: "jordan@example.com",
      role: "small-business",
    });
  });
});
