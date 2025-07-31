import User from "../models/Users.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { use } from "react";

dotenv.config(); //load env variables

// fn to generate a jwt token
const generateToken = (id) =>{
  // sign the token with user's id and the secret key
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn : "7d", // expires after seven days
  });
};

// signup users function
const signupUser = async (req, res)=>{
  const {username, email, password} = req.body;

  //check if all are provided
  if (!username || !email || !password){
    return res.status(400).json({"Error" : "Please enter all fields"})
  }

  try {
    // check if user already exists either by email or username
    const userExists = await User.findOne({$or: [{email}, {username}]});
    if (userExists){
      return res.status(409).json({"message" : "user with this email or username already exists"})
    }

    //create a new user object
    const user = await User.create({
      username,
      email,
      password
    });

    // if user is successfully created
    if (user){
      //send back details and token
      res.status(201).json({
        "message" : "User created succesfully!",
        "_id" : user._id,
        "username" : user.username,
        "email" : user.email,
        "avatar" : user.avatar,
        "token" : generateToken(user._id)
      });
    }else{
      res.status(400).json({"error" : "invalid user data"})
    }
  }catch (err) {
    console.error("signup error");
    res.status(500).json({"message" : "server error during signing you up"})
  }
};