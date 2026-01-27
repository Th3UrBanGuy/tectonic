import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 1. Verify Webhook (Optional but Recommended)
    // Note: For strict verification, you need the raw request body. 
    // In Vercel Node.js functions, req.body is often already parsed JSON.
    // We'll skip strict signature verification for this MVP unless raw body is available.

    const event = req.body;

    try {
        if (event.type === 'email.received') {
            const { email_id, from, to, subject } = event.data;

            console.log(`📩 Inbound Email Received: ${subject} from ${from} to ${to}`);
            console.log(`ID: ${email_id}`);

            // 2. Fetch full email content (Body, Attachments)
            // The webhook only gives metadata. We normally fetch the full content here.
            // const email = await resend.emails.get(email_id);

            // For now, we just acknowledge receipt.
            return res.status(200).json({ received: true, email_id });
        }

        // Handle other events if necessary
        return res.status(200).json({ received: true });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
