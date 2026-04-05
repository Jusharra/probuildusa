/**
 * Twilio Incoming Call Webhook
 * ─────────────────────────────
 * Configure this URL in your Twilio console:
 *   Voice → Phone Numbers → your number → "A call comes in" → Webhook
 *   URL: https://your-site.netlify.app/.netlify/functions/incoming-call
 *   Method: HTTP POST
 *
 * Required Netlify environment variables:
 *   TWILIO_FORWARD_TO  — the phone number to forward calls to (e.g. +16615551234)
 *   TWILIO_CALLER_ID   — your Twilio number to show as caller ID (e.g. +18445437419)
 *                        Optional: if omitted, the caller's original number is used
 */

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const forwardTo = process.env.TWILIO_FORWARD_TO;
  const callerId = process.env.TWILIO_CALLER_ID || '';

  if (!forwardTo) {
    console.error('TWILIO_FORWARD_TO env var is not set');
    // Return a polite message to the caller instead of crashing
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Thank you for calling Goree and Associates Construction Services. We are unable to connect your call at this time. Please try again shortly.</Say>
</Response>`;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/xml' },
      body: twiml,
    };
  }

  const callerIdAttr = callerId ? ` callerId="${callerId}"` : '';

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial${callerIdAttr} timeout="30" record="record-from-answer-dual">
    <Number>${forwardTo}</Number>
  </Dial>
  <Say voice="alice">We were unable to connect your call. Please try again or visit our website at goreeassociates.com.</Say>
</Response>`;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/xml' },
    body: twiml,
  };
};
