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

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL || 'support@tect0nic.com'],
            subject: `New Contact Inquiry from ${name} [${department}]`,
            html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ success: true, id: data?.id });
    } catch (error: any) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
