import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

const OWNER_EMAIL = "caplanenvironmentalltd@outlook.com";
const NOTIFICATION_SUBJECT = "New Quote Request - Caplan Environmental Ltd";

interface QuoteEmailPayload {
  fullName: string;
  email: string;
  phone: string;
  service?: string;
  propertyType?: string;
  propertySize?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  preferredContactMethod?: string;
  message?: string;
  submittedAt: string; // ISO string from the client
}

function row(label: string, value: string | undefined | null) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#374151;background:#f9fafb;white-space:nowrap;border-bottom:1px solid #e5e7eb;">${label}</td>
      <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #e5e7eb;">${value}</td>
    </tr>`;
}

function buildNotificationHtml(data: QuoteEmailPayload): string {
  const address = [data.address, data.city, data.postalCode]
    .filter(Boolean)
    .join(", ");

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111827;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <div style="background:#0f172a;padding:24px;">
        <h1 style="color:#ffffff;margin:0;font-size:22px;">Caplan Environmental Ltd</h1>
        <p style="color:#10b981;margin:6px 0 0;font-size:13px;font-weight:600;letter-spacing:0.05em;">NEW QUOTE REQUEST</p>
      </div>

      <div style="padding:28px 24px;">
        <p style="margin:0 0 20px;font-size:15px;color:#374151;">
          A new quote request has been submitted via the website. Details are below.
        </p>

        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;font-size:14px;">
          ${row("Customer Name", data.fullName)}
          ${row("Email Address", data.email)}
          ${row("Phone Number", data.phone)}
          ${row("Property Type", data.propertyType)}
          ${row("Pest Issue", data.service)}
          ${row("Property Size", data.propertySize)}
          ${row("Service Address", address || undefined)}
          ${row("Message", data.message)}
          ${row("Submitted At", data.submittedAt)}
        </table>
      </div>

      <div style="background:#f1f5f9;padding:14px 24px;text-align:center;font-size:12px;color:#6b7280;">
        © ${new Date().getFullYear()} Caplan Environmental Ltd — This is an automated notification. Do not reply.
      </div>
    </div>
  `;
}

export const sendQuoteEmail = createServerFn({ method: "POST" })
  .validator((data: QuoteEmailPayload) => data)
  .handler(async ({ data }) => {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("[sendQuoteEmail] RESEND_API_KEY is not configured.");
      return { success: false, error: "Email configuration missing." };
    }

    const resend = new Resend(resendApiKey);

    try {
      const response = await resend.emails.send({
        from: "Caplan Environmental <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: NOTIFICATION_SUBJECT,
        html: buildNotificationHtml(data),
      });

      if (response.error) {
        console.error("[sendQuoteEmail] Resend API error:", response.error);
        return { success: false, error: response.error.message };
      }

      return { success: true };
    } catch (err: any) {
      console.error("[sendQuoteEmail] Unexpected error:", err);
      return { success: false, error: err.message || "Failed to send notification email." };
    }
  });
