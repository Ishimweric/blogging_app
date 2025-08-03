import jwt from "jsonwebtoken"
import User from "../models/Users.js"
import dotenv from "dotenv"

dotenv.config() // to load environment variables

// middlware to preotect routes or validate jwt
const protect = async (req, res, next)=>{
  let token;

  //check if authorisation header exists and they start with "Brearer"
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      // first get token from headers, 1 to omit "Bearer" word
      token = req.headers.authorization.split(" ")[1];
      // verify token using secret key from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); // find the user but omit password
      // if no user found go to the next middleware
      next()
    }catch (err) {
      console.error("Token verificaton failed", err.message);
      if (err.name === "TokenExpiredError"){
        return res.status(401).json({"Error" : "Not authorized , token expired!"})
      }else{
        return res.status(401).json({"Error" : "Not authorised, invalid token"})
      }
    }

    // if no token
    if (!token){
      res.status(401).json({"error" : "unauthorized , no token"})
    }
  }
};

export {protect}