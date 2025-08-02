import React, { useState } from 'react';
import BlogCard from './BlogCard';
import SinglePost from './SinglePost';

const BlogFeed = ({ posts }) => {  // Receive posts as prop
  const [selectedPost, setSelectedPost] = useState(null);

  if (selectedPost) {
    return <SinglePost post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {posts.map((post, index) => (  // Use the posts prop
        <BlogCard 
          key={index} 
          post={post} 
          onSelectPost={setSelectedPost}
        />
      ))}
    </div>
  );
};

export default BlogFeed;