import React, { useState } from 'react';
import Tabs from '../components/Tabs';
import BlogFeed from '../components/BlogFeed';

const staticPosts = [
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    title: 'Lorem ipsum dolor sit amet, consectetur',
    summary: 'Lorem ipsum dolor sit amet. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua…',
    author: 'Finay',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Aug 2, 2025',
    likes: 45,
    comments: 12,
    category: 'Popular feeds',
    isRecent: true
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    title: 'Dolor sit amet lorem ipsum',
    summary: 'This is a shorter summary that fits the card nicely. Lorem ipsum dolor sit amet…',
    author: 'Samiya',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Jul 28, 2025',
    likes: 102,
    comments: 25,
    category: 'Tech-related',
    isRecent: true
  },
  {
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'How to build responsive UI with Tailwind',
    summary: `Tailwind makes it super fast to build modern websites. Here's a basic guide to get you started…`,
    author: 'Elyas',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    date: 'Jul 25, 2025',
    likes: 78,
    comments: 8,
    category: 'Tech-related',
    isRecent: true
  },
  {
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Top 5 destinations to visit in 2025',
    summary: 'Plan your dream vacation with our top picks for travel in the coming year…',
    author: 'Mulu',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    date: 'Jul 20, 2025',
    likes: 90,
    comments: 14,
    category: 'Popular feeds',
    isRecent: false
  },
  {
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'The future of technology in Africa',
    summary: `Innovation is accelerating across the continent. Discover what's next for African tech…`,
    author: 'Lina',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: 'Jul 18, 2025',
    likes: 66,
    comments: 7,
    category: 'Tech-related',
    isRecent: false
  },
  {
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Why React is still dominating in 2025',
    summary: `React remains the top choice for frontend developers — here's why it still holds the crown…`,
    author: 'Yosef',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    date: 'Jul 15, 2025',
    likes: 115,
    comments: 30,
    category: 'Tech-related',
    isRecent: false
  },
  {
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    title: 'Getting started with Next.js',
    summary: 'Learn the basics of Next.js and how it can improve your React applications…',
    author: 'Daniel',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    date: 'Jul 12, 2025',
    likes: 88,
    comments: 15,
    category: 'Tech-related',
    isRecent: false
  },
  {
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    title: 'Top 5 Healthy Breakfast Ideas',
    summary: 'Start your day right with these nutritious breakfast options…',
    author: 'Chef Maria',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    date: 'Jul 10, 2025',
    likes: 72,
    comments: 9,
    category: 'Food-related',
    isRecent: false
  },
  {
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    title: 'Easy Vegan Recipes for Beginners',
    summary: 'Simple plant-based meals anyone can make…',
    author: 'Vegan Chef',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    date: 'Jul 8, 2025',
    likes: 95,
    comments: 18,
    category: 'Food-related',
    isRecent: true
  }
];

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ['Popular feeds', 'Recent Posts', 'Tech-related', 'Food-related'];

  const filterPosts = () => {
    switch(tabs[selectedTab]) {
      case 'Popular feeds':
        return staticPosts.filter(post => post.likes > 80);
      case 'Recent Posts':
        return staticPosts.filter(post => post.isRecent);
      case 'Tech-related':
        return staticPosts.filter(post => post.category === 'Tech-related');
      case 'Food-related':
        return staticPosts.filter(post => post.category === 'Food-related');
      default:
        return staticPosts;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Tabs tabs={tabs} onTabChange={setSelectedTab} />
      <BlogFeed posts={filterPosts()} />
    </div>
  );
};

export default Home;