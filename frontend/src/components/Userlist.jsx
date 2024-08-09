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
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-600 my-6">List of Users</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Total Users Signed Up:
        </h3>
        <p className="text-xl text-gray-900">{totalUsers}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Active Users Today:
        </h3>
        <p className="text-xl text-gray-900">{totalActiveUsers}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-medium text-gray-800">
          Average Active Users (Last 7 Days):
        </h3>
        <p className="text-xl text-gray-900">{averageActiveUsers}</p>
      </div>

      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sign Up Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Login Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Logged Out Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(user.signUpTimestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {user.loginCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(user.lastLogoutTimestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
