import React from 'react';
import { FaRegHeart, FaHeart, FaRegComment } from 'react-icons/fa';

const BlogCard = ({ post }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{post.summary}</p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {post.author?.username || 'Unknown'}
          </span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <FaRegHeart className="text-gray-500" />
              {post.likeCount || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaRegComment className="text-gray-500" />
              {post.commentCount || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;