require("dotenv").config();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        name: user.firstName + " " + user.lastName,
        id: user._id,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    logger.error(`Login failed for ${email}: ${error.message}`);
    res.status(401).json({ success: false, message: error.message });
  }
};

// Signup User
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  try {
    const user = await User.signup(firstName, lastName, email, password, role);
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: {
        name: user.firstName + " " + user.lastName,
        id: user._id,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    logger.error(`Signup failed for ${email}: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    logger.error("Error retrieving users:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get Single User
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format." });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
  } catch (error) {
    logger.error(`Error fetching user ${id}:`, error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Create User (Admin Only)
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  try {
    const user = await User.signup(firstName, lastName, email, password, role);
    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    logger.error(`Error creating user ${email}:`, error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format." });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: user,
    });
  } catch (error) {
    logger.error(`Error deleting user ${id}:`, error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  let { password, ...updates } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format." });
  }

  try {
    if (password) {
      updates.password = await User.encrypt(password);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: user,
    });
  } catch (error) {
    logger.error(`Error updating user ${id}:`, error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
