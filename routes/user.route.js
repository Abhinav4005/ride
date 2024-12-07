import express from "express";
import { body } from "express-validator";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage("First name must be at least 3 character long"),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
], registerUser);

router.post("/login", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 character long")
], loginUser);

router.get("/profile", authUser, getUserProfile);

router.post("/logout", authUser, logoutUser);

export default router