import { Resend } from 'resend';

// Regex for basic RFC 5322 compliant email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Helper to escape HTML characters for safe email rendering
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Vercel Serverless Function: POST /api/contact
 * Handles secure email dispatches via the Resend SDK.
 */
export default async function handler(req: any, res?: any) {
  // Support Web Standard Request if invoked in Web API mode
  const isWebStandard = typeof Request !== 'undefined' && req instanceof Request;

  const getMethod = () => (isWebStandard ? req.method : req.method);

  const sendResponse = (statusCode: number, data: Record<string, any>, headers: Record<string, string> = {}) => {
    if (isWebStandard) {
      return new Response(JSON.stringify(data), {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    }

    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(statusCode).json(data);
  };

  // 1. Method verification: Only POST is permitted
  if (getMethod() !== 'POST') {
    return sendResponse(
      405,
      {
        success: false,
        error: 'Method Not Allowed. Use POST.',
      },
      { Allow: 'POST' }
    );
  }

  // 2. Parse body safely
  let body: any = {};
  try {
    if (isWebStandard) {
      body = await req.json();
    } else if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else if (req.body && typeof req.body === 'object') {
      body = req.body;
    }
  } catch {
    return sendResponse(400, {
      success: false,
      error: 'Invalid JSON payload.',
    });
  }

  if (!body || typeof body !== 'object') {
    return sendResponse(400, {
      success: false,
      error: 'Payload must be a valid JSON object.',
    });
  }

  // 3. Honeypot check (anti-bot protection)
  const honeypot = body.hp || body.honeypot;
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    // Return simulated success to avoid alerting bots, but abort execution
    return sendResponse(200, {
      success: true,
      message: 'Message sent successfully. Thank you for reaching out.',
    });
  }

  // 4. Extract and validate required fields server-side
  const rawName = typeof body.name === 'string' ? body.name.trim() : '';
  const rawEmail = typeof body.email === 'string' ? body.email.trim() : '';
  const rawSubject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';

  // Validation: Name
  if (!rawName || rawName.length === 0) {
    return sendResponse(400, { success: false, error: 'Name is required.' });
  }
  if (rawName.length > 100) {
    return sendResponse(400, { success: false, error: 'Name cannot exceed 100 characters.' });
  }

  // Validation: Email
  if (!rawEmail || rawEmail.length === 0) {
    return sendResponse(400, { success: false, error: 'Email address is required.' });
  }
  if (rawEmail.length > 254 || !EMAIL_REGEX.test(rawEmail)) {
    return sendResponse(400, { success: false, error: 'A valid email address is required.' });
  }

  // Validation: Subject
  if (!rawSubject || rawSubject.length === 0) {
    return sendResponse(400, { success: false, error: 'Subject is required.' });
  }
  if (rawSubject.length > 150) {
    return sendResponse(400, { success: false, error: 'Subject cannot exceed 150 characters.' });
  }

  // Validation: Message
  if (!rawMessage || rawMessage.length === 0) {
    return sendResponse(400, { success: false, error: 'Message is required.' });
  }
  if (rawMessage.length > 5000) {
    return sendResponse(400, { success: false, error: 'Message cannot exceed 5000 characters.' });
  }

  // 5. Environment variable checks (server-side only)
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'sukhithms25@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey) {
    console.error('[API/Contact] Missing RESEND_API_KEY environment variable.');
    return sendResponse(500, {
      success: false,
      error: 'Your message could not be sent. Please try again later or contact me directly by email.',
    });
  }

  // 6. Build content (plain text & escaped HTML)
  const cleanName = rawName;
  const cleanEmail = rawEmail;
  const cleanSubject = rawSubject;
  const cleanMessage = rawMessage;

  const plainText = `New message from Sukhith M S Portfolio Contact Form:

From: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}

---
Dispatched via Portfolio Serverless API (Resend)`;

  const escapedName = escapeHtml(cleanName);
  const escapedEmail = escapeHtml(cleanEmail);
  const escapedSubject = escapeHtml(cleanSubject);
  const escapedMessage = escapeHtml(cleanMessage).replace(/\n/g, '<br/>');

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Portfolio Contact</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9f9fb; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background-color: #03070b; padding: 20px 24px; border-bottom: 2px solid #f05a17;">
      <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em;">
        New Contact Message &mdash; Portfolio
      </h2>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 80px; font-weight: 600;">Sender:</td>
          <td style="padding: 6px 0; color: #0f172a; font-size: 14px; font-weight: 500;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email:</td>
          <td style="padding: 6px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${escapedEmail}" style="color: #f05a17; text-decoration: none;">${escapedEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Subject:</td>
          <td style="padding: 6px 0; color: #0f172a; font-size: 14px; font-weight: 500;">${escapedSubject}</td>
        </tr>
      </table>
      
      <div style="border-top: 1px solid #f1f5f9; padding-top: 16px;">
        <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Message Content:</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${escapedMessage}</div>
      </div>
    </div>
    <div style="background-color: #f8fafc; padding: 12px 24px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
      Delivered to ${toEmail} &bull; Reply-To set to ${escapedEmail}
    </div>
  </div>
</body>
</html>
`;

  // 7. Dispatch via Resend SDK
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: cleanEmail,
      subject: `[Portfolio] ${cleanSubject} — from ${cleanName}`,
      text: plainText,
      html: htmlContent,
    });

    if (error) {
      console.error('[API/Contact] Resend error dispatching email:', error.message || error);
      return sendResponse(502, {
        success: false,
        error: 'Your message could not be sent. Please try again later or contact me directly by email.',
      });
    }

    return sendResponse(200, {
      success: true,
      message: 'Message sent successfully. Thank you for reaching out.',
      id: data?.id,
    });
  } catch (err: any) {
    console.error('[API/Contact] Provider exception:', err?.message || err);
    return sendResponse(500, {
      success: false,
      error: 'Your message could not be sent. Please try again later or contact me directly by email.',
    });
  }
}

