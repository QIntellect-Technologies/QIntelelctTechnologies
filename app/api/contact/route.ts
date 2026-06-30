import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dns from 'dns';

// Force Node.js to strictly resolve IPv4 over IPv6 natively
dns.setDefaultResultOrder('ipv4first');

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json();

    // Requires EMAIL_USER and EMAIL_PASS environment variables
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Force IPv4 because Railway sometimes blocks outbound IPv6 SMTP
      tls: {
        rejectUnauthorized: false
      },
      family: 4 // strictly force IPv4
    } as any);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to yourself, or another destination address
      replyTo: email,
      subject: `New Inquiry from ${name} — QIntellect Contact Form`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${service}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
