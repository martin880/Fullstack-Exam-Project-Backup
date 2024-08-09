import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../react.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="fixed top-1 left- w-full bg-white shadow-md z-0">
      <div className="flex items-center justify-between p-4">
        <NavLink to="/dashboard" className="flex items-center">
          <img src={logo} alt="logo" className="w-20 h-auto object-contain" />
        </NavLink>

        <button
          className="lg:hidden p-2 text-gray-500"
          aria-label="menu"
          aria-expanded="false"
        >
          <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-600"></span>
        </button>

        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <button
            onClick={logout}
            className="text-gray-600 hover:text-gray-800"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
