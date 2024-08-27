import { Request, Response } from 'express';
import CollectedData from '../models/CollectedData';
import User from '../models/User';
// import { sendWhatsAppMessage } from '../utils/sendWhatsAppMessage';
import { sendWhatsAppMessage } from '../services/whatsappService';
import crypto from 'crypto';

// Function to generate a unique verification token
const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

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
        
        // Generate a unique token for verification
        const verifyToken = generateVerificationToken();
        const verifyLink = `${process.env.BASE_URL}/verify/${verifyToken}`;

        const newCollectedData = new CollectedData({
            amount,
            date,
            customerName: customer._id,  // Save only the customer ID
            salesman: salesman._id,
            token : verifyToken // Store the token in the database
        });

        await newCollectedData.save();

        // Send WhatsApp message
        await sendWhatsAppMessage(customer.name, customer.mobile, amount.toString(), date.toString(), verifyLink);

        res.status(201).json(newCollectedData);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const getAllCollection = async (req: Request, res: Response) => {
    try {
        // Fetch all collected data where `customerVerify` is true
        const verifiedData = await CollectedData.find({ customerVerify: true })
            .populate('customerName', 'name') // Populate customerName with name field (optional)
            .populate('salesman', 'name'); // Populate salesman with name field (optional)

        if (!verifiedData.length) {
            return res.status(404).json({ message: 'No verified data found' });
        }

        res.status(200).json(verifiedData);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const verifyPayment = async (req: Request, res: Response) => {
    try {
        const { token } = req.params; // Extract the token from the request parameters

        // Find the collected data entry with the given token
        const collectedData = await CollectedData.findOne({ token: token });
        if (!collectedData) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the `customerVerify` field
        collectedData.customerVerify = true;
        await collectedData.save();

        res.status(200).json({ message: 'Verification successful' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
