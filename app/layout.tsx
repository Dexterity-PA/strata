import type { Metadata, Viewport } from "next";
import { IntroReveal } from "@/components/intro/intro-reveal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} h-full antialiased`}
    >
      {/* The intro reveal's pre-paint script sets body overflow:hidden to
          lock scroll before hydration; that lock is inherently client-only
          (it depends on sessionStorage + reduced-motion), so the server can't
          render it. suppressHydrationWarning marks that single-attribute
          difference as intentional. The lock is applied/released and
          fail-safed in IntroReveal. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <MotionProvider>
          <SmoothScrollProvider>
            {/* First-paint curtain; renders once per session, page paints beneath */}
            <IntroReveal />
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
