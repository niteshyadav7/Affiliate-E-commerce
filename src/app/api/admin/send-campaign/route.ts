import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { subject, headingMessage } = await request.json();

    if (!subject || !headingMessage) {
      return NextResponse.json({ error: 'Subject and heading message are required.' }, { status: 400 });
    }

    // 1. Fetch subscribers
    const { data: subscribers, error: dbError } = await supabaseServer
      .from('newsletter_subscribers')
      .select('email');

    if (dbError) throw dbError;
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: 'No subscribers found. Get started by signing up some emails first!' }, { status: 400 });
    }

    const recipientEmails = subscribers.map(sub => sub.email);

    // 2. Fetch latest 3 products
    const { data: products } = await supabaseServer
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    // 3. Build HTML Template
    const emailHtml = `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 30px; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 20px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #6366f1; font-weight: 800; font-size: 28px; margin: 0; letter-spacing: -0.025em;">shopverse</h2>
          <p style="color: #4b5563; font-size: 14px; margin-top: 5px;">Your curated shopping rotation</p>
        </div>
        
        <div style="border-top: 1px solid #f3f4f6; padding-top: 20px; margin-bottom: 25px;">
          <p style="color: #1f2937; font-size: 15px; line-height: 1.6; margin: 0;">${headingMessage}</p>
        </div>
        
        <h3 style="margin-top: 30px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; color: #111827; font-size: 16px; font-weight: 700; uppercase; tracking-wider;">🔥 Weekly Highlights</h3>
        <div style="margin-top: 15px; display: table; width: 100%;">
          ${(products || []).map(p => `
            <div style="padding: 15px 0; border-bottom: 1px solid #f3f4f6; display: block; clear: both;">
              <img src="${p.image_url}" alt="${p.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 12px; float: left; margin-right: 15px; border: 1px solid #f3f4f6;" />
              <div style="float: left; max-width: 380px;">
                <h4 style="margin: 0; color: #111827; font-size: 15px; font-weight: 600;">${p.name}</h4>
                <p style="margin: 4px 0 8px 0; color: #4b5563; font-size: 12px; line-height: 1.4; height: 34px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${p.description || 'No description available.'}</p>
              </div>
              <div style="float: right; text-align: right;">
                <p style="margin: 0 0 8px 0; color: #10b981; font-weight: 700; font-size: 14px;">${p.price}</p>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/redirect/${p.id}" style="font-size: 11px; color: #ffffff; background-color: #6366f1; font-weight: 700; text-decoration: none; padding: 6px 12px; border-radius: 8px; display: inline-block;">Shop Now</a>
              </div>
              <div style="clear: both;"></div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 20px; text-align: center;">
          <p style="font-size: 11px; color: #9ca3af; margin: 0;">
            You are receiving this because you subscribed to Shopverse updates.
          </p>
          <p style="font-size: 11px; color: #9ca3af; margin-top: 5px;">
            <a href="#" style="color: #6366f1; text-decoration: underline;">Unsubscribe</a> | <a href="#" style="color: #6366f1; text-decoration: underline;">Preferences</a>
          </p>
        </div>
      </div>
    `;

    // 4. Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 5. Send Mail (using BCC so users can't see other recipients)
    const mailOptions = {
      from: `"Shopverse Deals" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Sends copy to self
      bcc: recipientEmails,        // Blinds recipients
      subject: subject || 'Weekly Top Picks!',
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: `Email campaign sent to ${recipientEmails.length} subscribers!` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
