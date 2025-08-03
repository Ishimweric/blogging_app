import express from 'express';
import {
  getCommentsByPost,
  addComment,
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:postId').get(getCommentsByPost).post(protect, addComment);

export default router;