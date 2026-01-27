import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

        // Parallel Email Sending
        const adminNotificationRequest = resend.emails.send({
            from: 'Tectonic System <system@tect0nic.com>',
            to: ['support@tect0nic.com'],
            subject: `🚨 New Inquiry: ${name} [${department}]`,
            html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #6366f1;">New Contact Inquiry Received</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Department:</strong> ${department}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
            <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
            <hr style="border-color: #cbd5e1; margin: 15px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #64748b;">Sent via Tectonic Website Contact Portal</p>
        </div>
      `,
        });

        const userAutoResponseRequest = resend.emails.send({
            from: 'TechTonic Support <support@tect0nic.com>',
            to: [email],
            subject: `We've received your message, ${name}!`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <div style="text-align: center; padding: 30px; background: #0f172a; color: white; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0;">TechTonic</h1>
            <p style="color: #94a3b8; margin-top: 5px;">Architecting the Future</p>
          </div>
          <div style="border: 1px solid #e2e8f0; border-top: none; padding: 30px; border-radius: 0 0 12px 12px;">
            <h2 style="color: #0f172a;">Hello ${name},</h2>
            <p>Thank you for reaching out to <strong>TechTonic</strong>. We have successfully received your inquiry regarding <strong>${department}</strong>.</p>
            <p>Our team is currently reviewing your details. You can expect a response from one of our specialists within <strong>24 hours</strong>.</p>
            
            <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #6366f1; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #475569;">
                <strong>Recap of your request:</strong><br>
                "${message.length > 100 ? message.substring(0, 100) + '...' : message}"
              </p>
            </div>

            <p>In the meantime, feel free to explore our <a href="https://tect0nic.com/portfolio" style="color: #6366f1; text-decoration: none;">latest projects</a> or connect with us on <a href="https://linkedin.com/company/tect0nic" style="color: #6366f1; text-decoration: none;">LinkedIn</a>.</p>
            
            <br>
            <p>Best regards,</p>
            <p><strong>The TechTonic Team</strong></p>
          </div>
          <p style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 20px;">
            © ${new Date().getFullYear()} TechTonic Ecosystem. All rights reserved.
          </p>
        </div>
      `,
        });

        // Send both in parallel
        const [adminResponse, userResponse] = await Promise.all([adminNotificationRequest, userAutoResponseRequest]);

        // Check for errors in the critical admin path
        if (adminResponse.error) {
            console.error('Admin Email Error:', adminResponse.error);
            return res.status(500).json({ error: `Admin Email Failed: ${adminResponse.error.message}` });
        }

        // Log user error if any, but consider success if admin got it
        if (userResponse.error) {
            console.warn('User Auto-Response Error:', userResponse.error);
        }

        return res.status(200).json({
            success: true,
            adminEmailId: adminResponse.data?.id,
            userEmailId: userResponse.data?.id
        });


    } catch (error: any) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
