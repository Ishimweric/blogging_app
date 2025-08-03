import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegComment, FaArrowLeft, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Footer from './Footer';
import axios from 'axios';
import pop from '../assets/pop.png';
import chatbot from '../assets/chatbot.png';

// Configure axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || 'demo-token';
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myPosts');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    image: ''
  });

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData(prev => ({ ...prev, image: response.data.url }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        // Update existing post
        const response = await api.put(`/posts/${editingPost._id}`, {
          ...formData,
          author: "You",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg"
        });
        setPosts(posts.map(post => 
          post._id === editingPost._id ? response.data.data : post
        ));
      } else {
        // Create new post
        const response = await api.post('/posts', {
          ...formData,
          author: "You",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          likes: 0,
          comments: 0
        });
        setPosts([response.data.data, ...posts]);
      }
      setFormData({ title: '', summary: '', content: '', image: '' });
      setImagePreview(null);
      setShowCreateForm(false);
      setEditingPost(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save post');
    }
  };

  // Delete a post
  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      if (selectedPost?._id === postId) setSelectedPost(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete post');
    }
  };

  // Post Card Component
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
                  setImagePreview(post.image);
                  setShowCreateForm(true);
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post._id);
                }}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <img src={post.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                 alt="avatar" className="w-6 h-6 rounded-full" />
            <span>{post.author || 'You'}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>

          <p className="text-sm text-gray-700">{post.summary}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span>{post.likes || 0}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <FaRegComment className="text-blue-400" />
              <span>{post.comments || 0}</span>
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

  // Post Detail Component
  const PostDetail = ({ post, onBack }) => {
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
                  setImagePreview(post.image);
                  setShowCreateForm(true);
                  setSelectedPost(null);
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  handleDelete(post._id);
                  setSelectedPost(null);
                }}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <img src={post.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                 alt="avatar" className="w-8 h-8 rounded-full" />
            <span>{post.author || 'You'}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
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
              <span>{post.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegComment className="text-blue-400" />
              <span>{post.comments || 0}</span>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Comments ({post.comments || 0})</h2>
          
          <div className="space-y-6">
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
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-1">
        {selectedPost ? (
          <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="bg-gray-50 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semibold text-gray-800">My Dashboard</h1>
                  <button
                    onClick={() => {
                      setShowCreateForm(true);
                      setEditingPost(null);
                      setFormData({ title: '', summary: '', content: '', image: '' });
                      setImagePreview(null);
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
              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                  <button 
                    onClick={() => setError(null)} 
                    className="float-right font-bold"
                  >
                    &times;
                  </button>
                </div>
              )}

              {/* Loading State */}
              {loading && !showCreateForm && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
                </div>
              )}

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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Featured Image
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 transition-colors">
                            {uploading ? 'Uploading...' : 'Choose Image'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={uploading}
                            />
                          </label>
                        </div>
                        {uploading && (
                          <div className="text-sm text-gray-500">Uploading image...</div>
                        )}
                      </div>
                      {imagePreview && (
                        <div className="mt-3">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="h-40 object-cover rounded-md border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData(prev => ({ ...prev, image: '' }));
                            }}
                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                          >
                            Remove Image
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateForm(false);
                          setImagePreview(null);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-black transition-colors"
                        disabled={!formData.image || uploading}
                      >
                        {editingPost ? 'Update Post' : 'Publish Post'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Posts Grid */}
              {!loading && !showCreateForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.length > 0 ? (
                    posts.map(post => (
                      <PostCard key={post._id} post={post} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No posts found. Create your first post!
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Chatbot Icon */}
      <button className="fixed bottom-6 right-6 text-white p-3 rounded-full">
        <img src={chatbot} alt="" className='w-14 h-14'/>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;