import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dns from 'dns';

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json();

    // Explicitly resolve only A (IPv4) records — bypasses AAAA entirely
    const addresses = await dns.promises.resolve4('smtp.gmail.com');
    const ipv4Address = addresses[0];

    const transporter = nodemailer.createTransport({
      host: ipv4Address,       // literal IPv4 address, not hostname
      port: 587,
      secure: false,           // port 587 uses STARTTLS (not SSL), so secure must be false
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        servername: 'smtp.gmail.com', // required so TLS cert validation still works against the real hostname
        rejectUnauthorized: false,
      },
      connectionTimeout: 5000, // time to establish the TCP connection
      greetingTimeout: 5000,   // time to wait for the SMTP greeting after connecting
      socketTimeout: 5000,     // time to wait on an idle socket once connected
    } as any);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
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