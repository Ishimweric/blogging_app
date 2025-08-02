import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaRegComment, FaArrowLeft, FaChevronDown } from 'react-icons/fa';

const SinglePost = ({ post, onBack }) => {
  // Like functionality
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  // Comment functionality
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentCount, setCommentCount] = useState(post.comments);
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

  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);
    // API call would go here: api.likePost(post.id, newLikeStatus);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'You',
      date: 'Just now',
      text: commentText
    };

    setComments([newComment, ...comments]);
    setCommentCount(commentCount + 1);
    setCommentText('');
    setShowAllComments(true);
    // API call would go here: api.addComment(post.id, commentText);
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors"
      >
        <FaArrowLeft /> Back to Home
      </button>

      {/* Blog Post Content */}
      <article className="space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src={post.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <img 
          src={post.image} 
          alt="Blog post" 
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />

        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            {post.content || 'Post content goes here...'}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t">
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
          <div className="flex items-center gap-1">
            <FaRegComment className="text-blue-400" />
            <span>{commentCount}</span>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Comments ({commentCount})</h2>
        
        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-8">
          <h3 className="text-lg font-medium mb-4">Add a comment</h3>
          <textarea 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Write your comment here..."
            required
          />
          <button 
            type="submit"
            className="mt-3 bg-gray-800 text-white px-4 py-2 rounded hover:bg-black transition-colors"
          >
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {visibleComments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <img 
                src={comment.avatar} 
                alt="User" 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{comment.name}</span>
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}

          {comments.length > 2 && (
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="flex items-center gap-1 text-gray-600 hover:text-black mt-4 transition-colors"
            >
              <FaChevronDown className={`transition-transform duration-300 ${showAllComments ? 'rotate-180' : ''}`} />
              {showAllComments ? 'Show less' : `Show all ${commentCount} comments`}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default SinglePost;