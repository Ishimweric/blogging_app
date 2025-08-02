import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Toaster from "react-hot-toast"
import SignupPage from "./pages/SignupPage"
const App = () => {
  return (
    <Router>
      {/* <Toaster position="top-center" reverseOrder={false}/> */}
      <Routes>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  )
}

export default App