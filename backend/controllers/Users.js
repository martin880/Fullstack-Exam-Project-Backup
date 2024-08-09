import User from "../models/UserModel.js";
import Sessions from "../models/SessionModel.js";
import { Op } from "sequelize"; // Sequelize operator for date filters
import argon2 from "argon2";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "loginCount",
        "signUpTimestamp",
        "lastLogoutTimestamp",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Admin add user
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password don't match" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registration Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// User register
export const registerUser = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password don't match" });

  // Validate password: at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return res
      .status(400)
      .json({ msg: "Password must contain at least one lowercase letter." });
  }

  // Validate password: at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return res
      .status(400)
      .json({ msg: "Password must contain at least one uppercase letter." });
  }

  // Validate password: at least one digit
  if (!/\d/.test(password)) {
    return res
      .status(400)
      .json({ msg: "Password must contain at least one digit." });
  }

  // Validate password: at least one special character
  if (!/[@$!%*?&]/.test(password)) {
    return res
      .status(400)
      .json({ msg: "Password must contain at least one special character." });
  }

  // Validate password: at least 8 characters long
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters long." });
  }

  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "user",
    });
    res.status(201).json({ msg: "Registration Successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, confPassword } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete User (admin only)
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get total users
export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.count(); // Calculate the total number of users
    res.status(200).json({ totalUsers }); // Sends the number of users in a JSON response
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Handle errors
  }
};

// Get Active Session
export const getActiveSessionsToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    const activeSessions = await Sessions.findAll({
      where: {
        expires: {
          [Op.gt]: new Date(), // Sessions that are still valid
        },
        createdAt: {
          [Op.gte]: today, // Created or updated today
        },
      },
      attributes: ["userId"],
      group: ["userId"], // Group by userId to count unique users
    });

    const totalActiveUsers = activeSessions.length;

    res.status(200).json({ totalActiveUsers });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get Average Active Users
export const getAverageActiveUsersLast7Days = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7); // Set the time 7 days back

    // Retrieve all sessions in the last 7 days that are still valid
    const sessionsLast7Days = await Sessions.findAll({
      where: {
        expires: {
          [Op.gt]: today, // Sessions that are still valid
        },
        createdAt: {
          [Op.gte]: sevenDaysAgo, // Created in the last 7 days
        },
      },
      attributes: [
        "userId",
        [Sequelize.fn("DATE", Sequelize.col("createdAt")), "date"],
      ],
      group: ["date", "userId"], // Group by date and userId
    });

    // Count the number of unique users per day
    const userSessionsPerDay = sessionsLast7Days.reduce((acc, session) => {
      const date = session.getDataValue("date");
      if (!acc[date]) {
        acc[date] = new Set(); // Use Set to count unique users
      }
      acc[date].add(session.userId);
      return acc;
    }, {});

    // Calculate total users per day and average over the last 7 days
    const totalUsersPerDay = Object.values(userSessionsPerDay).map(
      (users) => users.size
    );
    const averageActiveUsers =
      totalUsersPerDay.reduce((acc, count) => acc + count, 0) / 7;

    res.status(200).json({ averageActiveUsers });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// User Reset Name or Update Name
export const resetUserName = async (req, res) => {
  try {
    const { newName } = req.body;
    const userId = req.session.userId; // Make sure the userId is saved in the session

    if (!userId) return res.status(400).json({ msg: "No user logged in" });

    // Validate new name (optional)
    if (!newName || newName.length < 3 || newName.length > 100) {
      return res
        .status(400)
        .json({ msg: "Name must be between 3 and 100 characters" });
    }

    // Update the username in the database
    await User.update({ name: newName }, { where: { uuid: userId } });

    res.status(200).json({ msg: "Name updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// User reset password
export const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confNewPassword } = req.body;
    const userId = req.session.userId; // Make sure the userId is saved in the session

    if (!userId) return res.status(400).json({ msg: "No user logged in" });

    // Validate the new password
    if (!newPassword || newPassword.length < 6 || newPassword.length > 100) {
      return res
        .status(400)
        .json({ msg: "New password must be between 6 and 100 characters" });
    }

    if (newPassword !== confNewPassword) {
      return res
        .status(400)
        .json({ msg: "New password and confirmation do not match" });
    }

    // Retrieve users from the database
    const user = await User.findOne({ where: { uuid: userId } });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Verify old password
    const isOldPasswordValid = await argon2.verify(user.password, oldPassword);
    if (!isOldPasswordValid)
      return res.status(400).json({ msg: "Old password is incorrect" });

    // Hash the new password
    const hashedNewPassword = await argon2.hash(newPassword);

    // Update the password in the database
    await User.update(
      { password: hashedNewPassword },
      { where: { uuid: userId } }
    );

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
