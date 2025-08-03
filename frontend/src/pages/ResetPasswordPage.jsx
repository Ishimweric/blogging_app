import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setisLoading(true);

    // client-side validation
    if (!newPassword.trim() || !currentPassword.trim()){
      toast.error("Please enter both current and new passwords!")
      setisLoading(false);
      return;
    }

    if (newPassword.trim() !== currentPassword.trim()){
      toast.error("Passwords do not match!");
      setisLoading(false);
      return;
    }

    if (newPassword.trim().length < 8){
      toast.error("Password must have atleast 8 characters!");
      setisLoading(false);
      return;
    }

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_API_URL + "reset-password", {
        currentPassword,
        newPassword
      });

      if (response.status === 200){
        toast.success("Password changed successfully!");
        navigate("/login");
      }
    } catch (err) {
      setisLoading(false);
      if (err.response){
        toast.error(err.response.data.message);
      }else{
        toast.error("An unexpected error occured, please try again!");
      }
      console.error("Password reset error", err.message)
    }finally{
      setisLoading(false);
    }
  }
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col justify-center items-center p-4">
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">NoteDown</h2>
        <div className=" w-2/3 mx-auto">
          <p className="font-semibold text-gray-500 dark:text-gray-400 mb-6 text-center">Share thoughts, spark conversations!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            {/* for current password */}
            <input
              type='password'
              placeholder="Current password"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              value={currentPassword}
              onChange={(e)=>setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div>
            {/* for password */}
            <input
              type='password'
              placeholder="New password"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* signup button */}
          <button
            type="submit"
            className="w-full bg-blue-600 font-bold text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600"
            disabled = {isLoading}
          >
            {isLoading? "Reseting..." :"Reset"}
          </button>
        </form>

        <div className="flex justify-between mt-4">
          {/* password forgot link */}
          <div>
            <Link to={"/reset-pawword"} className="text-blue-600 hover:underline text-sm"> Forgot password?</Link>
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

export default ResetPasswordPage