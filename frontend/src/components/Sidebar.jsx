import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md p-4">
        <p className="text-lg font-semibold text-gray-700 mb-4">General</p>
        <ul className="space-y-2">
          <li>
            <NavLink
              to={"/dashboard"}
              className="flex items-center text-gray-700 hover:text-blue-600 font-medium p-2 rounded transition duration-150"
              activeClassName="bg-blue-100 text-blue-600"
            >
              <IoHome className="mr-2" /> Dashboard
            </NavLink>
          </li>
        </ul>

        {user && user.role === "admin" && (
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-700 mb-4">Admin</p>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to={"/users"}
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium p-2 rounded transition duration-150"
                  activeClassName="bg-blue-100 text-blue-600"
                >
                  <IoPerson className="mr-2" /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-700 mb-4">Settings</p>
          <ul className="space-y-2">
            <li>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-red-600 font-medium p-2 rounded transition duration-150 w-full text-left"
              >
                <IoLogOut className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
