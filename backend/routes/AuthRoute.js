import express from "express";
import { Login, Logout, Me } from "../controllers/Auth.js";
// import { Authenticate } from "../middleware/TokenAuthenticate.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
