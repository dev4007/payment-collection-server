import { Request, Response } from 'express';
import CollectedData from '../models/CollectedData';
import User from '../models/User';
// import { sendWhatsAppMessage } from '../utils/sendWhatsAppMessage';
// import { sendWhatsAppMessage } from '../services/whatsappService';

export const createCollectedData = async (req: Request, res: Response) => {
    try {
        const { amount, date, customerName } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const salesman = req.user;  // `req.user` should now be recognized as `IUser`

        // Validate customerName to be a valid User (if necessary)
        const customer = await User.findById(customerName);
        if (!customer) {
            return res.status(400).json({ message: 'Invalid customer' });
        }

        const newCollectedData = new CollectedData({
            amount,
            date,
            customerName: customer,
            salesman
        });

        await newCollectedData.save();

        // Send WhatsApp message
        // await sendWhatsAppMessage(customer.mobile, 'Your payment has been successfully received.');

        res.status(201).json(newCollectedData);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
