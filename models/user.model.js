import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3, 'First name must be at least 3 characters']
        },
        lastName:{
            type:String,
            required:true,
            minLength:[3, 'Last name must be at least 3 characters']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[5, 'Email must be at least 5 character long']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    },  
})

userSchema.method.generateAuthToke = function(){
    const token = jwt.sign({_id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.statics.hashPassword = async function (password) {
    const salt = bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
}

userSchema.method.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;