import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logoutService } from "../services/authServices";

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutService();
    dispatch({ type: "LOGOUT_SUCCESS" });
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight">odinBook</span>
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/profile"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Profile
          </Link>
          <Link
            to="/friends"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Friends
          </Link>
          {state.isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Logout
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
