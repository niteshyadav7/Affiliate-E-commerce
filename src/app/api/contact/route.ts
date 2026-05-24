import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    // 1. Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 2. Email sent to owner (yadavgolu178@gmail.com / GMAIL_USER)
    const ownerMailOptions = {
      from: `"Store Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Contact Form] ${subject} - from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; padding: 30px; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; color: #1f2937;">
          <h2 style="color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; margin-top: 0; font-size: 20px; font-weight: 700;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563; width: 120px;">Name:</td>
              <td style="padding: 6px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Email:</td>
              <td style="padding: 6px 0; color: #111827;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 600; color: #4b5563;">Subject:</td>
              <td style="padding: 6px 0; color: #111827;">${subject}</td>
            </tr>
          </table>
          <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 20px; border-radius: 12px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #374151;">
            ${message}
          </div>
          <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 30px; margin-bottom: 0;">
            This email was generated dynamically by the DIVERSIFIED Y&P contact form API.
          </p>
        </div>
      `,
    };

    // 3. Optional Auto-Confirmation Email back to Customer
    const customerMailOptions = {
      from: `"DIVERSIFIED Y&P Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting DIVERSIFIED Y&P!`,
      html: `
        <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; padding: 30px; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; color: #1f2937;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #111827; font-weight: 800; font-size: 24px; margin: 0; tracking-tight: -0.02em;">DIVERSIFIED Y&P</h2>
            <p style="color: #4b5563; font-size: 13px; margin-top: 4px;">Premium Store Curation</p>
          </div>
          
          <p style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
            Hello ${name},
          </p>
          
          <p style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 20px;">
            Thank you for reaching out to us. We have successfully received your inquiry regarding <strong>"${subject}"</strong>. Our dedicated support team is currently reviewing your message and will get back to you with a detailed response shortly (usually within 24 hours).
          </p>
          
          <div style="background-color: #f9fafb; border-left: 4px solid #111827; padding: 15px; margin: 20px 0; border-radius: 0 12px 12px 0;">
            <p style="margin: 0; font-size: 12px; font-weight: 600; color: #4b5563; text-transform: uppercase;">Your Message Summary</p>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #6b7280; font-style: italic;">"${message.length > 150 ? message.substring(0, 150) + "..." : message}"</p>
          </div>
          
          <p style="font-size: 15px; line-height: 1.6; color: #374151; margin-bottom: 30px;">
            We appreciate your patience and look forward to assisting you.
          </p>
          
          <div style="border-top: 1px solid #f3f4f6; padding-top: 20px; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0; font-weight: 600;">DIVERSIFIED Y&P team</p>
            <p style="font-size: 11px; color: #d1d5db; margin-top: 4px; margin-bottom: 0;">yandp.in</p>
          </div>
        </div>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Nodemailer contact error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
