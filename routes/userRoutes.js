import express from "express";
import { registerUser, fetchAllUsers } from "../controllers/userController.js";
import { validateNewUser } from "../middleware/validateUser.js";

const router = express.Router();

router.post("/", validateNewUser, registerUser);
router.get("/", fetchAllUsers);

export default router;
