import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage.jsx"
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import FloatingChatbot from "./components/FloatingBot.jsx";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import Dashboard from "./components/Dashboard.jsx"
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  const [isSidebarOpen , setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    
    <Router>
      <Toaster/>

      <AuthProvider>
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="flex min-h-[calc(100vh-64px)]">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <main
            className={`flex-1 transition-all duration-300 ease-in-out ml-0`}
          >
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage/>} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            <Footer/>
          </main>
        </div>
        <FloatingChatbot />
      </AuthProvider>
    </Router>
  )
};

export default App;
