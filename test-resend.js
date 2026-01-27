import { Resend } from 'resend';

// REPLACE THIS WITH YOUR API KEY IF IT DOESN'T LOAD FROM ENV
const key = process.env.RESEND_API_KEY || 're_NgejrdLW_E7BsbhyJGcdoijneA5R6Fgnp';

const resend = new Resend(key);

async function test() {
    console.log('Testing Resend with Key:', key.substring(0, 8) + '...');

    try {
        const data = await resend.emails.send({
            from: 'Tectonic System <system@tect0nic.com>',
            to: ['support@tect0nic.com'], // Sending to yourself (always allowed)
            subject: 'Test Email 1 (Admin)',
            html: '<p>Admin path works</p>'
        });
        console.log('✅ Admin Email (Verified Domain -> Self) Success:', data);
    } catch (e) {
        console.error('❌ Admin Email Failed:', e.message);
    }

    try {
        const data = await resend.emails.send({
            from: 'TechTonic Support <support@tect0nic.com>',
            to: ['test_user_random_123@gmail.com'], // Sending to OUTSIDE (Requires verified domain)
            subject: 'Test Email 2 (User)',
            html: '<p>User path works</p>'
        });
        console.log('✅ User Email (Verified Domain -> External) Success:', data);
    } catch (e) {
        console.error('❌ User Email Failed:', e.message);
        console.log('\n--- DIAGNOSIS ---');
        console.log('If the second email failed with "only send testing emails", it confirms that Resend DOES NOT see "tect0nic.com" as verified for THIS API Key.');
        console.log('SOLUTION: Go to Resend Dashboard -> API Keys. Create a NEW key. Ensure you are in the correct Team on the top left.');
    }
}

test();
