import { Link, useNavigate, useLocation } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { FaPlus, FaSignOutAlt, FaSearch } from "react-icons/fa"
import { useState, useRef, useEffect } from "react"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState("")
  const inputRef = useRef(null)

  const handleAddItem = () => {
    navigate("/addteam")
  }

  const handleLogout = async () => {
    await signOut(auth)
    // navigate("/")
    navigate("/", { replace: true })
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)

    if (location.pathname === "/home") {
      navigate(`/home?search=${value}`)
    }
  }

  // Auto focus when search opens
  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus()
    }
  }, [showSearch])

  return (
    <nav className="fixed top-0 w-full z-50 bg-black h-16 flex items-center justify-between px-6">

      {/* Logo */}
      <Link to="/home">
        <img
          height="70"
          width="70"
          src="https://crystalpng.com/wp-content/uploads/2025/09/ipl-logo.png"
          alt="IPL Logo"
        />
      </Link>

      {/* Right Section */}
      <div className="relative flex items-center gap-2 lg:gap-4">

        {/* Search Icon */}
        <FaSearch
          onClick={() => setShowSearch(!showSearch)}
          className="text-xl text-white cursor-pointer transition duration-300 hover:text-amber-400 hover:scale-110"
        />

        {/* Floating Search Input */}
        {showSearch && (
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search Team..."
            className="absolute right-27 lg:right-32  px-3 py-2 rounded shadow-lg transition-all duration-300 w-20 sm:w-40 lg:w-56 text-white mr-10"
          />
        )}

        <button
          onClick={handleAddItem}
          className="text-white px-4 py-2 rounded cursor-pointer transition duration-300  hover:scale-110"
        >
          <FaPlus className="text-xl text-white hover:text-green-400" />
        </button>

        <button
          onClick={handleLogout}
          className="text-white px-4 py-2 rounded cursor-pointer transition duration-300 hover:scale-110"
        >
          <FaSignOutAlt className="text-xl hover:text-red-700" />
        </button>

      </div>
    </nav>
  )
}

export default Header