import User from "../models/Users.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config(); //load env variables

// fn to generate a jwt token
const generateToken = (id) =>{
  // sign the token with user's id and the secret key
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn : "7d", // expires after seven days
  });
};