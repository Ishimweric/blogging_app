import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import FloatingChatbot from "./components/FloatingBot";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./components/Dashboard"

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
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        <FloatingChatbot />
      </AuthProvider>
    </Router>
  )
}

export default App