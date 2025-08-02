import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';

// create the auth Context
const AuthContext = createContext(null);

// create the Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); //indicate initial auth check is in progres

  // function to handle login, it'll be called by both login and signup pages
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    toast.success('Login successful!');
  };

  // function to tackle logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false)
    setUser(null);
    toast.success('Logged out successfully!');
  };

  // Effect to check auth status on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');

    if (token && userInfo) {
      try {
        const parsedUser =JSON.parse(userInfo);
        setIsLoggedIn(true);
        setUser(parsedUser);

      } catch (err) {
        console.error("Failed to parse user info from localStorage on init:", err);
        //clear invalid data if the parsing fails
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setIsLoadingAuth(false); // auth check complete
  }, [])

  //provide the auth state and functions to children components
  const authContextValue = {
    isLoggedIn,
    user,
    isLoadingAuth,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

//custom Hook to easily consume the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context=== undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
