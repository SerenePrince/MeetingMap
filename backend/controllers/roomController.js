const Room = require("../models/roomModel");
const mongoose = require("mongoose");
const logger = require("../utils/logger");

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Rooms retrieved successfully.",
      data: rooms,
    });
  } catch (error) {
    logger.error("Error fetching rooms:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get single room
const getRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid room ID format." });
  }

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }

    res.status(200).json({
      success: true,
      message: "Room retrieved successfully.",
      data: room,
    });
  } catch (error) {
    logger.error(`Error fetching room ${id}:`, error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Create room
const createRoom = async (req, res) => {
  const { name, location, capacity, amenities } = req.body;

  if (!name || !location || !capacity || !amenities) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  try {
    const room = await Room.create({ name, location, capacity, amenities });

    res.status(201).json({
      success: true,
      message: "Room created successfully.",
      data: room,
    });
  } catch (error) {
    logger.error("Error creating room:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete room
const deleteRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid room ID format." });
  }

  try {
    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully.",
      data: room,
    });
  } catch (error) {
    logger.error(`Error deleting room ${id}:`, error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Update room
const updateRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid room ID format." });
  }

  try {
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found." });
    }

    res.status(200).json({
      success: true,
      message: "Room updated successfully.",
      data: room,
    });
  } catch (error) {
    logger.error(`Error updating room ${id}:`, error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};
