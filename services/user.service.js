import User from "../models/user.model"

export const createUser = async({firstName, lastName, email, password})=>{
    if(!firstName || !email || !password){
        console.log("All field's are required")
    }

    const user = await User.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    });

    return user;
}