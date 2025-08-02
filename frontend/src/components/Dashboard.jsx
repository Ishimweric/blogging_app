import React, { useState } from 'react';
import { FaHeart, FaRegComment, FaArrowLeft, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Footer from './Footer';
import pop from '../assets/pop.png';
import chatbot from '../assets/chatbot.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myPosts');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Blog Post',
      author: 'You',
      date: 'May 15, 2023',
      summary: 'This is a summary of my first blog post that I wanted to share with everyone...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      status: 'published',
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      title: 'Another Interesting Post',
      author: 'You',
      date: 'June 2, 2023',
      summary: 'Sharing some more thoughts and experiences from my recent adventures...',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      status: 'published',
      likes: 15,
      comments: 3
    }
  ]);

  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id ? { 
          ...post, 
          ...formData,
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          author: 'You',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        } : post
      ));
      setEditingPost(null);
    } else {
      const newPost = {
        id: Date.now(),
        author: 'You',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'published',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        likes: 0,
        comments: 0,
        ...formData
      };
      setPosts([newPost, ...posts]);
    }
    setFormData({ title: '', summary: '', content: '', image: '' });
    setShowCreateForm(false);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const PostCard = ({ post }) => {
    return (
      <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative">
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
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingPost(post);
                  setFormData({
                    title: post.title,
                    summary: post.summary,
                    content: post.content,
                    image: post.image
                  });
                  setShowCreateForm(true);
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post.id);
                }}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <img src={post.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <p className="text-sm text-gray-700">{post.summary}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span>{post.likes}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <FaRegComment className="text-blue-400" />
              <span>{post.comments}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPost(post);
            }}
            className="inline-block mt-2 text-white bg-gray-800 px-4 py-1 text-sm rounded hover:bg-black"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  const PostDetail = ({ post, onBack }) => {
    const [comments] = useState([
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

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <article className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingPost(post);
                  setFormData({
                    title: post.title,
                    summary: post.summary,
                    content: post.content,
                    image: post.image
                  });
                  setShowCreateForm(true);
                  setSelectedPost(null);
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  handleDelete(post.id);
                  setSelectedPost(null);
                }}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
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
              {post.content}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegComment className="text-blue-400" />
              <span>{post.comments}</span>
            </div>
          </div>
        </article>

        {/* Comments Section - Read Only */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Comments ({post.comments})</h2>
          
          <div className="space-y-6">
            {comments.map(comment => (
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
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Navigation Header */}
      <header className="py-4 px-6 flex justify-between items-center top-0 z-10">
        <button className="hover:text-black rounded-full">
          <img 
              src={pop} 
              alt="pop" 
              className="w-10 h-10 mt-[10px] ml-[10px]" 
          />
        </button>
        <a 
          href="#main-content" 
          className="text-gray-800 hover:text-black px-3 py-1 rounded transition-colors text-sm"
        >
          Skip to main
        </a>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1">
        {selectedPost ? (
          <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <>
            {/* Dashboard Title Section */}
            <div className="bg-gray-50 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semibold text-gray-800">My Dashboard</h1>
                  <button
                    onClick={() => {
                      setShowCreateForm(true);
                      setEditingPost(null);
                      setFormData({ title: '', summary: '', content: '', image: '' });
                    }}
                    className="flex items-center gap-2 text-white bg-gray-800 px-4 py-2 rounded hover:bg-black transition-colors"
                  >
                    <FaPlus className="text-sm" />
                    <span>Create Post</span>
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('myPosts')}
                      className={`pb-3 px-1 font-medium text-sm ${
                        activeTab === 'myPosts' 
                          ? 'text-gray-800 border-b-2 border-gray-800' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      My Posts
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div id="main-content" className="p-6 max-w-4xl mx-auto w-full">
              {/* Create/Edit Form */}
              {showCreateForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
                  <h2 className="text-lg font-medium mb-4 text-gray-800">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                        Summary
                      </label>
                      <input
                        type="text"
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        rows="6"
                        value={formData.content}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-black transition-colors"
                      >
                        {editingPost ? 'Update Post' : 'Publish Post'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Fixed Chatbot Icon */}
      <button className="fixed bottom-6 right-6 text-white p-3 rounded-full">
        <img src={chatbot} alt="" className='w-14 h-14'/>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;