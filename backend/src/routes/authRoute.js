import express from "express"
import { 
  loginUser, 
  signupUser, 
  requestPasswordReset, 
  getLoggedInUser 
} from "../controllers/authController"
import { protect } from "../middlewares/authMiddleware"

const router = express.Router();

// public routes
router.post("/signup", signupUser);
router.post("/login", loginUser)
router.post("/resetpassword", requestPasswordReset);

// private routes
router.get("/user", protect, getLoggedInUser);

export default router;