import { Router } from 'express';
import { createCollectedData } from '../controllers/collectedDataController';
import { authenticateUser, authorizeSalesman } from '../middleware/authMiddleware';
import { getReports } from '../controllers/reportController';

const router = Router();

// Route to create new collected data
router.post('/data', authenticateUser, authorizeSalesman, createCollectedData);
router.get('/get', getReports);

export default router;
