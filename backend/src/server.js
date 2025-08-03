import dotenv from "dotenv"
import express from "express"
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import rateLimiter from "./middlewares/rateLimiter.js";
import posts from "./routes/posts.js";
import cors from "cors";

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

// middlewares
app.use(cors({
  origin: "https://notedowny.netlify.app/"
}))
// builtin
app.use(express.json());

//custom
// use rate limiter middleware to limit nbr of requests a use can make 
app.use(rateLimiter)
// use auth routes on this endpoint
app.use("/api/auth", authRoutes);

// Mount routers
app.use("/api/posts", posts);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Server error",
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
