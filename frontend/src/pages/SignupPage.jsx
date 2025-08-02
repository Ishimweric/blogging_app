import { useState } from 'react'
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  // declare state controllers
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()

  // define handle submit function
  const handleSubmit = async(e)=>{
    e.preventDefault(); //primarily to prevent reloading
    setisLoading(true);

    //form validation
    if (!userName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()){
      toast.error("All fields are required", {
        duration : 4000
      })
      setisLoading(false);
      return;
    }

    if(password.trim() !== confirmPassword.trim()){
      toast.error("Passwords do not match!", {
        duration : 4000
      });
      setisLoading(false);
      return;
    }

    if (password.trim().length < 8){
      toast.error("Password must be atleast 8 characters long!");
      setisLoading(false);
      return;
    }

    // make api calls to backend
    try {
      const response = await axios.post("http://localhost:3500/api/auth/signup", {
        userName,
        email,
        password
      });

      // handle successful signup
      if (response.status === 201){
        toast.success("Sign up successful!");
        // navigate("/login");
      }
    }catch (err) {
      setisLoading(false);
      toast.error("Signup error!");
      console.error("Signup error", err.message)
    }finally{
      setisLoading(false)
    }
  }
  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="p-8 bg-white rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">NoteDown</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* for username */}
            <input 
              type='text' 
              placeholder="username"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:ring-2"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            {/* for email */}
            <input
              type='email'
              placeholder="E-mail"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            {/* for password */}
            <input
              type='password'
              placeholder="Create password"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            {/* for password confirmation */}
            <input
              type='password'
              placeholder="Re-enter password"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* signup button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
            disabled = {isLoading}
          >
            {isLoading? "submitting..." :"Sign Up"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default SignupPage