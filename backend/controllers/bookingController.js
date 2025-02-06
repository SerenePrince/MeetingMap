const Booking = require("../models/bookingModel");
const logger = require("../utils/logger");

// Helper function for handling errors
const handleError = (res, error, statusCode = 400) => {
  logger.error(error);
  res.status(statusCode).json({ success: false, message: error.message });
};

// Check room availability
const isRoomAvailable = async (
  roomId,
  startTime,
  endTime,
  excludeBookingId = null
) => {
  const query = {
    room: roomId,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlapping case
    ],
  };

  if (excludeBookingId) query._id = { $ne: excludeBookingId };

  const conflict = await Booking.findOne(query);
  return !conflict;
};

// Get bookings by room
const getBookingsByRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const bookings = await Booking.find({ room: roomId })
      .populate("user")
      .populate("room")
      .sort({ startTime: 1 });

    const isAvailable = await isRoomAvailable(roomId, new Date(), new Date());

    res.status(200).json({
      success: true,
      message: "Room bookings retrieved.",
      data: { bookings, isAvailable },
    });
  } catch (error) {
    handleError(res, error, 500);
  }
};

// Get bookings by user
const getBookingsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookings = await Booking.find({ user: userId })
      .populate("user")
      .populate("room")
      .sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      message: "User bookings retrieved.",
      data: bookings,
    });
  } catch (error) {
    handleError(res, error, 500);
  }
};

// Get a single booking
const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id)
      .populate("user")
      .populate("room");

    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });

    res.status(200).json({
      success: true,
      message: "Booking retrieved successfully.",
      data: booking,
    });
  } catch (error) {
    handleError(res, error, 500);
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("room")
      .sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      message: "All bookings retrieved.",
      data: bookings,
    });
  } catch (error) {
    handleError(res, error, 500);
  }
};

// Create booking
const createBooking = async (req, res) => {
  const { user, room, date, startTime, endTime, purpose } = req.body;

  if (!user || !room || !date || !startTime || !endTime) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be provided.",
    });
  }

  try {
    const available = await isRoomAvailable(room, startTime, endTime);

    if (!available) {
      return res
        .status(400)
        .json({ success: false, message: "Time slot already booked." });
    }

    const booking = await Booking.create({
      user,
      room,
      date,
      startTime,
      endTime,
      purpose,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully." });
  } catch (error) {
    handleError(res, error, 500);
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime, roomId } = req.body;

  try {
    const available = await isRoomAvailable(roomId, startTime, endTime, id);

    if (!available) {
      return res
        .status(400)
        .json({ success: false, message: "Time slot already booked." });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBooking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });

    res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: updatedBooking,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Delete expired bookings (node-cron)
const deleteExpiredBookings = async () => {
  const now = new Date();
  try {
    await Booking.deleteMany({ endTime: { $lt: now } });
    logger.info("Expired bookings deleted.");
  } catch (error) {
    logger.error("Error deleting expired bookings:", error);
  }
};

module.exports = {
  getBookingsByRoom,
  getBookingsByUser,
  getBookingById,
  getBookings,
  createBooking,
  deleteBooking,
  updateBooking,
  deleteExpiredBookings,
};
