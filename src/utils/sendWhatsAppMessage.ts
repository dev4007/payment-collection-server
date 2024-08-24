import { StringExpression } from 'mongoose';
import { Client, LocalAuth } from 'whatsapp-web.js';

// Initialize WhatsApp client with options
const client = new Client({
  authStrategy: new LocalAuth() // This allows the client to use local authentication
});

// Event listener for QR code generation
client.on('qr', (qr: string) => {
  console.log("🚀 ~ client:", client)
  console.log('QR Code received:', qr);
});

// Event listener for client readiness
client.on('ready', () => {
  console.log('Client is ready!');
});

// Initialize WhatsApp client
client.initialize();

// Function to send a WhatsApp message
export const sendWhatsAppMessage = async (customerPhoneNumber: string, customerName: StringExpression) => {
  try {
    // Ensure the client is ready before sending a message
    if (!client.info || !client.info.wid) {
      throw new Error('WhatsApp client is not ready.');
    }

    // Format the message
    const message = `Hi ${customerName}, please verify the payment of amount`;

    // Send message
    await client.sendMessage(`whatsapp:${customerPhoneNumber}`, message); // Replace with customer's WhatsApp number
    console.log(`Message sent to ${customerPhoneNumber}: ${message}`);
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
  }
};
