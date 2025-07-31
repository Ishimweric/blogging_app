import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next)=>{
  try {
    const {success} = await rateLimit.limit("limit-key");
    if (!success){
      return res.status(429).json({"message" : "too many requests"})
    }
    next(); // go to the next function 
  }catch (err) {
    console.error("Rate limit error", err.message);
    next(err);
  }
}