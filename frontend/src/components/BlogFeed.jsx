import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const BlogFeed = ({ filter }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Verify backend connection first
        await axios.get(`${API_BASE_URL}/health`, {
          timeout: 3000,
          signal: controller.signal
        });

        const response = await axios.get(
          filter 
            ? `${API_BASE_URL}/posts/filtered?filter=${filter}`
            : `${API_BASE_URL}/posts`,
          {
            timeout: 5000,
            signal: controller.signal
          }
        );

        setPosts(response.data || []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message.includes('Network Error')
            ? 'Backend server not reachable. Make sure it\'s running on port 5001'
            : err.message
          );
          console.error('Fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [filter]);

  if (loading) return <div className="p-4">Loading posts...</div>;
  if (error) return (
    <div className="p-4 text-red-500">
      <p>Error: {error}</p>
      <p className="text-sm mt-2">
        Troubleshooting steps:
        <ul className="list-disc pl-5 mt-1">
          <li>Check if backend server is running</li>
          <li>Verify no firewall is blocking connections</li>
          <li>Try refreshing the page</li>
        </ul>
      </p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {posts.map(post => (
        <div key={post._id} className="border rounded-lg overflow-hidden shadow-md">
          <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogFeed;