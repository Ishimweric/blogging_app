import express from 'express';
import { addComment, getCommentsByPost } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addComment);
router.get('/post/:postId', getCommentsByPost);

export default router;