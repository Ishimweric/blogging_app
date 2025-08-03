import { useState, useEffect } from 'react';
import { FaHeart, FaRegComment, FaArrowLeft, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Footer from './Footer';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3500/api',
  timeout: 10000,
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts');
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
    
    if (!validTypes.includes(file.type)) {
      setError('Only JPEG, PNG, GIF, or WebP images are allowed');
      return;
    }
    
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      setUploading(true);
      setError(null);
      
      const response = await api.post('/posts/upload', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      let imageUrl = response.data.url;
      if (!imageUrl.startsWith('http')) {
        imageUrl = `${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001'}${imageUrl}`;
      }

      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.response?.data?.message || 'Image upload failed');
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const postData = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        content: formData.content.trim(),
        ...(formData.image && { image: formData.image })
      };

      let response;
      if (editingPost) {
        response = await api.put(`/posts/${editingPost._id}`, postData);
        setPosts(posts.map(post => 
          post._id === editingPost._id ? response.data.data : post
        ));
      } else {
        response = await api.post('/posts', postData);
        setPosts([response.data.data, ...posts]);
      }

      setFormData({ title: '', summary: '', content: '', image: '' });
      setImagePreview(null);
      setShowCreateForm(false);
      setEditingPost(null);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
      if (selectedPost?._id === postId) setSelectedPost(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const PostCard = ({ post }) => {
    const imageUrl = post.image?.startsWith('http') ? post.image : 
                    `${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001'}${post.image}`;

    return (
      <div className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        {post.image && (
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Blog+Post';
            }}
          />
        )}
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold leading-tight dark:text-white">
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
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              >
                <FaEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post._id);
                }}
                className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
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

          <p className="text-sm text-gray-700 dark:text-gray-300">{post.summary}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-2">
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
            className="inline-block mt-2 text-white bg-gray-800 dark:bg-gray-700 px-4 py-1 text-sm rounded hover:bg-black dark:hover:bg-gray-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  const PostDetail = ({ post, onBack }) => {
    const imageUrl = post.image?.startsWith('http') ? post.image : 
                    `${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001'}${post.image}`;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 bg-white dark:bg-gray-900">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <article className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold dark:text-white">{post.title}</h1>
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
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  handleDelete(post._id);
                  setSelectedPost(null);
                }}
                className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
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

          {post.image && (
            <img 
              src={imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://placehold.co/300x200?text=No+Image';
              }}
            />
          )}

          <div className="prose max-w-none dark:text-gray-300">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {post.content}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
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

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-6 dark:text-white">Comments ({post.comments || 0})</h2>
          <div className="space-y-6">
            <div className="flex gap-3">
              <img 
                src="https://randomuser.me/api/portraits/women/12.jpg" 
                alt="User" 
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium dark:text-white">Sarah Johnson</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">2 days ago</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Great post! I really enjoyed reading this.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="py-4 px-6 flex justify-between items-center top-0 z-10 bg-white dark:bg-gray-900">
        <button className="hover:text-black dark:hover:text-white rounded-full">
          <span className="text-xl font-bold dark:text-white">Dashboard</span>
        </button>
        <a 
          href="#main-content" 
          className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-1 rounded transition-colors text-sm"
        >
          Skip to main
        </a>
      </header>

      <main className="flex-1">
        {selectedPost ? (
          <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <>
            <div className="bg-gray-50 dark:bg-gray-900 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-white">My Dashboard</h1>
                  <button
                    onClick={() => {
                      setShowCreateForm(true);
                      setEditingPost(null);
                      setFormData({ title: '', summary: '', content: '', image: '' });
                      setImagePreview(null);
                    }}
                    className="flex items-center gap-2 text-white bg-gray-800 dark:bg-gray-700 px-4 py-2 rounded hover:bg-black dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaPlus className="text-sm" />
                    <span>Create Post</span>
                  </button>
                </div>
                
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('myPosts')}
                      className={`pb-3 px-1 font-medium text-sm ${
                        activeTab === 'myPosts' 
                          ? 'text-gray-800 dark:text-white border-b-2 border-gray-800 dark:border-white' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      My Posts
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <div id="main-content" className="p-6 max-w-4xl mx-auto w-full">
              {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded mb-4">
                  <div className="flex justify-between">
                    <span>{error}</span>
                    <button 
                      onClick={() => setError(null)} 
                      className="font-bold"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}

              {loading && !showCreateForm && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-gray-200"></div>
                </div>
              )}

              {showCreateForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Summary
                      </label>
                      <input
                        type="text"
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Content *
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        rows="6"
                        value={formData.content}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200 focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Featured Image
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <label className={`cursor-pointer ${uploading ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'} px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors`}>
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
                          <div className="text-sm text-gray-500 dark:text-gray-400">Uploading image...</div>
                        )}
                      </div>
                      {imagePreview && (
                        <div className="mt-3">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="h-40 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData(prev => ({ ...prev, image: '' }));
                            }}
                            className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
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
                          setError(null);
                        }}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`text-white ${loading ? 'bg-gray-500' : 'bg-gray-800 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600'} px-4 py-2 rounded transition-colors`}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : editingPost ? 'Update Post' : 'Publish Post'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {!loading && !showCreateForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.length > 0 ? (
                    posts.map(post => (
                      <PostCard key={post._id} post={post} />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
                      No posts found. Create your first post!
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;