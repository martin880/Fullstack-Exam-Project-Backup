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
    <div>
      <h2>Reset Your Password</h2>
      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Old Password"
      />
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <input
        type="password"
        value={confNewPassword}
        onChange={(e) => setConfNewPassword(e.target.value)}
        placeholder="Re-enter New Password"
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}
