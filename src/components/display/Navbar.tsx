import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logoutService } from "../../services/authServices";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutService();
    dispatch({ type: "LOGOUT_SUCCESS" });
    navigate("/login");
  };
  return (
    <div className="bg-blue-500">
      <nav className="max-w-3xl mx-auto flex items-center justify-between flex-wrap py-6 px-2">
        <div className="flex items-center flex-shrink-0 text-white mr-12">
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight">
              OdinBook
            </span>
          </Link>
        </div>
        {/* hamburger icon */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            {showMenu ? <FaTimes></FaTimes> : <FaBars></FaBars>}
          </button>
        </div>
        {/* menu */}
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            showMenu ? "" : "hidden"
          }`}
        >
          {state.isAuthenticated ? (
            <div className="text-sm lg:flex-grow">
              <Link
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Explore
              </Link>
              <Link
                to="/people"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                People
              </Link>

              <Link
                to="/profile"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Logout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
