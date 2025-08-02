import express from "express"
import { 
  loginUser, 
  signupUser, 
  requestPasswordReset, 
  getLoggedInUser, 
  changePassword
} from "../controllers/authController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

// public routes
router.post("/signup", signupUser);
router.post("/login", loginUser)

// private routes
router.get("/user", protect, getLoggedInUser);
router.post("/resetpassword", protect ,changePassword);

export default router;