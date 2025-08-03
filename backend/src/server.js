import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import cors from 'cors';

dotenv.config();


const app= express();
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

app.listen(5001, ()=>{
    console.log(`Server started on PORT: ${PORT}`);
})
