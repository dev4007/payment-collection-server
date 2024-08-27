import { Router } from 'express';
import { createCollectedData, getAllCollection, verifyPayment } from '../controllers/collectedDataController';
import { authenticateUser, authorizeAdmin, authorizeSalesman } from '../middleware/authMiddleware';
import { getReports } from '../controllers/reportController';
import { getUser } from '../controllers/userController';

const router = Router();

// Route to create new collected data
router.post('/data', authenticateUser, authorizeSalesman, createCollectedData);
router.get('/get-user', authenticateUser, authorizeSalesman, getUser);

router.get('/get', getReports);
router.get('/verify/:token', verifyPayment);
router.get('/get-all',authenticateUser,authorizeAdmin, getAllCollection);



export default router;
