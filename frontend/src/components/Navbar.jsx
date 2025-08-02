import { useState } from "react"
import { Link } from "react-router-dom";

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
  return (
    <nav className="bg-white dark:text-white text-black dark:bg-gray-900 sticky top-0 shadow-md p-4 z-50 transition-colors duration-300 ease-in-out">
      <div className="container flex justify-between mx-auto items-center">
        {/* the logo */}
        <Link to={"/"} className="text-2xl text-gray-800 font-bold dark:text-white hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200">NoteDown</Link>
      </div>
    </nav>
  )
}

export default Navbar