import nodemailer from "nodemailer";
import type { Express } from "express";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// ── Transporter ─────────────────────────────────────────────────────────────
// Uses Gmail with an App Password stored in env vars.
// If SMTP_USER / SMTP_PASS are not set, falls back to Ethereal (test mode).
async function getTransporter() {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Ethereal fallback – useful in dev (logs a preview URL to console)
  const testAccount = await nodemailer.createTestAccount();
  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  return transport;
}

// ── Register route ────────────────────────────────────────────────────────────
export function registerEmailRoute(app: Express) {
  app.post("/api/send-report-notification", async (req, res) => {
    const {
      recipientEmail = "khushikumari14034331@gmail.com",
      material = "Steel",
      filename = "Ayaskriti_LCA_Report.pdf",
      reportType = "PDF",
    } = req.body ?? {};

    try {
      const transporter = await getTransporter();
      const date = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_USER
          ? `"AYASKRITI LCA" <${process.env.SMTP_USER}>`
          : '"AYASKRITI LCA" <noreply@ayaskriti.ai>',
        to: recipientEmail,
        subject: `✅ Your LCA ${reportType} Report is Ready – ${material}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Report Ready – AYASKRITI LCA</title>
</head>
<body style="margin:0;padding:0;background:#1a0e08;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#1a0e08;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;border-radius:16px;overflow:hidden;
                      border:1px solid #5c3317;background:#2c1810;">

          <!-- Header band -->
          <tr>
            <td style="background:linear-gradient(135deg,#5c3317 0%,#8b4513 50%,#c49a6c 100%);
                        padding:32px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:4px;color:#f5deb3;
                         text-transform:uppercase;">AI-Powered Sustainability Platform</p>
              <h1 style="margin:0;font-size:32px;font-weight:900;color:#fff;letter-spacing:-1px;">
                AYASKRITI
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:#f5deb3;letter-spacing:1px;">
                Life Cycle Assessment
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <!-- Status badge -->
              <div style="text-align:center;margin-bottom:28px;">
                <span style="display:inline-block;background:#22c55e22;border:1px solid #22c55e;
                              color:#22c55e;border-radius:24px;padding:6px 20px;font-size:13px;
                              font-weight:600;letter-spacing:0.5px;">
                  ✅ Report Successfully Generated
                </span>
              </div>

              <p style="margin:0 0 16px;font-size:16px;color:#f5deb3;line-height:1.6;">
                Hello,
              </p>
              <p style="margin:0 0 24px;font-size:15px;color:#d4a27a;line-height:1.7;">
                Your <strong style="color:#f5deb3;">Life Cycle Assessment ${reportType} Report</strong>
                for <strong style="color:#c49a6c;">${material}</strong> production has been
                successfully generated and downloaded to your device.
              </p>

              <!-- Info card -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#3e1c00;border-radius:12px;border:1px solid #5c3317;
                             margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;color:#a07050;font-size:12px;
                                    text-transform:uppercase;letter-spacing:1px;width:40%;">
                          Report File
                        </td>
                        <td style="padding:6px 0;color:#f5deb3;font-size:13px;font-weight:600;">
                          ${filename}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#a07050;font-size:12px;
                                    text-transform:uppercase;letter-spacing:1px;">
                          Material
                        </td>
                        <td style="padding:6px 0;color:#f5deb3;font-size:13px;font-weight:600;">
                          ${material}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#a07050;font-size:12px;
                                    text-transform:uppercase;letter-spacing:1px;">
                          Generated On
                        </td>
                        <td style="padding:6px 0;color:#f5deb3;font-size:13px;font-weight:600;">
                          ${date}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#a07050;font-size:12px;
                                    text-transform:uppercase;letter-spacing:1px;">
                          Report Type
                        </td>
                        <td style="padding:6px 0;color:#f5deb3;font-size:13px;font-weight:600;">
                          ${reportType === "PDF" ? "📄 PDF Document" : "📊 Excel Spreadsheet"}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Highlights -->
              <p style="margin:0 0 12px;font-size:13px;color:#a07050;
                          text-transform:uppercase;letter-spacing:1px;font-weight:600;">
                Report Highlights
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                ${[
                  ["🌿", "Emissions Breakdown", "Scope 1, 2 & 3 GHG analysis"],
                  ["⚡", "Energy Metrics",      "Intensity & efficiency indicators"],
                  ["♻️", "LCA Comparison",     "Circular vs linear lifecycle"],
                  ["💡", "Recommendations",    "5 actionable sustainability strategies"],
                ]
                  .map(
                    ([icon, title, desc]) => `
                <tr>
                  <td style="padding:6px 0;">
                    <div style="background:#3e1c00;border:1px solid #5c3317;border-radius:8px;
                                 padding:12px 16px;display:flex;align-items:center;">
                      <span style="font-size:20px;margin-right:12px;">${icon}</span>
                      <span>
                        <strong style="color:#f5deb3;font-size:13px;">${title}</strong>
                        <span style="color:#a07050;font-size:12px;"> – ${desc}</span>
                      </span>
                    </div>
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>

              <p style="margin:0;font-size:14px;color:#a07050;line-height:1.6;">
                This report was generated by the AYASKRITI AI platform. The file has been
                saved to your downloads folder. Please check your browser's download manager
                if you cannot find it.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1a0e08;padding:20px 40px;text-align:center;
                        border-top:1px solid #3e1c00;">
              <p style="margin:0 0 4px;font-size:11px;color:#5c3317;letter-spacing:2px;
                          text-transform:uppercase;">
                AYASKRITI – AI-Powered LCA Platform
              </p>
              <p style="margin:0;font-size:11px;color:#5c3317;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      });

      // In development with Ethereal, log the preview URL
      if (!process.env.SMTP_USER) {
        console.log(
          "📧 [Ethereal preview] →",
          nodemailer.getTestMessageUrl(info)
        );
      }

      res.json({ success: true, messageId: info.messageId });
    } catch (err: any) {
      console.error("Email send error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  });
}
