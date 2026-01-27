import * as nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, phone, department, projectType, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Configure Nodemailer Transporter for Microsoft 365
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.SMTP_EMAIL, // support@tect0nic.com
        pass: process.env.OUTLOOK_APP_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    const fromAddress = `"Tectonic System" <${process.env.SMTP_EMAIL}>`;
    const supportAddress = `"TechTonic Support" <${process.env.SMTP_EMAIL}>`;

    console.log(`[DEBUG] Attempting SMTP connection to Outlook...`);

    // Admin Notification Options
    const adminMailOptions = {
      from: fromAddress,
      to: process.env.CONTACT_EMAIL || 'tect0nic.official2026@gmail.com',
      subject: `🚀 New Lead: ${name} [${department}]`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 24px; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New Inquiry Received</h2>
            <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px;">A potential client has reached out</p>
          </div>
          
          <div style="padding: 32px;">
            <div style="display: flex; align-items: center; margin-bottom: 24px;">
              <div style="background-color: #eff6ff; color: #3b82f6; width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; margin-right: 16px;">
                ${name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style="margin: 0; color: #0f172a; font-size: 18px;">${name}</h3>
                <a href="mailto:${email}" style="color: #64748b; text-decoration: none; font-size: 14px;">${email}</a>
              </div>
            </div>

            <div style="background-color: #f8fafc; border-radius: 8px; padding: 24px; border: 1px solid #f1f5f9;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 100px;">Department</td>
                  <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 14px;">${department}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Company</td>
                  <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 14px;">${company || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Phone</td>
                  <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 14px;">${phone || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Budget</td>
                  <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 14px;">${budget || '-'}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 24px;">
              <h4 style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Message</h4>
              <div style="background-color: #fff; border-left: 3px solid #6366f1; padding: 16px; color: #334155; line-height: 1.6; font-size: 15px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">Sent via TechTonic Contact Portal • ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };

    // User Auto-Response Options
    const userMailOptions = {
      from: supportAddress,
      to: email,
      subject: `We've received your message, ${name}!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #0f172a; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center; background-image: radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%);">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: -0.5px;">TechTonic</h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">Architecting the Future</p>
          </div>
          
          <div style="border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
            <div style="padding: 40px 30px;">
              <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 22px;">Hello ${name},</h2>
              <p style="color: #475569; line-height: 1.6; font-size: 16px; margin-bottom: 24px;">
                Thank you for reaching out to us. We have successfully received your inquiry regarding <strong>${department}</strong>.
              </p>
              
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 24px; display: flex; align-items: flex-start;">
                <span style="font-size: 20px; margin-right: 12px;">✅</span>
                <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.5;">
                  <strong>Transmission Confirmed</strong><br>
                  Our team is reviewing your details and will likely respond within 24 hours.
                </p>
              </div>

              <div style="border-top: 1px solid #e2e8f0; margin: 32px 0;"></div>

              <p style="color: #64748b; font-size: 14px; text-align: center; margin-bottom: 24px;">While you wait, discover what we're building:</p>
              
              <div style="text-align: center;">
                <a href="https://tect0nic.com/portfolio" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; transition: background-color 0.2s;">View Portfolio</a>
                <span style="display: inline-block; width: 16px;"></span>
                <a href="https://linkedin.com/company/tect0nic" style="display: inline-block; background-color: #ffffff; color: #0f172a; text-decoration: none; padding: 11px 23px; border-radius: 6px; font-weight: 600; font-size: 14px; border: 1px solid #cbd5e1;">LinkedIn</a>
              </div>
            </div>
            
            <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-radius: 0 0 16px 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #334155;">The TechTonic Team</p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">© ${new Date().getFullYear()} TechTonic Ecosystem. All rights reserved.</p>
            </div>
          </div>
        </div>
      `
    };

    // Send both in parallel
    const sendAdmin = transporter.sendMail(adminMailOptions);
    const sendUser = transporter.sendMail(userMailOptions);

    const [adminInfo, userInfo] = await Promise.all([sendAdmin, sendUser]);

    console.log('✅ Admin Email Sent:', adminInfo.messageId);
    console.log('✅ User Email Sent:', userInfo.messageId);

    return res.status(200).json({
      success: true,
      adminMessageId: adminInfo.messageId,
      userMessageId: userInfo.messageId
    });

  } catch (error: any) {
    console.error('SMTP Server Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
