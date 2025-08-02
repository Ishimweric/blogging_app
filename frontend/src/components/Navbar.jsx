import { useState } from "react"
import { Link } from "react-router-dom";
import {Menu, Moon, Sun, X} from "lucide-react"

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

  const toggleTheme = ()=>{};
  const toggleMobileMenu = ()=>{};

  return (
    <nav className="bg-white dark:text-white text-black dark:bg-gray-900 sticky top-0 shadow-md p-4 z-50 transition-colors duration-300 ease-in-out">
      <div className="container flex justify-between mx-auto items-center">
        {/* the logo */}
        <Link to={"/"} className="text-2xl text-gray-800 font-bold dark:text-white hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">NoteDown</Link>

        {/* dark mode toggle and the mobile menu */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
            {isDarkmode? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <button onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 hover:bg-gray-200 dark:hover:bg-gray-700  focus:ring-blue-500">
            {isMobileMenuOpen? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar