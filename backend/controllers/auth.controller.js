import mongoose from "mongoose";

import { User } from "../models/user.model.js";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ "error": "Email and password are required" });
    }
    try {
        const user = await User.find({ email });
        if (user.length === 0) {
            return res.status(404).json({ "error": "User not found" });
        }
        // Here you would typically compare the password with a hashed password
        // For simplicity, we are assuming the password matches
        // In a real application, use bcrypt or similar to hash and compare passwords
        if (user[0].password !== password) {
            return res.status(401).json({ "error": "Invalid credentials" });
        }
        // Generate a token (you would typically use jwt.sign here)
        const token = mongoose.Types.ObjectId().toString();
        res.status(200).json({ "success": "true", token, user: user[0] });
    } catch (error) {
        res.status(500).json({ "error": "Internal Server Error" });
    }
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ "error": "Username, email, and password are required" });
    }
    const newUser = new User({ username, email, password });
    try {
        await newUser.save();
        res.status(201).json({ "success": "true", data: newUser });
    }
    catch (error) {
        res.status(500).json({ "error": "Internal Server Error" });
    }
};

export const logoutUser = (req, res) => {
    // In a real application, you would invalidate the token here
    // For simplicity, we are just sending a success message
    res.status(200).json({ "success": "true", message: "User logged out successfully" });
}