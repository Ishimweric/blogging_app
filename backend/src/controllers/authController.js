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
    res.status(500).json({"message" : `server error during signing you up : ${err.message}`})
  }
};

// function to login users
const loginUser = async(req, res)=>{
  // get email n password from req body
  const {email, password} = req.body;

  // check if both email n passowrd are provided
  if (!email || !password){
    return res.status(400).json({"message" : "All field are required"})
  }

  try {
    // get user by email
    const user = await User.findOne({email});
    //check if user exists and if password is valid
    if (user && (await user.comparePassword(password))){
      res.status(200).json({
        "message" : "logged in successfully",
        "_id" : user._id,
        "name" : user.username,
        "email" : user.email,
        "token" : generateToken(user._id) // generate and send jwt
      })
    }else{
      res.status(401).json({"error" : "Invalid credentials"});
    }
  }catch (err) {
    console.error("Login error", err.message);
    res.status(500).json({"error" : `Server error, failed to log you in: ${err.message}`})
  }
};

// function to get info of loggedin user
const getLoggedInUser = async (req, res)=>{
  // if prtect middleware succesfully attachs req.user, it means token is correct
  if (req.user){
    res.status(200).json({
      "_id" : req.user._id,
      "username" : req.user.username,
      "email" : req.user.email,
      "avatar" : req.user.avatar
    });
  }else{
    // btw this shouldn't be hit if middleware if functioning well
    res.status(404).json({"error" : "User not found"})
  }
};

// password reset function
const requestPasswordReset = async(req, res)=>{
  const {email} = req.body;

  if (!email){
    return res.status(400).json({"message" : "Email required br"})
  }

  try {
    const user = await User.findOne({email});

    if(!user){
      // say that you've sent a link even if you don't for security purposes
      res.status(200).json({"message": "password reset link sent if the user exists"})
    }

    // this is a demo, very basic it doesn't actually send the message
    res.status(200).json({"message": "password reset link sent if the user exists"})
  }catch (err) {
    console.error("password reset error", err.message);
    res.status(500).json({"error" : "server error during password reset"})
  }
}

export {signupUser, loginUser, getLoggedInUser, requestPasswordReset}