import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

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
}

export const sendQuoteEmail = createServerFn({ method: "POST" })
  .validator((data: QuoteEmailPayload) => data)
  .handler(async ({ data }) => {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not configured.");
      return { success: false, error: "Email configuration missing." };
    }

    const resend = new Resend(resendApiKey);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Caplan Environmental Ltd</h1>
          <p style="color: #10b981; margin: 4px 0 0 0; font-size: 14px; font-weight: 600; tracking: 1px;">QUOTE REQUEST CONFIRMATION</p>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0;">Hello ${data.fullName},</h2>
          <p>Thank you for reaching out to <strong>Caplan Environmental Ltd</strong>! We have received your request for a quote.</p>
          <p>Our expert team is reviewing your requirements and will contact you shortly via <strong>${data.preferredContactMethod || "Email/Phone"}</strong> with a detailed quote.</p>
          
          <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; margin: 24px 0; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #0f172a; font-size: 16px;">Summary of Your Request:</h3>
            <ul style="margin: 0; padding-left: 20px; color: #475569;">
              <li><strong>Name:</strong> ${data.fullName}</li>
              <li><strong>Email:</strong> ${data.email}</li>
              <li><strong>Phone:</strong> ${data.phone}</li>
              ${data.service ? `<li><strong>Service Required:</strong> ${data.service}</li>` : ""}
              ${data.propertyType ? `<li><strong>Property Type:</strong> ${data.propertyType}</li>` : ""}
              ${data.propertySize ? `<li><strong>Property Size:</strong> ${data.propertySize} sq ft</li>` : ""}
              ${data.address ? `<li><strong>Address:</strong> ${data.address}${data.city ? `, ${data.city}` : ""}${data.postalCode ? ` ${data.postalCode}` : ""}</li>` : ""}
              ${data.message ? `<li><strong>Additional Notes:</strong> ${data.message}</li>` : ""}
            </ul>
          </div>
          
          <p>If you have any urgent inquiries or need immediate emergency pest control assistance, please call us directly at <strong>(800) 555-0100</strong>.</p>
          
          <p style="margin-bottom: 0;">Best regards,<br><strong>Caplan Environmental Ltd Team</strong></p>
        </div>
        
        <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Caplan Environmental Ltd. All rights reserved.</p>
          <p style="margin: 4px 0 0 0;">Eco-friendly & guaranteed pest control solutions.</p>
        </div>
      </div>
    `;

    try {
      const response = await resend.emails.send({
        from: "Caplan Environmental <onboarding@resend.dev>",
        to: [data.email],
        subject: "We received your Quote Request — Caplan Environmental Ltd",
        html: emailHtml,
      });

      if (response.error) {
        console.error("Resend API error:", response.error);
        return { success: false, error: response.error.message };
      }

      return { success: true, data: response.data };
    } catch (err: any) {
      console.error("Error sending email via Resend:", err);
      return { success: false, error: err.message || "Failed to send email." };
    }
  });
