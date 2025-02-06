const express = require("express");
const {
  loginUser,
  signupUser,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// Public Routes (No authentication required)
router.post("/login", loginUser);
router.post("/signup", signupUser);

// Authenticated Users (Allow users to fetch their own info)
router.use(requireAuth);
router.get("/:id", getUser);

// Admin-Only Routes
router.use(requireAdmin);
router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
