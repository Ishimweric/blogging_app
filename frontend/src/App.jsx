import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
      </Routes>
    </Router>
  )
}

export default App