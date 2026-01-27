
export interface EmailPayload {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    department: string;
    projectType?: string;
    budget?: string;
    message: string;
}

export interface EmailResponse {
    success?: boolean;
    error?: string;
    id?: string;
}

export const emailService = {
    sendEmail: async (data: EmailPayload): Promise<EmailResponse> => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (e) {
                // If response is not JSON, it's likely a server error page or plain text error
                console.error('Non-JSON response received:', text);
                throw new Error(`Server Error: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`);
            }

            if (!response.ok) {
                throw new Error(result.error || 'Failed to send email');
            }

            return result;
        } catch (error: any) {
            console.error('Email Service Error:', error);
            return { error: error.message || 'Network error occurred' };
        }
    }
};
