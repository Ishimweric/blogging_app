import React, { useState } from 'react';
import { FaRegHeart, FaRegComment, FaArrowLeft, FaChevronDown } from 'react-icons/fa';

const SinglePost = ({ post, onBack }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  
  // Sample comments data
  const comments = [
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
    },
    {
      id: 3,
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      name: 'Emma Wilson',
      date: '3 days ago',
      text: 'This was really helpful, thanks!'
    },
    {
      id: 4,
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      name: 'David Kim',
      date: '5 days ago',
      text: 'I have a question about the third point you made...'
    },
    {
      id: 5,
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      name: 'Lisa Wong',
      date: '1 day ago',
      text: 'Could you elaborate more on this topic?'
    }
  ];

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

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
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            {post.category}
          </span>
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
        <h2 className="text-xl font-semibold mb-6">Comments ({comments.length})</h2>
        
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

          {comments.length > 3 && (
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="flex items-center gap-1 text-gray-600 hover:text-black mt-4 transition-colors"
            >
              <FaChevronDown className={`transition-transform duration-300 ${showAllComments ? 'rotate-180' : ''}`} />
              {showAllComments ? 'Show less' : `Show all ${comments.length} comments`}
            </button>
          )}
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