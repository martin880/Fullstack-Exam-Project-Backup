import React, { useState, useEffect } from "react";
import axios from "axios";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [averageActiveUsers, setAverageActiveUsers] = useState(0);

  useEffect(() => {
    getAverageActiveUsers();
  }, []);

  const getAverageActiveUsers = async () => {
    const response = await axios.get(
      "http://localhost:5000/users/get-average-active-users"
    );
    setAverageActiveUsers(response.data.averageActiveUsers);
  };

  useEffect(() => {
    getActiveUsersToday();
  }, []);

  const getActiveUsersToday = async () => {
    const response = await axios.get(
      "http://localhost:5000/users/get-active-session"
    );
    setTotalActiveUsers(response.data.totalActiveUsers);
  };

  useEffect(() => {
    getTotalUsers();
  }, []);

  const getTotalUsers = async () => {
    const response = await axios.get(
      "http://localhost:5000/users/get-total-users"
    );
    setTotalUsers(response.data.totalUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users/get-users");
    setUsers(response.data);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <div>
        <h1>Total Users Signed Up: {totalUsers}</h1>
      </div>
      <div>
        <h1>Active Users Today: {totalActiveUsers}</h1>
      </div>
      <div>
        <h1>Average Active Users (Last 7 Days): {averageActiveUsers}</h1>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Sign Up Time</th>
            <th>Login Count</th>
            <th>Logged Out Time</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.signUpTimestamp)}</td>
              <td>{user.loginCount}</td>
              <td>{formatDate(user.lastLogoutTimestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
