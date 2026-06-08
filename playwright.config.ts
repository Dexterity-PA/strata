import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright end to end config for Strata Financial Planning.
 *
 * The suite runs against the Next dev server on port 3100 (kept off the
 * default 3000 so a separately running dev server does not get reused by
 * accident). Playwright starts the server itself via the webServer block, so
 * "playwright test" is the only command needed.
 *
 * The specs use Playwright's auto-waiting (locators wait for elements to be
 * actionable), which lets entrance reveals settle before each interaction.
 */

const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npx next dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
