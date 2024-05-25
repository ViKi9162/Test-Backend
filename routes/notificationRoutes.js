import { Router } from 'express';
import { getNotifications, markNotificationsRead } from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, getNotifications);
router.post('/mark-read', authMiddleware, markNotificationsRead);

export default router;
