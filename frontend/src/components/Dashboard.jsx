import React, { useState } from 'react';
import { FiMenu, FiMessageSquare } from 'react-icons/fi';
import Footer from './Footer';
import pop from '../assets/pop.png';
import chatbot from'../assets/chatbot.png';
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('myPosts');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur',
      author: 'Finaly',
      date: 'DOMMAYY',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'treating-picture.jpg',
      status: 'published'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consectetur',
      author: 'Finaly',
      date: 'DOMMAYY',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'treating-picture.jpg',
      status: 'published'
    }
  ]);

  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
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
        post.id === editingPost.id ? { ...post, ...formData } : post
      ));
      setEditingPost(null);
    } else {
      const newPost = {
        id: Date.now(),
        author: 'Current User',
        date: new Date().toLocaleDateString(),
        status: 'published',
        ...formData
      };
      setPosts([newPost, ...posts]);
    }
    setFormData({ title: '', content: '', image: '' });
    setShowCreateForm(false);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Navigation Header */}
      <header className="py-4 px-6 flex justify-between items-center  top-0 z-10">
        <button className="hover:text-black rounded-full">
    <img 
        src={pop} 
        alt="pop" 
        className="w-10 h-10 mt-[10px] ml-[10px]" 
        // Adjust w-6 and h-6 to your desired size (e.g., w-8 h-8 for slightly larger)
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
        {/* Dashboard Title Section */}
        <div className="bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">My Dashboard</h1>
            
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
          {/* Create Post Button */}
          <div className="mb-6">
            <button
              onClick={() => {
                setShowCreateForm(true);
                setEditingPost(null);
                setFormData({ title: '', content: '', image: '' });
              }}
              className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-black transition-colors"
            >
              Create Post
            </button>
          </div>

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

          {/* Posts List */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setFormData({
                          title: post.title,
                          content: post.content,
                          image: post.image
                        });
                        setShowCreateForm(true);
                      }}
                      className="text-gray-800 hover:text-black text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <span className="font-medium">● {post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                  {post.image && (
                    <>
                      <span className="mx-2">•</span>
                      <span>+ Treating Picture</span>
                    </>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <button className="text-gray-800 font-medium hover:text-black">
                  (Resume)
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed Chatbot Icon */}
      <button className="fixed bottom-6 right-6  text-white p-3 rounded-full">
        <img src={chatbot} alt="" className='w-14 h-14'/>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;