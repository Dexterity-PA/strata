import { Fraunces, Inter } from "next/font/google";

/**
 * Display serif — editorial, trustworthy. Exposed as --font-fraunces and
 * mapped to the `font-st-display` utility in globals.css.
 */
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  display: "swap",
});

/**
 * Body grotesk — clean, neutral. Exposed as --font-inter and mapped to the
 * `font-st-sans` utility in globals.css.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
