import express from "express";
import { 
  getPosts, 
  createPost, 
  updatePost, 
  deletePost,
  uploadImage 
} from "../controllers/posts.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// Protect all routes
router.use(auth);

// Image upload route
router.post('/upload', upload.single('image'), uploadImage);

// Post routes
router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .put(updatePost)
  .delete(deletePost);

export default router;