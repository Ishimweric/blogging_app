import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [isLoading, setisLoading] = useState(false)

  // to navigate to dashboard
  const navigate = useNavigate();
  const {login} = useAuth(); // get login fn

  // to handle form submission
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setisLoading(true);

    // basic validation
    if (!email.trim() || !password.trim()){
      toast.error("Please enter both email and password!");
      setisLoading(false);
      return;
    }

    //make api call to /login rote on the server
    try {
      const response = await axios.post("http://localhost:3500/api/auth/login", {
        email,
        password
      });
      console.log(response.status)
      //handle responses
      if (response.status === 200){
        toast.success("Logged in successfully!");
        //call the login function from authContext to update global state
        login(
          {
            _id:response.data._id,
            username: response.data.username,
            email: response.data.email,
            avatar: response.data.avatar,
          },
          response.data.token //pass the token to be stored in localstorage by context
        );
        // navigate("/dashboard")
      }
    }catch (err) {
      setisLoading(false);
      if (err.response){
        toast.error(err.response.data.message);
      }else{
        toast.error("An unexpected error occured, please try again!");
      }
      console.error("Login error", err.message)
    }finally{
      setisLoading(false)
    }
  }
  return (
    <section className="min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center">
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-md w-full text-center text-gray-950 dark:text-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">NoteDown</h2>
        <div className=" w-2/3 mx-auto">
          <p className="font-semibold text-gray-500 mb-6 text-center dark:text-gray-200">Share thoughts, spark conversations!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 ">
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
              placeholder="Password"
              className="w-full px-4 py-2 border text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          {/* signup button */}
          <button
            type="submit"
            className="w-full bg-blue-600 font-bold text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
            disabled = {isLoading}
          >
            {isLoading? "logging In..." :"Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4">
          {/* password forgot link */}
          <div>
            <Link to={"/reset-password"} className="text-blue-600 hover:underline text-sm"> Forgot password?</Link>
          </div>

          {/* create account link */}
          <div>
            <p className="text-sm text-gray-400">
              New user?{' '}
              <Link to={"/signup"} className="text-blue-600 hover:text-blue-700 font-medium">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage