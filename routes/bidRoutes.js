import { Router } from 'express';
import { getAllBids, placeBid } from '../controllers/bidController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/:itemId/bids', getAllBids);
router.post('/:itemId/bids', authMiddleware, placeBid);

export default router;
