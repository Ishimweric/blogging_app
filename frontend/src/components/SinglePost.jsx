import React from 'react';
import { FaRegHeart, FaRegComment, FaArrowLeft } from 'react-icons/fa';

const SinglePost = ({ post, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button that works like "Skip to main content" */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors"
      >
        <FaArrowLeft /> Skip to Main Content
      </button>

      {/* Blog Post Content */}
      <article className="space-y-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
            rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
          </p>
          <p className="text-gray-700 mb-4">
            Phasellus ligula massa, congue ac vulputate non, dignissim at augue. 
            Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          <p className="text-gray-700">
            Integer cursus blandit fermentum. Curabitur lobortis, metus at ultricies 
            vehicula, dui nisi tempor ligula, id porttitor diam purus vitae velit.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t">
          <span className="flex items-center gap-1">
            <FaRegHeart className="text-red-400" /> {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <FaRegComment className="text-blue-400" /> {post.comments}
          </span>
        </div>
      </article>

      {/* Comments Section */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Comments ({post.comments})</h2>
        
        <div className="space-y-6">
          {/* Sample Comment 1 */}
          <div className="flex gap-3">
            <img 
              src="https://randomuser.me/api/portraits/women/12.jpg" 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Sarah Johnson</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <p className="text-gray-700">Great post! I really enjoyed reading this.</p>
              </div>
            </div>
          </div>

          {/* Sample Comment 2 */}
          <div className="flex gap-3">
            <img 
              src="https://randomuser.me/api/portraits/men/33.jpg" 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Michael Chen</span>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <p className="text-gray-700">Thanks for sharing this valuable information!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <form className="mt-8">
          <h3 className="text-lg font-medium mb-4">Add a comment</h3>
          <textarea 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Write your comment here..."
          ></textarea>
          <button 
            type="submit"
            className="mt-3 bg-gray-800 text-white px-4 py-2 rounded hover:bg-black transition-colors"
          >
            Post Comment
          </button>
        </form>
      </section>
    </div>
  );
};

export default SinglePost;