import React from 'react';
import BlogCard from './BlogCard';

const staticPosts = [
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    title: 'Lorem ipsum dolor sit amet, consectetur',
    summary:
      'Lorem ipsum dolor sit amet. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua…',
    author: 'Finay',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'Aug 2, 2025',
    likes: 45,
    comments: 12,
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    title: 'Dolor sit amet lorem ipsum',
    summary:
      'This is a shorter summary that fits the card nicely. Lorem ipsum dolor sit amet…',
    author: 'Samiya',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'Jul 28, 2025',
    likes: 102,
    comments: 25,
  },
  {
    image: 'https://images.unsplash.com/photo-1606788075761-658b1c18e0b4',
    title: 'How to build responsive UI with Tailwind',
    summary:
      'Tailwind makes it super fast to build modern websites. Here’s a basic guide to get you started…',
    author: 'Elyas',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    date: 'Jul 25, 2025',
    likes: 78,
    comments: 8,
  },
  {
    image: 'https://images.unsplash.com/photo-1581092580492-1c7a6ee4f1d5',
    title: 'Top 5 destinations to visit in 2025',
    summary:
      'Plan your dream vacation with our top picks for travel in the coming year…',
    author: 'Mulu',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    date: 'Jul 20, 2025',
    likes: 90,
    comments: 14,
  },
  {
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'The future of technology in Africa',
    summary:
      'Innovation is accelerating across the continent. Discover what’s next for African tech…',
    author: 'Lina',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: 'Jul 18, 2025',
    likes: 66,
    comments: 7,
  },
  {
    image: 'https://images.unsplash.com/photo-1602524812048-5dfafc006d9f',
    title: 'Why React is still dominating in 2025',
    summary:
      'React remains the top choice for frontend developers — here’s why it still holds the crown…',
    author: 'Yosef',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    date: 'Jul 15, 2025',
    likes: 115,
    comments: 30,
  },
];

const BlogFeed = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {staticPosts.map((post, index) => (
        <BlogCard key={index} post={post} />
      ))}
    </div>
  );
};

export default BlogFeed;
