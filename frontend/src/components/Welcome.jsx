import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="title">Dashboard</h1>
      <h2 className="subtitle">
        Welcome Back <strong>{user && user.name}</strong>
      </h2>
      <div>
        <p className="">{user && user.email}</p>
      </div>
      <div>
        <Link to={`/users/edit/:id`}>Edit Name</Link>
      </div>
      <div>
        <Link to={`/users/reset-password/:id`}>Edit Password</Link>
      </div>
    </div>
  );
};

export default Welcome;
