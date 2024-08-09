import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const ResetUserName = () => {
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetName = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/users/reset-user-name",
        {
          newName,
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
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Reset Your Name
      </h2>

      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter your new name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleResetName}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reset Name
      </button>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default ResetUserName;
