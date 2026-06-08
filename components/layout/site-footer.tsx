import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NewsletterSignup } from "@/components/layout/newsletter-signup";
import { FOOTER_EXPLORE_LINKS, LEGAL_LINKS, SITE } from "@/lib/site";

/** Multi-column site footer on inverse (deep navy) ground. */
export function SiteFooter() {
  return (
    <footer className="bg-st-ink text-st-paper">
      <Container className="py-st-section-sm">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1.5fr]">
          {/* Wordmark + positioning line */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-st-display text-3xl tracking-tight"
              aria-label={`${SITE.name}, home`}
            >
              Strata
              <span aria-hidden className="text-st-accent-bright">
                .
              </span>
            </Link>
            <p className="max-w-xs text-st-small text-st-paper/65">
              {SITE.description}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="mb-4 text-st-eyebrow font-medium uppercase tracking-[0.18em] text-st-accent-bright">
              Explore
            </h2>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-st-small text-st-paper/75 transition-colors duration-(--st-dur-fast) hover:text-st-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h2 className="mb-4 text-st-eyebrow font-medium uppercase tracking-[0.18em] text-st-accent-bright">
              Legal
            </h2>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-st-small text-st-paper/75 transition-colors duration-(--st-dur-fast) hover:text-st-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-st-eyebrow font-medium uppercase tracking-[0.18em] text-st-accent-bright">
              Contact
            </h2>
            <ul className="flex flex-col gap-2.5 text-st-small text-st-paper/75">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-(--st-dur-fast) hover:text-st-paper"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-14 border-t border-st-line-dark pt-10">
          <NewsletterSignup />
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-st-line-dark pt-6 text-xs text-st-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Free financial education and planning support.</p>
        </div>
      </Container>
    </footer>
  );
}
