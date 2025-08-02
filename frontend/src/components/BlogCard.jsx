import React from 'react';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';

const BlogCard = ({ post, onSelectPost }) => {
  return (
    <div 
      className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
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
          <span className="flex items-center gap-1">
            <FaRegHeart className="text-red-400" /> {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <FaRegComment className="text-blue-400" /> {post.comments}
          </span>
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
    </div>
  );
};

export default BlogCard;