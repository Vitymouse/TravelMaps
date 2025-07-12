import express from 'express';
import { createTrip, getTrips } from '../controllers/tripsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authenticateToken, createTrip);
router.get('/', authenticateToken, getTrips);

export default router;
