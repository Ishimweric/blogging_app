import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import FloatingChatbot from "./components/FloatingBot";

const App = () => {
  return (
    <Router>
      <Toaster/>
      <AuthProvider>
        <Navbar/>
        <FloatingChatbot/>
        <Routes>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/reset-password" element={<ResetPasswordPage/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App