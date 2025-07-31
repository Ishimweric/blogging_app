import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/db.js";
import cors from "cors"
import path from "path"
import authRoutes from "./routes/authRoute.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// START THE SERVER AFTER CONNECTING TO THE DATABASE
connectDB().then(()=>{
  app.listen(PORT, ()=>{
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
  });
}).catch(err=>{
  console.error("Failed to connect to the DB", err);
  process.exit(1); // exit if db fails
});

