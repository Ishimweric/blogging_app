// src/data/postData.js
export const initialComments = [
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
];

export const initialPost = {
  id: 1,
  title: 'Sample Blog Post',
  author: 'John Doe',
  date: '3 days ago',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  image: 'https://source.unsplash.com/random/800x600',
  summary: 'This is a brief summary of the blog post content.',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  likes: 42,
  comments: initialComments.length,
  isLiked: false
};