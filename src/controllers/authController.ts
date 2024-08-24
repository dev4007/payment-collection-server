import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { Message } from 'whatsapp-web.js';

// Controller for registering a user (Salesman or Customer)
export const register = async (req: Request, res: Response) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

// Controller for logging in a user (Salesman or Customer)
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);
        res.status(200).json({ user,token  });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
