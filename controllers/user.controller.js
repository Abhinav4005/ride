import { validationResult } from "express-validator"
import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerUser = async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullName, email, password} = req.body;
    const {firstName, lastName} = fullName;

    const hashedPassword = await User.hashPassword(password)

    const user = await createUser({
        firstName,
        lastName,
        email,
        password:hashedPassword
    });

    const token = await user.generateAuthToken();
    res.status(201).json({token, user})
}

export const loginUser = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).select('+password')

        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({error:"Invalid credential's"})
        }

        const token = await user.generateAuthToken();

        res.cookie('token', token)

        res.status(200).json({token , user})
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getUserProfile = async(req, res)=>{
    return res.status(200).json(req.user);
}

export const logoutUser = async(req, res)=>{
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await BlacklistToken.create({token});

    res.status(200).json({message:"Logged out"})
}