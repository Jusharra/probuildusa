const sgMail = require('@sendgrid/mail');

function buildAdminHtml(d) {
  const rows = (pairs) =>
    pairs
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;font-weight:600;color:#94a3b8;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#f1f5f9">${v}</td></tr>`
      )
      .join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#0f172a;color:#f1f5f9;font-family:sans-serif;margin:0;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155">
    <div style="background:linear-gradient(90deg,#f59e0b,#d97706);padding:20px 28px">
      <h1 style="margin:0;color:#0f172a;font-size:22px">New Partner Application</h1>
      <p style="margin:4px 0 0;color:#1e293b;font-size:14px">Submitted via Goree & Associates Construction Services</p>
    </div>
    <div style="padding:28px">
      <table style="width:100%;border-collapse:collapse;background:#0f172a;border-radius:8px;overflow:hidden">
        ${rows([
          ['Company', d.company],
          ['Contact Name', d.contactName],
          ['Email', d.email],
          ['Phone', d.phone],
          ['Specialty', d.specialty],
          ['License #', d.licenseNumber],
          ['Years in Business', d.yearsInBusiness],
          ['Service Area', d.serviceArea],
          ['Message', d.message],
        ])}
      </table>
    </div>
  </div>
</body>
</html>`;
}

function buildApplicantHtml(d) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#f8fafc;color:#1e293b;font-family:sans-serif;margin:0;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
    <div style="background:linear-gradient(90deg,#f59e0b,#d97706);padding:24px 28px">
      <h1 style="margin:0;color:#0f172a;font-size:22px">Application Received</h1>
    </div>
    <div style="padding:28px">
      <p style="font-size:16px;color:#334155">Hi ${d.contactName || d.company},</p>
      <p style="color:#475569;line-height:1.7">
        Thank you for applying to join the <strong>Goree & Associates Construction Services Partner Network</strong>. We've received your application for <strong>${d.specialty}</strong> and our team will review it within <strong>24 hours</strong>.
      </p>
      <div style="background:#f8fafc;border-left:4px solid #f59e0b;border-radius:4px;padding:16px;margin:24px 0">
        <p style="margin:0;font-weight:600;color:#1e293b">What Happens Next</p>
        <p style="margin:8px 0 0;color:#64748b;font-size:14px">1. Our team reviews your application and verifies your credentials</p>
        <p style="margin:4px 0 0;color:#64748b;font-size:14px">2. We'll schedule a brief onboarding call to discuss fit and expectations</p>
        <p style="margin:4px 0 0;color:#64748b;font-size:14px">3. Once approved, you'll begin receiving qualified project leads</p>
      </div>
      <p style="color:#475569;line-height:1.7">
        Questions? Call us at <strong>(844) 543-7419</strong> or reply to this email.
      </p>
      <p style="color:#475569">— The Goree & Associates Construction Services Team</p>
    </div>
    <div style="background:#f1f5f9;padding:16px 28px;text-align:center">
      <p style="margin:0;color:#94a3b8;font-size:12px">Goree & Associates Construction Services · Infrastructure. Compliance. Execution.</p>
    </div>
  </div>
</body>
</html>`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const adminEmail = process.env.ADMIN_EMAIL || 'hello@goreeassociates.com';
    const fromEmail = process.env.FROM_EMAIL || adminEmail;

    const messages = [
      {
        to: adminEmail,
        from: fromEmail,
        subject: `New Partner Application — ${data.specialty} | ${data.company}`,
        html: buildAdminHtml(data),
      },
    ];

    if (data.email) {
      messages.push({
        to: data.email,
        from: fromEmail,
        subject: 'Partner Application Received — Goree & Associates Construction Services',
        html: buildApplicantHtml(data),
      });
    }

    await Promise.all(messages.map((m) => sgMail.send(m)));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('SendGrid error:', error?.response?.body || error.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
