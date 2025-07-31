import mongoose from "mongoose"
import bcrypt from "bcrypt" // for hashing passowrds for security

// create user schema
const userSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    trim : true,
    minlenght : 3
  },
  email : {
    type : String,
    required : true,
    unique :true,
    trim : true,
    lowercase : true,
    match : /.+@.+\..+/
  },
  password : {
    type : String,
    required : true,
    minlenght : 8
  },
  avatar : {
    type : String,
    default: 'https://placehold.co/150x150/cccccc/000000?text=Avatar'
  }
}, {timestamps : true}) // timestamp to track creation date and updated date