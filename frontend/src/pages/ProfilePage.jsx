import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Loader2} from 'lucide-react'; 

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
        const response = await axios.get('http://localhost:3500/api/posts/my-posts');

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
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
          My Profile
        </h1>

        {/* user Informatiom Section */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-inner">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">User Information</h2>
          <div className="flex items-center space-x-4 mb-3">
            <User size={24} className="text-blue-500" />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <span className="font-medium"> Username:</span> {user.username}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Mail size={24} className="text-blue-500" />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <span className="font-medium">Email: </span> {user.email}
            </p>
          </div>
          {user.avatar && (
            <div className="mt-4">
              <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-blue-500" />
            </div>
          )}
        </div>

        {/* user Posts section */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-inner">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
            My Posts
          </h2>

          {isLoadingPosts ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin text-blue-500" size={32} />
              <p className="ml-4 text-gray-600 dark:text-gray-400">Loading your posts...</p>
            </div>
          ) : postsError ? (
            <div className="text-red-500 text-center py-8">
              <p>{postsError}</p>
              <p className="text-sm mt-2"> Please ensure the backend API for posts is running and accessible.</p>
            </div>
          ) : userPosts.length === 0 ? (
            <div className="text-gray-600 dark:text-gray-400 text-center py-8">
              <p>You haven't created any posts yet.</p>
              {/* Add a link to create a post */}
              <Link to="/create-post" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusCircle size={18} className="mr-2" /> Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <div key={post._id} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{post.content}</p>
                  {/* Add a link to view the full post */}
                  <Link to={`/posts/${post._id}`} className="mt-2 inline-block text-blue-600 hover:underline text-sm">
                    Read More <span aria-hidden="true">&rarr;</span>
                  </Link>
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