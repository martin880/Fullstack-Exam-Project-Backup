import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function FormResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/reset-user-password",
        {
          oldPassword,
          newPassword,
          confNewPassword,
        }
      );
      setMessage(response.data.msg);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };
  return (
    <div className="max-w-md mx-2 my-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Reset Your Password
      </h2>

      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Old Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        value={confNewPassword}
        onChange={(e) => setConfNewPassword(e.target.value)}
        placeholder="Re-enter New Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleResetPassword}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reset Password
      </button>

      {message && <p className="mt-4 text-red-600 font-medium">{message}</p>}
    </div>
  );
}
