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
    <nav>navbar</nav>
  )
}

export default Navbar