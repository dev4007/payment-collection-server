import twilio from 'twilio';

// Load environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;

// Initialize Twilio client
const client = twilio(accountSid, authToken);


// Function to send WhatsApp message
export const sendWhatsAppMessage = async (to: string, message: string) => {
    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, // Twilio Sandbox WhatsApp number
            to: `whatsapp:${to}`
        });
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};
