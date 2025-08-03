import express from 'express';
import { getPosts, getFilteredPosts } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/filtered', getFilteredPosts);

export default router;