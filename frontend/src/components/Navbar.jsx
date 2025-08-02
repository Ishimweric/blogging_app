import { useState } from "react"

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
      <div>
        navbar
      </div>
    </nav>
  )
}

export default Navbar