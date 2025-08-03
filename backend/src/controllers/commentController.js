import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

// @desc    Get comments for a post
// @route   GET /api/comments/:postId
// @access  Public
export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 });

    // Format the date for display
    const formattedComments = comments.map(comment => {
      const timeDiff = Date.now() - new Date(comment.createdAt).getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      
      let dateText;
      if (daysDiff === 0) {
        dateText = 'Today';
      } else if (daysDiff === 1) {
        dateText = '1 day ago';
      } else if (daysDiff < 7) {
        dateText = `${daysDiff} days ago`;
      } else if (daysDiff < 30) {
        const weeks = Math.floor(daysDiff / 7);
        dateText = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
      } else {
        const months = Math.floor(daysDiff / 30);
        dateText = months === 1 ? '1 month ago' : `${months} months ago`;
      }

      return {
        ...comment._doc,
        date: dateText,
        name: comment.user.username,
        avatar: comment.user.avatar,
      };
    });

    res.json(formattedComments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/comments/:postId
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      text,
      post: req.params.postId,
      user: req.user._id,
    });

    const createdComment = await comment.save();

    // Populate user data for the response
    const populatedComment = await Comment.findById(createdComment._id)
      .populate('user', 'username avatar');

    // Format the date for display
    const timeDiff = Date.now() - new Date(populatedComment.createdAt).getTime();
    const dateText = timeDiff < 86400000 ? 'Today' : '1 day ago';

    res.status(201).json({
      ...populatedComment._doc,
      date: dateText,
      name: populatedComment.user.username,
      avatar: populatedComment.user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};