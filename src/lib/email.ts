const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@mojetech.com";
const FROM_NAME = "MojeTech Academy";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn(`[Email] SENDGRID_API_KEY not set. Email to ${to} not sent.`);
    return;
  }

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject,
      content: [{ type: "text/html", value: html }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${body}`);
  }
}

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:#1e3a5f;padding:24px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">MojeTech Academy</h1>
      <p style="color:#93c5fd;margin:4px 0 0;font-size:14px;">Empowering Africa's Tech Future</p>
    </div>
    <div style="padding:32px 24px;">
      ${content}
    </div>
    <div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="color:#6b7280;font-size:12px;margin:0;">MojeTech Academy, Lagos, Nigeria</p>
      <p style="color:#9ca3af;font-size:11px;margin:4px 0 0;">You received this email because you're registered on MojeTech.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendWelcomeEmail(
  to: string,
  name: string,
  cohortName: string,
  startDate: string
): Promise<void> {
  const html = baseTemplate(`
    <h2 style="color:#1e3a5f;margin:0 0 16px;">Welcome to MojeTech, ${name}!</h2>
    <p style="color:#374151;line-height:1.6;">You've been enrolled in <strong>${cohortName}</strong>.</p>
    <p style="color:#374151;line-height:1.6;">Your cohort begins on <strong>${startDate}</strong>.</p>
    <div style="margin:24px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
         style="background:#1e3a5f;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;">
        Go to Dashboard
      </a>
    </div>
    <p style="color:#6b7280;font-size:14px;">We're excited to have you on this journey!</p>
  `);

  await sendEmail({ to, subject: `Welcome to ${cohortName} - MojeTech`, html });
}

export async function sendEnrollmentConfirmation(
  to: string,
  name: string,
  programName: string
): Promise<void> {
  const html = baseTemplate(`
    <h2 style="color:#1e3a5f;margin:0 0 16px;">Enrollment Confirmed</h2>
    <p style="color:#374151;line-height:1.6;">Hi ${name},</p>
    <p style="color:#374151;line-height:1.6;">Your enrollment in <strong>${programName}</strong> has been confirmed. Payment received successfully.</p>
    <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:16px;margin:20px 0;">
      <p style="color:#065f46;margin:0;">You now have full access to all course materials and live sessions.</p>
    </div>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
       style="background:#1e3a5f;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;">
      Start Learning
    </a>
  `);

  await sendEmail({ to, subject: `Enrollment Confirmed - ${programName}`, html });
}

export async function sendAssignmentGraded(
  to: string,
  name: string,
  assignmentTitle: string,
  score: number,
  feedback: string
): Promise<void> {
  const html = baseTemplate(`
    <h2 style="color:#1e3a5f;margin:0 0 16px;">Assignment Graded</h2>
    <p style="color:#374151;line-height:1.6;">Hi ${name},</p>
    <p style="color:#374151;line-height:1.6;">Your assignment <strong>"${assignmentTitle}"</strong> has been graded.</p>
    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px;margin:20px 0;">
      <p style="color:#1e3a5f;font-size:24px;font-weight:bold;margin:0;">Score: ${score}%</p>
    </div>
    <p style="color:#374151;line-height:1.6;"><strong>Feedback:</strong></p>
    <p style="color:#6b7280;line-height:1.6;background:#f9fafb;padding:12px;border-radius:6px;">${feedback}</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/assignments"
       style="background:#1e3a5f;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin-top:16px;">
      View Assignment
    </a>
  `);

  await sendEmail({ to, subject: `Assignment Graded: ${assignmentTitle}`, html });
}

export async function sendCertificateIssued(
  to: string,
  name: string,
  certificateId: string,
  downloadLink: string
): Promise<void> {
  const html = baseTemplate(`
    <h2 style="color:#1e3a5f;margin:0 0 16px;">Congratulations, ${name}!</h2>
    <p style="color:#374151;line-height:1.6;">Your certificate has been issued.</p>
    <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:20px 0;text-align:center;">
      <p style="color:#92400e;margin:0 0 8px;font-weight:bold;">Certificate ID</p>
      <p style="color:#78350f;font-size:18px;margin:0;font-family:monospace;">${certificateId}</p>
    </div>
    <div style="text-align:center;margin:24px 0;">
      <a href="${downloadLink}"
         style="background:#059669;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;display:inline-block;font-weight:bold;">
        Download Certificate
      </a>
    </div>
    <p style="color:#6b7280;font-size:14px;">Share your achievement on LinkedIn and social media!</p>
  `);

  await sendEmail({ to, subject: "Your MojeTech Certificate is Ready!", html });
}

export async function sendPasswordReset(to: string, resetLink: string): Promise<void> {
  const html = baseTemplate(`
    <h2 style="color:#1e3a5f;margin:0 0 16px;">Reset Your Password</h2>
    <p style="color:#374151;line-height:1.6;">We received a request to reset your password. Click the button below to set a new one.</p>
    <div style="text-align:center;margin:24px 0;">
      <a href="${resetLink}"
         style="background:#dc2626;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;">
        Reset Password
      </a>
    </div>
    <p style="color:#6b7280;font-size:14px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
  `);

  await sendEmail({ to, subject: "Password Reset - MojeTech", html });
}

export async function sendSessionReminder(
  to: string,
  mentorName: string,
  dateTime: string,
  joinLink: string
): Promise<void> {
  const html = baseTemplate(`
    <h2 style="color:#1e3a5f;margin:0 0 16px;">Session Reminder</h2>
    <p style="color:#374151;line-height:1.6;">Your mentoring session is coming up!</p>
    <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px;margin:20px 0;">
      <p style="color:#1e3a5f;margin:0 0 8px;"><strong>Mentor:</strong> ${mentorName}</p>
      <p style="color:#1e3a5f;margin:0;"><strong>Date & Time:</strong> ${dateTime}</p>
    </div>
    <div style="text-align:center;margin:24px 0;">
      <a href="${joinLink}"
         style="background:#2563eb;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;">
        Join Session
      </a>
    </div>
    <p style="color:#6b7280;font-size:14px;">Please join 5 minutes early to test your audio/video.</p>
  `);

  await sendEmail({ to, subject: `Session with ${mentorName} - MojeTech`, html });
}

export async function sendSubscriptionRenewal(
  to: string,
  name: string,
  renewalDate: string
): Promise<void> {
  const html = baseTemplate(`
    <h2 style="color:#1e3a5f;margin:0 0 16px;">Subscription Renewal Notice</h2>
    <p style="color:#374151;line-height:1.6;">Hi ${name},</p>
    <p style="color:#374151;line-height:1.6;">Your MojeTech subscription will renew on <strong>${renewalDate}</strong>.</p>
    <p style="color:#374151;line-height:1.6;">Ensure your payment method is up to date to avoid interruption.</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription"
       style="background:#1e3a5f;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;margin-top:16px;">
      Manage Subscription
    </a>
  `);

  await sendEmail({ to, subject: "Subscription Renewal - MojeTech", html });
}
