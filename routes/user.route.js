import express from "express";
import { body } from "express-validator";

const router = express.Router();

router.post("/register", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage("First name must be at least 3 character long"),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
])