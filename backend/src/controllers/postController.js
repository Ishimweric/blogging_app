import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFilteredPosts = async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};
    
    if (filter === 'popular') query = { likeCount: { $gt: 5 } };
    if (filter === 'tech') query = { category: 'Tech' };
    if (filter === 'food') query = { category: 'Food' };

    const posts = await Post.find(query)
      .populate('author', 'username avatar');
    
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};