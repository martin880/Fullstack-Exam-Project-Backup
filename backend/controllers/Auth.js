import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    // Increment the login count
    user.loginCount += 1;
    await user.save();

    req.session.userId = user.uuid;

    res.status(200).json({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// To get session of user
export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please log in to your account!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json(user);
};

// Logout user
export const Logout = async (req, res) => {
  try {
    // get ID or UUID users from session
    const userId = req.session.userId;
    if (!userId) return res.status(400).json({ msg: "No user logged in" });

    // Update lastLogoutTimestamp with date now
    await User.update(
      { lastLogoutTimestamp: new Date() },
      { where: { uuid: userId } }
    );

    // destroy user session
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: "Cannot log out" });
      res.status(200).json({ msg: "You have logged out" });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
