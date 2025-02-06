const express = require("express");
const {
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
  updateRoom,
} = require("../controllers/roomController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// Publicly accessible routes (No authentication required)
router.use(requireAuth);
router.get("/", getRooms);
router.get("/:id", getRoom);

// Authenticated-only routes

// Admin-only routes
router.use(requireAdmin);
router.post("/", createRoom);
router.delete("/:id", deleteRoom);
router.patch("/:id", updateRoom);

module.exports = router;
