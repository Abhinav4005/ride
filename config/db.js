import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect to database")
    } catch (error) {
        console.log("Error connecting to databse", error.message)
    }
}

export default connectDB;