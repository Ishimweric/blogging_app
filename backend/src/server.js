import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import posts from "./routes/posts.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});