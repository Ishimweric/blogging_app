import Post from "../models/Post.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create new post
const createPost = async (req, res) => {
  try {
    const { title, summary, content, image } = req.body;
    
    const newPost = new Post({
      title,
      summary,
      content,
      image,
      author: req.userId,
      avatar: req.userAvatar || "https://randomuser.me/api/portraits/men/1.jpg"
    });

    await newPost.save();
    res.status(201).json({ data: newPost });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, image } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, summary, content, image },
      { new: true }
    );

    res.status(200).json({ data: updatedPost });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findByIdAndDelete(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete associated image file if exists
    if (post.image) {
      const imagePath = path.join(__dirname, '../../public', post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(req.file.originalname);
    const filename = `${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    fs.renameSync(req.file.path, filepath);

    // Return full URL including host
    const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.status(200).json({ 
      url: fullUrl  // Now returns complete URL
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
};
// Export all methods
export {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  uploadImage
};