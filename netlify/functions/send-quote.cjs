const sgMail = require('@sendgrid/mail');

const SERVICE_LABELS = {
  'infrastructure-surface': 'Infrastructure & Surface',
  'mechanical-electrical': 'Mechanical & Electrical',
  'inspections-compliance': 'Inspections & Compliance',
  'oil-gas-industrial': 'Oil & Gas / Industrial',
  'estimation-bidding': 'Estimation & Bidding',
  'permit-compliance': 'Permit & Compliance',
  'material-procurement': 'Material Procurement',
  'cleanup-coordination': 'Cleanup Coordination',
  'warranty-maintenance': 'Warranty & Maintenance Plans',
  'clean-truck-check': 'Clean Truck Check (CA)',
};

function buildAdminHtml(d) {
  const service = SERVICE_LABELS[d.projectType] || d.projectType;
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
  <div style="max-width:680px;margin:0 auto;background:#1e293b;border-radius:12px;overflow:hidden;border:1px solid #334155">
    <div style="background:#182840;padding:18px 28px">
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="width:22px;height:52px;border-top:3px solid #c9a84c;border-left:3px solid #c9a84c;border-bottom:3px solid #c9a84c;vertical-align:middle;padding:0">
          <div style="width:13px;height:2px;background:#c9a84c"></div>
        </td>
        <td style="padding-left:14px;vertical-align:top;padding-top:3px">
          <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:24px;color:#ffffff;line-height:1.1">GOREE</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:9px;color:#c9a84c;letter-spacing:3px;margin-top:2px">&amp; ASSOCIATES</div>
          <div style="border-top:1px solid rgba(201,168,76,0.45);width:150px;margin:4px 0 3px"></div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:8px;color:#7a8fa0;letter-spacing:2px">CONSTRUCTION SERVICES</div>
        </td>
      </tr></table>
    </div>
    <div style="background:linear-gradient(90deg,#f59e0b,#d97706);padding:12px 28px">
      <h1 style="margin:0;color:#0f172a;font-size:18px">New Project Quote — ${service}</h1>
    </div>
    <div style="padding:28px">
      <h2 style="color:#f59e0b;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">Contact</h2>
      <table style="width:100%;border-collapse:collapse;background:#0f172a;border-radius:8px;overflow:hidden;margin-bottom:24px">
        ${rows([
          ['Name', `${d.firstName || ''} ${d.lastName || ''}`.trim()],
          ['Company', d.companyName],
          ['Title', d.jobTitle],
          ['Email', d.email],
          ['Phone', d.phone],
          ['Best Time', d.bestTimeToCall],
          ['Preferred Contact', d.preferredContact],
        ])}
      </table>

      <h2 style="color:#f59e0b;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">Project</h2>
      <table style="width:100%;border-collapse:collapse;background:#0f172a;border-radius:8px;overflow:hidden;margin-bottom:24px">
        ${rows([
          ['Service', service],
          ['Address', [d.address, d.city, d.state, d.zip].filter(Boolean).join(', ')],
          ['Budget', d.budget],
          ['Budget Flexible', d.budgetFlexible ? 'Yes' : ''],
          ['Timeline', d.timeline],
          ['Property Type', d.propertyType],
          ['Start Date', d.startDate],
          ['Work Hours', d.workHoursConstraints],
          ['Occupancy', d.occupancyStatus],
          ['Safety Reqs', d.safetyRequirements],
          ['Permit Status', d.permitStatus],
        ])}
      </table>

      ${d.projectDescription ? `
      <h2 style="color:#f59e0b;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">Description</h2>
      <div style="background:#0f172a;border-radius:8px;padding:16px;color:#cbd5e1;line-height:1.6;margin-bottom:24px;white-space:pre-wrap">${d.projectDescription}</div>
      ` : ''}

      ${d.siteAccessNotes ? `
      <h2 style="color:#f59e0b;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">Site Access Notes</h2>
      <div style="background:#0f172a;border-radius:8px;padding:16px;color:#cbd5e1;line-height:1.6;margin-bottom:24px;white-space:pre-wrap">${d.siteAccessNotes}</div>
      ` : ''}

      <h2 style="color:#f59e0b;font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px">Financing</h2>
      <table style="width:100%;border-collapse:collapse;background:#0f172a;border-radius:8px;overflow:hidden">
        ${rows([
          ['Needs Financing', d.needsFinancing],
          ['Credit Score', d.creditScore],
          ['Down Payment', d.downPayment],
        ])}
      </table>
    </div>
  </div>
</body>
</html>`;
}

function buildClientHtml(d) {
  const service = SERVICE_LABELS[d.projectType] || d.projectType;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="background:#f8fafc;color:#1e293b;font-family:sans-serif;margin:0;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
    <div style="background:#182840;padding:18px 28px">
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="width:22px;height:52px;border-top:3px solid #c9a84c;border-left:3px solid #c9a84c;border-bottom:3px solid #c9a84c;vertical-align:middle;padding:0">
          <div style="width:13px;height:2px;background:#c9a84c"></div>
        </td>
        <td style="padding-left:14px;vertical-align:top;padding-top:3px">
          <div style="font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:24px;color:#ffffff;line-height:1.1">GOREE</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:9px;color:#c9a84c;letter-spacing:3px;margin-top:2px">&amp; ASSOCIATES</div>
          <div style="border-top:1px solid rgba(201,168,76,0.45);width:150px;margin:4px 0 3px"></div>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:8px;color:#7a8fa0;letter-spacing:2px">CONSTRUCTION SERVICES</div>
        </td>
      </tr></table>
    </div>
    <div style="background:linear-gradient(90deg,#f59e0b,#d97706);padding:12px 28px">
      <h1 style="margin:0;color:#0f172a;font-size:22px">We Received Your Request</h1>
    </div>
    <div style="padding:28px">
      <p style="font-size:16px;color:#334155">Hi ${d.firstName || 'there'},</p>
      <p style="color:#475569;line-height:1.7">
        Thank you for reaching out to <strong>Goree & Associates Construction Services</strong>. We've received your project inquiry for <strong>${service}</strong> and our operations team will review your submission and follow up within <strong>1 business day</strong>.
      </p>
      <div style="background:#f8fafc;border-left:4px solid #f59e0b;border-radius:4px;padding:16px;margin:24px 0">
        <p style="margin:0;font-weight:600;color:#1e293b">Your Request Summary</p>
        <p style="margin:4px 0 0;color:#64748b;font-size:14px">Service: ${service}</p>
        ${d.city ? `<p style="margin:4px 0 0;color:#64748b;font-size:14px">Location: ${d.city}, ${d.state}</p>` : ''}
        ${d.budget ? `<p style="margin:4px 0 0;color:#64748b;font-size:14px">Budget: $${d.budget}</p>` : ''}
      </div>
      <p style="color:#475569;line-height:1.7">
        If you have any questions in the meantime, feel free to call us at <strong>(844) 543-7419</strong> or reply to this email.
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
        subject: `New Quote Request — ${SERVICE_LABELS[data.projectType] || data.projectType} | ${data.firstName} ${data.lastName}`,
        html: buildAdminHtml(data),
      },
    ];

    if (data.email) {
      messages.push({
        to: data.email,
        from: fromEmail,
        subject: 'Your Project Request — Goree & Associates Construction Services',
        html: buildClientHtml(data),
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
