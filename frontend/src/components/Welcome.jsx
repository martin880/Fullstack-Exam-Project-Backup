import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 my-4">Dashboard</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Welcome Back,{" "}
        <strong className="text-gray-900">{user && user.name}</strong>
      </h2>

      <div className="mb-4 p-4 bg-white shadow-md rounded-md">
        <p className="text-lg text-gray-700">{user && user.email}</p>
      </div>

      <div className="flex space-x-4">
        <Link
          to={`/users/edit/${user}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Edit Name
        </Link>
        <Link
          to={`/users/reset-password/${user}`}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Edit Password
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
