"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (min 2 characters).")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(200, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(5000, "Message is too long (max 5000 characters)."),
  // Honeypot — must be empty. Bots commonly auto-fill this.
  company: z.string().max(0, "Spam blocked.").optional().default(""),
});

export type SendResult = { ok: true } | { ok: false, error: string };

const RECIPIENT = "jkoli6704@gmail.com";
const FROM = "Portfolio Contact <onboarding@resend.dev>";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(input: { name: string; email: string; message: string }) {
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br/>");
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#eaeaea;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="font-family:Georgia,serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#FF2E63;">/ New Portfolio Inquiry</div>
      <h1 style="margin:8px 0 24px;font-size:22px;font-weight:700;letter-spacing:-0.01em;color:#ffffff;">From ${safeName}</h1>
      <table role="presentation" style="width:100%;border-collapse:collapse;background:#141416;border:1px solid #2a2a2e;border-radius:12px;">
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid #2a2a2e;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#9a9aa0;width:90px;">Name</td>
          <td style="padding:14px 18px;border-bottom:1px solid #2a2a2e;font-size:14px;color:#eaeaea;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid #2a2a2e;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#9a9aa0;">Email</td>
          <td style="padding:14px 18px;border-bottom:1px solid #2a2a2e;font-size:14px;color:#eaeaea;"><a href="mailto:${safeEmail}" style="color:#FF2E63;text-decoration:none;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:14px 18px;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;color:#9a9aa0;vertical-align:top;">Message</td>
          <td style="padding:14px 18px;font-size:14px;color:#eaeaea;line-height:1.6;">${safeMessage}</td>
        </tr>
      </table>
      <p style="margin:24px 0 0;font-size:12px;color:#6a6a70;">Sent from jayeshkoli.dev contact form. Reply directly to this email to reach the sender.</p>
    </div>
  </body>
</html>`;
}

function renderText(input: { name: string; email: string; message: string }) {
  return `New portfolio inquiry from ${input.name}

Name:    ${input.name}
Email:   ${input.email}

Message:
${input.message}

---
Sent from jayeshkoli.dev contact form. Reply directly to this email to reach the sender.`;
}

export async function sendMessage(formData: FormData): Promise<SendResult> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid input.";
    return { ok: false, error: first };
  }

  // Silently swallow honeypot trips so bots don't get useful feedback.
  if (parsed.data.company && parsed.data.company.length > 0) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[send-message] RESEND_API_KEY is not set.");
    return {
      ok: false,
      error:
        "Email service is not configured yet. Please email jkoli6704@gmail.com directly.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `New portfolio inquiry from ${parsed.data.name}`;

    const result = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: parsed.data.email,
      subject,
      html: renderHtml(parsed.data),
      text: renderText(parsed.data),
    });

    if (result.error) {
      console.error("[send-message] Resend error:", result.error);
      return {
        ok: false,
        error:
          "Could not send right now. Please try again in a moment, or email me directly.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[send-message] Unexpected error:", err);
    return {
      ok: false,
      error:
        "Something went wrong. Please try again, or email jkoli6704@gmail.com directly.",
    };
  }
}
