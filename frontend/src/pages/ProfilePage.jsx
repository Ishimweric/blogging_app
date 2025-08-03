import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Loader2, ImageIcon, PlusCircle} from 'lucide-react'; 
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isLoggedIn, isLoadingAuth } = useAuth(); // Get user and auth state from context
  const [userPosts, setUserPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!isLoggedIn || !user?._id) {
        // If not logged in or user ID is not available, don't fetch posts
        setIsLoadingPosts(false);
        return;
      }

      setIsLoadingPosts(true);
      setPostsError(null); // Clear previous errors

      try {
        const response = await axios.get('http://localhost:3500/api/posts/');

        setUserPosts(response.data.posts || []); 
        toast.success('Your posts loaded successfully!');
      } catch (error) {
        console.error('Error fetching user posts:', error);
        let errorMessage = 'Failed to load your posts.';
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        setPostsError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    // only fetch posts if auth status is known and user is logged in
    if (!isLoadingAuth) {
      fetchUserPosts();
    }
  }, [isLoggedIn, user, isLoadingAuth]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <p className="ml-4 text-gray-700 dark:text-gray-300">Loading profile...</p>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-lg text-center">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 font-inter transition-colors duration-300 ease-in-out">
      <div className="max-w-4xl mx-auto space-y-8"> {/* Adjusted for spacing between sections */}

        {/* User Information Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-blue-500 shadow-md">
            {user.avatar && user.avatar !== 'https://placehold.co/150x150/cccccc/000000?text=Avatar' ? (
              <img
                src={user.avatar}
                alt={`${user.username}'s avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/150x150/cccccc/000000?text=Avatar'; // Fallback to generic placeholder
                }}
              />
            ) : (
              <ImageIcon size={64} className="text-gray-500 dark:text-gray-400" /> // Default icon if no avatar URL or default placeholder
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mt-4 mb-2">
            {user.username}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center space-x-2">
            <Mail size={20} className="text-blue-500" />
            <span>{user.email}</span>
          </p>
          {/* Add a button to edit profile or change avatar if desired */}
          {/* <button className="mt-6 bg-blue-600 text-white py-2 px-5 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md">
            Edit Profile
          </button> */}
        </div>

        {/* My Posts Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span>My Posts</span>
            <Link to="/create-post" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusCircle size={18} className="mr-2" /> Create New Post
            </Link>
          </h2>

          {isLoadingPosts ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-blue-500" size={32} />
              <p className="ml-4 text-gray-600 dark:text-gray-400">Loading your posts...</p>
            </div>
          ) : postsError ? (
            <div className="text-red-500 text-center py-8">
              <p>{postsError}</p>
              <p className="text-sm mt-2">Please ensure the backend API for posts is running and accessible.</p>
            </div>
          ) : userPosts.length === 0 ? (
            <div className="text-gray-600 dark:text-gray-400 text-center py-8">
              <p className="mb-4">You haven't created any posts yet.</p>
              <Link to="/create-post" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusCircle size={18} className="mr-2" /> Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Responsive grid for posts */}
              {userPosts.map((post) => (
                <div key={post._id} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex-grow line-clamp-3">{post.content}</p> {/* flex-grow for consistent height */}
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.date ? new Date(post.date).toLocaleDateString() : 'No Date'}
                    </span>
                    <Link to={`/posts/${post._id}`} className="inline-flex items-center text-blue-600 hover:underline text-sm font-medium">
                      Read More <span aria-hidden="true" className="ml-1">&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;