const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  purpose: { type: String, default: "Meeting" },
});

// Ensure `startTime` is before `endTime` and validate `date`
bookingSchema.pre("save", async function (next) {
  const today = new Date(new Date().setUTCHours(0, 0, 0, 0));

  if (this.date < today) {
    return next(new Error("Booking date must be today or in the future."));
  }

  if (this.startTime >= this.endTime) {
    return next(new Error("End time must be after start time."));
  }

  // Check for overlapping bookings
  const overlappingBooking = await mongoose.model("Booking").findOne({
    room: this.room,
    $or: [
      { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } },
    ],
  });

  if (overlappingBooking) {
    return next(
      new Error("This room is already booked during the selected time.")
    );
  }

  next();
});

// Auto-update `isAvailable` when a booking is deleted
bookingSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;

  const activeBookings = await mongoose.model("Booking").countDocuments({
    room: doc.room,
    endTime: { $gt: new Date() },
  });

  if (activeBookings === 0) {
    await mongoose
      .model("Room")
      .findByIdAndUpdate(doc.room, { isAvailable: true });
  }
});

// Utility function to update `isAvailable` periodically
bookingSchema.statics.updateRoomAvailability = async function () {
  const rooms = await mongoose.model("Room").find();
  const now = new Date(); // Current timestamp

  for (const room of rooms) {
    // Check if there's an active booking that is currently ongoing
    const isRoomOccupied = await mongoose.model("Booking").exists({
      room: room._id,
      startTime: { $lte: now }, // Meeting has started
      endTime: { $gt: now }, // Meeting hasn't ended
    });

    await mongoose
      .model("Room")
      .findByIdAndUpdate(room._id, { isAvailable: !isRoomOccupied });
  }
};

module.exports = mongoose.model("Booking", bookingSchema);
