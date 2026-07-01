import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json();

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY is not set');
      return NextResponse.json({ error: 'Failed to send email: Configuration error' }, { status: 500 });
    }

    const emailPayload = {
      sender: {
        name: 'QIntellect Contact Form',
        email: 'info@qintellecttechnologies.com'
      },
      to: [
        {
          email: 'info@qintellecttechnologies.com',
          name: 'QIntellect Team'
        }
      ],
      replyTo: {
        email: email,
        name: name
      },
      subject: `New Inquiry from ${name} — QIntellect Contact Form`,
      textContent: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${service}

Message:
${message}
      `
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Brevo API Error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}