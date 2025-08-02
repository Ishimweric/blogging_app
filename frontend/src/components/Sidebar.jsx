import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Compass, LogIn, 
  UserPlus, User, LayoutDashboard, 
  Settings, LogOut, FileText, 
  PlusCircle, List 
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleSidebar(); //close sidebar when a user logout
    navigate('/login');
  };

  return (
    <>
      {/*overlay for when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" //so that we only show overlay on small screens
          onClick={toggleSidebar} //close sidebar when clicking outside
        ></div>
      )}

      {/*sidebar itself */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:h-auto md:shadow-none md:flex md:flex-col md:w-auto md:border-r dark:md:border-gray-700`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">NoteDown</Link>
          {/* close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* navigation links */}
        <nav className="flex-1 p-4 space-y-2">
          {!isLoggedIn ? (
            <>
              <Link
                to="/"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Home size={20} /> <span>Home</span>
              </Link>
              <Link
                to="/explore"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Compass size={20} /> <span>Explore</span>
              </Link>
              <Link
                to="/login"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <LogIn size={20} /> <span>Login</span>
              </Link>
              <Link
                to="/signup"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <UserPlus size={20} /> <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <User size={20} /> <span>My Profile</span>
              </Link>
              <Link
                to="/dashboard"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <LayoutDashboard size={20} /> <span>Dashboard</span>
              </Link>
              <Link
                to="/all-posts"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <List size={20} /> <span>All Posts</span>
              </Link>
              <Link
                to="/create-post"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <PlusCircle size={20} /> <span>Create Post</span>
              </Link>
              <Link
                to="/my-posts"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <FileText size={20} /> <span>My Posts</span>
              </Link>
              <Link
                to="/settings"
                onClick={toggleSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Settings size={ 20} /> <span>Settings</span>
              </Link>
              <button
                onClick={ handleLogout }
                className="flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200 w-full text-left"
              >
                <LogOut size={20} /> <span>Log Out</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;