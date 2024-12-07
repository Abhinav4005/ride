import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authUser = async(req, res, next)=>{
    const token = req.cookies.token || req.header.authorization?.split(' ')[ 1 ];
    console.log("token", token)

    if(!token){
        return res.status(401).json({error:"Unautroized"});
    }

    const isBlacklist = await User.findOne({token:token});

    if(isBlacklist){
        return res.status(401).json({error:"Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        req.user = user;
        return next();
    } catch (error) {
        console.log("Error in authUser", error.message);
        return res.status(401).json({error:"Unauthorized"})
    }
}