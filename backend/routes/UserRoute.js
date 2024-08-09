import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  getTotalUsers,
  getActiveSessionsToday,
  getAverageActiveUsersLast7Days,
  resetUserName,
  resetPassword,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/get-users", verifyUser, adminOnly, getUsers);
router.get("/get-users/:id", verifyUser, adminOnly, getUserById);
router.post("/register", verifyUser, adminOnly, createUser);
router.post("/user-register", registerUser);
router.put("/reset-user-name", verifyUser, resetUserName);
router.put("/reset-user-password", verifyUser, resetPassword);
router.patch("/update-user/:id", verifyUser, adminOnly, updateUser);
router.delete("/delete-user/:id", verifyUser, adminOnly, deleteUser);
router.get("/get-total-users", verifyUser, adminOnly, getTotalUsers);
router.get(
  "/get-active-session",
  verifyUser,
  adminOnly,
  getActiveSessionsToday
);
router.get(
  "/get-average-active-users",
  verifyUser,
  adminOnly,
  getAverageActiveUsersLast7Days
);

export default router;
