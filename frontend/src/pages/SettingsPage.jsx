import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { ChevronRight, Sun, Moon, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const { user } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  // apply or remove dark class and update localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // to toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 font-inter transition-colors duration-300 ease-in-out">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
          Settings
        </h1>

        <div className="space-y-4">
          <div
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleTheme}
          >
            <div className="flex items-center space-x-3">
              {isDarkMode ? <Moon size={24} className="text-blue-500" /> : <Sun size={24} className="text-yellow-500" />}
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">Theme</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Currently: {isDarkMode ? 'Dark' : 'Light'}</p>
              </div>
            </div>
            <ChevronRight size={24} className="text-gray-500 dark:text-gray-400" />
          </div>
          <Link
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            to={"/reset-password"}
            onClick={() => console.log('Navigate to Change Password page')}
          >
            <div className="flex items-center space-x-3">
              <Lock size={24} className="text-blue-500" />
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">Change Password</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
              </div>
            </div>
            <ChevronRight size={24} className="text-gray-500 dark:text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
