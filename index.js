import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/user", userRoute);

app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`Server running on port ${process.env.PORT}`);
})