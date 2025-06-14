import { Router } from "express";   
import { loginUser, registerUser, logoutUser } from "../controllers/auth.controller.js";

const router = Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to logout a user
router.post('/logout', logoutUser);

// Export the router
export default router;