const express = require("express");
const {
  getBookingsByRoom,
  getBookingsByUser,
  getBookingById,
  getBookings,
  createBooking,
  deleteBooking,
  updateBooking,
  deleteExpiredBookings,
} = require("../controllers/bookingController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

// Authenticated routes (all booking-related actions require login)
router.use(requireAuth);

// Get bookings (authenticated users only)
router.get("/room/:roomId", getBookingsByRoom);
router.get("/user/:userId", getBookingsByUser);
router.get("/:id", getBookingById);

// Admin-only routes
router.get("/", requireAdmin, getBookings);
router.delete("/purge", requireAdmin, deleteExpiredBookings);

// Booking management (authenticated users)
router.post("/", createBooking);
router.delete("/:id", deleteBooking);
router.patch("/:id", updateBooking);

module.exports = router;
