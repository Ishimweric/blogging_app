import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart, FaRegComment, FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';

const SinglePost = ({ post, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${post._id}`);
        setIsLiked(data.likes.some(like => like._id === 'current-user-id')); // You'll need to implement auth
        setLikeCount(data.likes.length);
        setComments(data.comments || []);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [post._id]);

  const handleLike = async () => {
    try {
      // You'll need to add authentication headers
      const { data } = await axios.put(`/api/posts/${post._id}/like`);
      setIsLiked(data.isLiked);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      // You'll need to add authentication headers
      const { data } = await axios.post('/api/comments', {
        text: commentText,
        postId: post._id
      });

      setComments([data, ...comments]);
      setCommentText('');
      setShowAllComments(true);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* ... rest of your JSX remains the same, just update the data references */}
    </div>
  );
};

export default SinglePost;