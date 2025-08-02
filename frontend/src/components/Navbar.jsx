import { useState } from "react"
import { Link } from "react-router-dom";
import {Menu, Moon, Sun, User, X} from "lucide-react"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkmode,setIsDarkmode] = useState(()=>{
    //set darkmode to from localstorage pr default to light
    if (typeof window !== undefined){
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark" ;
    }

    return false
  })

  const toggleTheme = ()=>{
    setIsDarkmode(!isDarkmode);
  };
  const toggleMobileMenu = ()=>{
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:text-white text-black dark:bg-gray-900 sticky top-0 shadow-md p-4 z-50 transition-colors duration-300 ease-in-out">
      <div className="container flex justify-between mx-auto items-center">
        {/* the logo */}
        <Link to={"/"} className="text-2xl text-gray-800 font-bold dark:text-white hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">NoteDown</Link>

        {/* dark mode toggle and the mobile menu */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
            {isDarkmode? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-200 dark:hover:bg-gray-700  focus:ring-blue-500">
            {isMobileMenuOpen? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {/* for desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={toggleTheme} className="p-2 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
            {isDarkmode? <Sun size={20}/> : <Moon size={20}/>}
          </button>

          {!isLoggedIn?(
            <div>
              <Link to={"/login"} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2 rounded-md">Login</Link>
              <Link to="/signup" className="text-white px-4 py-2 bg-blue-600  rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium">Signup</Link>
            </div>
          ):(
            <div className="relative group">
              <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                <User size={24} className="rounded-full bg-gray-200 dark:bg-gray-700 p-1" />
                <span className="font-medium hidden lg:inline">{username}</span> {/* to show usernames on larger screens*/}
              </Link>
              {/* Optional: Dropdown for more profile options*/}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform scale-95 group-hover:scale-100 origin-top-right">
                <Link to="/dashboard" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                <button onClick={handleLogout}  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar