import express from "express";
import { 
  getPosts, 
  createPost, 
  updatePost, 
  deletePost 
} from "../controllers/posts.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes
router.use(auth);

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .put(updatePost)
  .delete(deletePost);

export default router;