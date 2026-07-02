import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY is not set');
      return NextResponse.json({ error: 'Failed to send email: Configuration error' }, { status: 500 });
    }

    // 1. ADD SUBSCRIBER TO BREVO CONTACTS LIST
    // This allows you to log into Brevo and see all your subscribers in one place
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        updateEnabled: true // If they already exist, just update them without throwing an error
      })
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.text();
      console.error('Brevo Contacts API Error:', errorData);
      // We don't necessarily want to fail the whole process if they are already in the list, 
      // but you can monitor this log if needed.
    }

    // 2. SEND THE WELCOME / THANK YOU EMAIL
    const emailPayload = {
      sender: {
        name: 'QIntellect Technologies',
        email: 'info@qintellecttechnologies.com'
      },
      to: [
        {
          email: email
        }
      ],
      subject: 'Welcome to the Monthly Tech Digest!',
      textContent: `
Hi there,

Thank you for subscribing to our Monthly Tech Digest! 

You will now receive a monthly roundup of our best insights on AI, ERP, and EDI solutions directly in your inbox. We promise to only send you high-value content that helps your business stay ahead.

If you have any questions or need to get in touch, simply reply to this email or visit our website.

Best regards,
The QIntellect Team
      `,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #2563eb;">Welcome to the Monthly Tech Digest!</h2>
          <p>Hi there,</p>
          <p>Thank you for subscribing to our Monthly Tech Digest!</p>
          <p>You will now receive a monthly roundup of our best insights on AI, ERP, and EDI solutions directly in your inbox. We promise to only send you high-value content that helps your business stay ahead.</p>
          <p>If you have any questions or need to get in touch, simply reply to this email or visit our website.</p>
          <br/>
          <p>Best regards,<br/><strong>The QIntellect Team</strong></p>
        </div>
      `
    };

    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Brevo Email API Error:', errorData);
      return NextResponse.json({ error: 'Failed to send subscription email' }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the Monthly Tech Digest!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
