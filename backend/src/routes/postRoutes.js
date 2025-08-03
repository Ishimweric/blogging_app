import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  likePost,
  viewPost,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, createPost);
router.route('/:id').get(getPostById);
router.route('/:id/like').put(protect, likePost);
router.route('/:id/view').put(viewPost);

export default router;