import { Router } from 'express';
import multer from 'multer';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/itemController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', authMiddleware, upload.single('image'), createItem);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'user']), upload.single('image'), updateItem);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'user']), deleteItem);

export default router;
