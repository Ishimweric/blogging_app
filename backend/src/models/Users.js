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

// i used this pre save hook to hask pawsord before saving to the database
// and also this refers to the current doc being saved in db
userSchema.pre("save", async (next)=>{
  // only hash the pasword if it have been modified or if is new
  if (!this.isModified("password")){
    return next();
  }
  try {
    // generate a rendom salt with ten rounds of hashing
    const salt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
    next(); //continue the save operation
  }catch(err) {
    next(err);
  }
});

// method to compare the new pswrd with the one in the db
userSchema.methods.comparePassword = async (enteredPassword)=>{
  return await bcrypt.compare(enteredPassword, this.password);
}

// create User model
const User = mongoose.model("User", userSchema);
export default User