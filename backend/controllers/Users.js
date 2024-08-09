import User from "../models/UserModel.js";
import argon2 from "argon2";

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

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, confPassword, role } = req.body;
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
        role: role,
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
