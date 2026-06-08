import { test, expect } from "@playwright/test";

/**
 * Primary destinations reachable from the nav and footer. Each must respond
 * with 200 and must not fall through to the not found page.
 */
const PRIMARY_ROUTES = [
  "/",
  "/services",
  "/pricing",
  "/about",
  "/process",
  "/how-it-works",
  "/insights",
  "/tools",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/disclosures",
];

test.describe("site navigation", () => {
  test("nav renders with the wordmark and primary links", async ({ page }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav).toBeVisible();

    // The wordmark links back home (scoped to the nav, since the footer
    // carries the same wordmark).
    await expect(
      nav.getByRole("link", { name: "Strata Financial Planning, home" }),
    ).toBeVisible();

    // The desktop nav exposes the primary destinations.
    await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Tools" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  for (const route of PRIMARY_ROUTES) {
    test(`primary route resolves without a 404: ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response, `no response for ${route}`).not.toBeNull();
      expect(response!.status(), `unexpected status for ${route}`).toBe(200);

      // The not found copy must never show up on a real route.
      await expect(
        page.getByText("This page took an unplanned detour."),
      ).toHaveCount(0);
    });
  }

  test("renders the 404 page for an unknown route", async ({ page }) => {
    const response = await page.goto("/definitely-not-a-real-page-9f3a2b");
    expect(response?.status()).toBe(404);

    await expect(
      page.getByRole("heading", {
        name: "This page took an unplanned detour.",
      }),
    ).toBeVisible();
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByRole("link", { name: "Return home" })).toBeVisible();
  });
});
