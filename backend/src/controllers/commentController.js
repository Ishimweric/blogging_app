import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// @desc    Add comment to post
// @route   POST /api/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text, postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      text,
      author: req.user._id,
      post: postId
    });

    await comment.save();

    // Populate author details before sending response
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username avatar');

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get comments for post
// @route   GET /api/comments/post/:postId
// @access  Public
export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};