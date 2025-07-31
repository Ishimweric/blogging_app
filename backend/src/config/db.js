import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config() // load environment variables

// function to connect to db
const connectDB = async ()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED SUCCESSFULLY", conn);
  }catch (err) {
    console.error("Failed to connect to DB", err.message);
    process.exit(1); // exit process with failure
  }
}

export {connectDB}