import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form delivery. Validates the submission server-side and emails it
 * via Resend. RESEND_API_KEY is read here only — never shipped to the client.
 */

// Verified domain sender (stratafinancialplanning.com is verified in Resend),
// so mail can be delivered to any recipient.
const FROM_ADDRESS = "Strata <hello@stratafinancialplanning.com>";
const TO_ADDRESS = "praneeth.a2027@gmail.com";

const MAX_MESSAGE_LENGTH = 5000;
const MAX_FIELD_LENGTH = 200;

// Mirrors the client-side pattern in guided-intake.tsx.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Values must match the form's "You are" select options exactly.
const AUDIENCE_LABELS: Record<string, string> = {
  individual: "Individual",
  "small-business": "Small business",
};

interface Submission {
  name: string;
  email: string;
  role: string;
  message: string;
  /** Optional "anything else" note from the guided intake. */
  details: string;
}

function parseSubmission(
  body: unknown,
): { data: Submission } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body." };
  }
  const { name, email, role, message, details } = body as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Please enter your name." };
  }
  if (name.trim().length > MAX_FIELD_LENGTH) {
    return { error: "Name is too long." };
  }
  if (
    typeof email !== "string" ||
    !email.trim() ||
    email.trim().length > MAX_FIELD_LENGTH ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return { error: "Please enter a valid email address." };
  }
  if (typeof role !== "string" || !(role in AUDIENCE_LABELS)) {
    return { error: "Please choose who you are." };
  }
  if (typeof message !== "string" || !message.trim()) {
    return { error: "Please tell us a bit about your situation." };
  }
  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return {
      error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
    };
  }

  // Optional "anything else" note from the guided intake.
  let trimmedDetails = "";
  if (typeof details === "string") {
    trimmedDetails = details.trim();
    if (trimmedDetails.length > MAX_MESSAGE_LENGTH) {
      return {
        error: `The extra note is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
      };
    }
  }

  return {
    data: {
      name: name.trim(),
      email: email.trim(),
      role,
      message: message.trim(),
      details: trimmedDetails,
    },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  // Honeypot: the visible form never fills "company". A non-empty value
  // means a bot — pretend success so it doesn't learn the field is a trap,
  // and send nothing.
  const company = (body as Record<string, unknown> | null)?.company;
  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseSubmission(body);
  if ("error" in parsed) {
    return NextResponse.json(
      { ok: false, error: parsed.error },
      { status: 400 },
    );
  }
  const { name, email, role, message, details } = parsed.data;
  const audience = AUDIENCE_LABELS[role];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; contact form cannot deliver.");
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  // Note: no rate limiting yet. If spam becomes a problem, add a small
  // per-IP limiter (e.g. Upstash Ratelimit or Vercel WAF rate-limit rule).
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: email,
    subject: `Strata inquiry — ${name} (${audience})`,
    text: [
      "New inquiry from the Strata contact form.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `You are: ${audience}`,
      "",
      "Question on their mind:",
      message,
      ...(details ? ["", "Anything else:", details] : []),
    ].join("\n"),
    html: [
      "<p>New inquiry from the Strata contact form.</p>",
      `<p><strong>Name:</strong> ${escapeHtml(name)}<br/>`,
      `<strong>Email:</strong> ${escapeHtml(email)}<br/>`,
      `<strong>You are:</strong> ${escapeHtml(audience)}</p>`,
      "<p><strong>Question on their mind:</strong></p>",
      `<p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
      ...(details
        ? [
            "<p><strong>Anything else:</strong></p>",
            `<p>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>`,
          ]
        : []),
    ].join("\n"),
  });

  if (error) {
    // Log the detail server-side; never expose provider errors to the client.
    console.error("Resend send failed:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
