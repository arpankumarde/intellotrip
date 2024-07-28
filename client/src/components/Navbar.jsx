import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center h-16 drop-shadow-xl">
      <Link to="/" className="flex items-center">
        <img
          className="h-12 w-12 mr-2 object-contain"
          src="/logo.png"
          alt="logo"
        />
        <h1 className="text-lg font-bold">Intello Trip</h1>
      </Link>
      <div className="items-center space-x-4 hidden sm:flex">
        <Link to="/login" className={token ? "hidden" : null}>
          Login
        </Link>
        <Link to="/signup" className={token ? "hidden" : null}>
          Signup
        </Link>
        <button className={token ? null : "hidden"}>Profile</button>
        <button className={token ? null : "hidden"}>Saved Itineraries</button>
        <button className={token ? null : "hidden"} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="sm:hidden">
        <button className="" onClick={toggleMenu}>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={closeMenu}
        ></div>
      )}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col absolute top-0 right-0 mt-16 bg-white p-4 h-[calc(100dvh-4rem)]">
          <button className="text-black">Login</button>
          <button className="text-black">Signup</button>
          <button className="text-black">Profile</button>
          <button className="text-black">Saved Itineraries</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
