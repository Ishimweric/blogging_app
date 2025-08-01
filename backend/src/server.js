import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";

dotenv.config();


const app= express();
const PORT = process.env.PORT || 5001

connectDB();

app.listen(5001, ()=>{
    console.log(`Server started on PORT: ${PORT}`);
})
