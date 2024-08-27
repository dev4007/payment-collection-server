import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
    try {
        // Fetch users with the role 'customer'
        const users = await User.find({ role: 'customer' });

        // Check if users are found
        if (users.length === 0) {
            return res.status(404).json({ message: 'No customers found' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
