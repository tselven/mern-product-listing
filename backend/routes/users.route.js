import { Router } from "express";   
import { getAllUsers, getUser, addUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = Router();

// Route to get all users
router.get('/', getAllUsers);

// Route to get a specific user by ID
router.get('/:id', getUser);

// Route to add a new user
router.post('/', addUser);

// Route to update a user by ID
router.put('/:id', updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

export default router;
