import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  )
}

export default App