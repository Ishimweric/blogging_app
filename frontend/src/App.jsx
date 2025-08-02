import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  )
}

export default App