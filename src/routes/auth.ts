import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// Register (Salesman or Customer)
router.post('/register', register);

// Login (Salesman or Customer)
router.post('/login', login);

export default router;
