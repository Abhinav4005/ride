import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

userSchema.methods.generateAuthToken = function() {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
}

userSchema.statics.hashPassword = async function (password) {
    const salt = bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;