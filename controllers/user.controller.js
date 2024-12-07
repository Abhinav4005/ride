import { validationResult } from "express-validator"
import User from "../models/user.model";
import { createUser } from "../services/user.service";

export const registerUser = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {firstName, lastName, email, password} = req.body;

    const hashedPassword = await User.hashPassword(password)

    const user = await createUser({
        firstName,
        lastName,
        email,
        password:hashedPassword
    });

    const token = await User.generateToken();
    res.status(201).json({token, user})
}