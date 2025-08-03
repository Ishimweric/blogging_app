import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Stores user info: { _id, username, email, avatar }
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // To indicate initial auth check is in progress

  // Function to fetch user details from the backend
  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoadingAuth(false);
      return;
    }

    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_API_URL + '/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`, // Manually add the token here
        },
      });


      if (response.status === 200 && response.data) {
        // Backend returns user details directly
        const userData = response.data;
        setIsLoggedIn(true);
        setUser(userData);
        console.log("AuthContext: User details fetched from backend:", userData); // Debug log
      } else {
        // If token is invalid or user not found on backend, clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo'); // Clear old userInfo as well
        setIsLoggedIn(false);
        setUser(null);
        toast.error('Session expired or invalid. Please log in again.');
      }
    } catch (error) {
      console.error('AuthContext: Error fetching user details from backend:', error);
      // Clear local storage if API call fails (e.g., 401 Unauthorized, network error)
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      setIsLoggedIn(false);
      setUser(null);
      // Only show toast if it's not just an initial load without a token
      if (token) {
        toast.error('Failed to verify session. Please log in.');
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // On initial mount, fetch user details from backend
  useEffect(() => {
    fetchUserDetails();
  }, []); // Runs only once on mount

  // The login function now just triggers a re-fetch of user details
  const login = (token) => { // Only pass token, details will be fetched
    localStorage.setItem('token', token);
    // Remove old userInfo from localStorage as we'll rely on backend fetch
    localStorage.removeItem('userInfo');
    // Trigger re-fetch of user details
    fetchUserDetails();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const authContextValue = {
    isLoggedIn,
    user,
    isLoadingAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};