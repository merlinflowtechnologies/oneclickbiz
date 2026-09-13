import nodemailer from 'nodemailer';
import { Resend } from 'resend';

/**
 * Sends a real password reset OTP email to the user's inbox
 */
export async function sendPasswordResetEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - OneClickBiz</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="560px" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 24px; padding: 40px 32px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                
                <!-- Logo -->
                <tr>
                  <td align="center" style="padding-bottom: 24px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #ec4899); border-radius: 16px; padding: 12px 16px; font-weight: 800; font-size: 18px; color: #ffffff; letter-spacing: 0.5px;">
                      ⚡ OneClickBiz
                    </div>
                  </td>
                </tr>

                <!-- Header Title -->
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Password Reset Verification
                    </h1>
                  </td>
                </tr>

                <!-- Description -->
                <tr>
                  <td align="center" style="padding-bottom: 28px;">
                    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #94a3b8;">
                      We received a request to reset the password for your OneClickBiz account. Use the 6-digit verification code below to complete your password reset.
                    </p>
                  </td>
                </tr>

                <!-- OTP Code Box -->
                <tr>
                  <td align="center" style="padding-bottom: 28px;">
                    <div style="background: #1e1b4b; border: 2px dashed #6366f1; border-radius: 16px; padding: 20px 32px; display: inline-block;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #818cf8; margin-bottom: 6px;">
                        Your 6-Digit Verification Code
                      </div>
                      <div style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #ffffff; font-family: 'Courier New', monospace;">
                        ${otpCode}
                      </div>
                      <div style="font-size: 11px; color: #94a3b8; margin-top: 6px;">
                        ⏱️ Valid for 15 minutes
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- Security Notice -->
                <tr>
                  <td style="padding-bottom: 28px;">
                    <div style="background-color: #090d16; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 14px 16px; font-size: 12px; color: #cbd5e1; line-height: 18px;">
                      <strong>Security Tip:</strong> If you did not request this password reset, you can safely ignore this email. Your password will remain unchanged and your account is secure.
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="border-top: 1px solid #1e293b; padding-top: 24px;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
                      OneClickBiz • Smart Digital Business Cards &amp; Commerce Platform
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #475569;">
                      Hyderabad, Telangana, India • <a href="https://oneclickbiz.in" style="color: #6366f1; text-decoration: none;">oneclickbiz.in</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const subject = `Your OneClickBiz Password Reset Code is ${otpCode}`;
    const textContent = `Your OneClickBiz password reset verification code is: ${otpCode}. This code will expire in 15 minutes. If you did not request this, please ignore this email.`;

    // -------------------------------------------------------------
    // PRIORITY 1: RESEND API (HTTP API - Fast & 100% Free)
    // -------------------------------------------------------------
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const resendFrom = process.env.RESEND_FROM || process.env.SMTP_FROM || 'OneClickBiz <onboarding@resend.dev>';
      
      const { data, error } = await resend.emails.send({
        from: resendFrom,
        to: [toEmail],
        subject: subject,
        text: textContent,
        html: htmlContent,
      });

      if (error) {
        console.error('[RESEND_API_ERROR]', error);
        throw new Error(error.message);
      }

      console.log(`[RESEND_EMAIL_SUCCESS] Verification email sent to ${toEmail}. ID: ${data?.id}`);
      return { success: true, messageId: data?.id };
    }

    // -------------------------------------------------------------
    // PRIORITY 2: STANDARD SMTP (Gmail / Custom SMTP / Brevo)
    // -------------------------------------------------------------
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const fromAddress = process.env.SMTP_FROM || `"OneClickBiz Security" <${smtpUser}>`;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: toEmail,
        subject: subject,
        text: textContent,
        html: htmlContent,
      });

      console.log(`[SMTP_EMAIL_SUCCESS] Verification email sent to ${toEmail}. Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    }

    // Fallback if no credentials provided yet
    console.warn('[EMAIL_SERVICE] Neither RESEND_API_KEY nor SMTP credentials configured in .env.');
    console.log(`[PASSWORD_RESET_SIMULATED] -> To: ${toEmail} | Code: ${otpCode}`);
    return { success: true };

  } catch (error: any) {
    console.error('[EMAIL_SERVICE_ERROR] Failed to send email:', error);
    return { success: false, error: error.message };
  }
}
