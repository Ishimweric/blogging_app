import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';

const BlogCard = ({ post, onSelectPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      name: 'Sarah Johnson',
      date: '2 days ago',
      text: 'Great post! I really enjoyed reading this.'
    },
    {
      id: 2,
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
      name: 'Michael Chen',
      date: '1 week ago',
      text: 'Thanks for sharing this valuable information!'
    }
  ]);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    // Here you would make an API call to update like status in the backend
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'You',
      date: 'Just now',
      text: commentText
    };

    setComments([...comments, newComment]);
    setCommentText('');
    // Here you would make an API call to save the comment in the backend
  };

  const toggleComments = (e) => {
    e.stopPropagation();
    setShowComments(!showComments);
  };

  return (
    <div 
      className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative"
      onClick={() => onSelectPost(post)}
    >
      <img
        src={post.image}
        alt="Blog post"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold leading-tight">
            {post.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src={post.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <p className="text-sm text-gray-700">{post.summary}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
          >
            {isLiked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-red-400" />
            )}
            <span>{likeCount}</span>
          </button>
          
          <button 
            onClick={toggleComments}
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <FaRegComment className="text-blue-400" />
            <span>{comments.length}</span>
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectPost(post);
          }}
          className="inline-block mt-2 text-white bg-gray-800 px-4 py-1 text-sm rounded hover:bg-black"
        >
          Read more
        </button>
      </div>

      {/* Comments Popup */}
      {showComments && (
        <div 
          className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t max-h-60 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Comments ({comments.length})</h3>
            <button 
              onClick={toggleComments}
              className="text-gray-500 hover:text-black"
            >
              ×
            </button>
          </div>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-2 border rounded text-sm"
              rows="2"
              placeholder="Add a comment..."
            />
            <button 
              type="submit"
              className="mt-2 bg-gray-800 text-white px-3 py-1 text-xs rounded hover:bg-black"
            >
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <img 
                  src={comment.avatar} 
                  alt="User" 
                  className="w-6 h-6 rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">{comment.name}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-xs text-gray-700">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;