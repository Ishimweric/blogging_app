import React from 'react';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';

const BlogCard = ({ post }) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <img
        src={post.image}
        alt=" Image of the sky taken from a roof top in a semi-urban city"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold leading-tight">
          {post.title}
        </h2>

        {/* Author Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img src={post.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-700">{post.summary}</p>

        {/* Icons: likes & comments */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaRegHeart className="text-red-400" /> {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <FaRegComment className="text-blue-400" /> {post.comments}
          </span>
        </div>

        {/* Read More Button */}
        <a
          href="/blog/single-post"
          className="inline-block mt-2 text-white bg-gray-800 px-4 py-1 text-sm rounded hover:bg-black"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
