import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Newsletter signup. Validates the email server-side and adds it to the
 * Resend audience as a subscribed contact. RESEND_API_KEY and
 * RESEND_AUDIENCE_ID are read here only — never shipped to the client.
 */

const MAX_EMAIL_LENGTH = 200;

// Mirrors the client-side pattern in newsletter-signup.tsx.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }
  const { email, company } = body as Record<string, unknown>;

  // Honeypot (same trap as the contact form): the visible form never fills
  // "company". A non-empty value means a bot — pretend success so it doesn't
  // learn the field is a trap, and subscribe nothing.
  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof email !== "string" ||
    !email.trim() ||
    email.trim().length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error(
      "RESEND_API_KEY or RESEND_AUDIENCE_ID is not set; newsletter signup cannot subscribe.",
    );
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  // Resend renamed Audiences to Segments, but the audiences/contacts API
  // (audienceId) is still the supported way to add a contact.
  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({
    audienceId,
    email: email.trim(),
    unsubscribed: false,
  });

  if (error) {
    // An address that's already on the list is success from the visitor's
    // point of view — saying otherwise would leak who is subscribed.
    if (/already exist/i.test(error.message)) {
      return NextResponse.json({ ok: true });
    }
    // Log the detail server-side; never expose provider errors to the client.
    console.error("Resend contact create failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
