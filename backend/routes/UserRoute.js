import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/get-users", verifyUser, adminOnly, getUsers);
router.get("/get-users/:id", verifyUser, adminOnly, getUserById);
router.post("/register", verifyUser, adminOnly, createUser);
router.post("/user-register", registerUser);
router.patch("/update-user/:id", verifyUser, adminOnly, updateUser);
router.delete("/delete-user/:id", verifyUser, adminOnly, deleteUser);

export default router;
