const cron = require("node-cron");
const Booking = require("../models/bookingModel");
const logger = require("../utils/logger");

cron.schedule("* * * * *", async () => {
  try {
    logger.info("Running task to update room availability...");
    await Booking.updateRoomAvailability();
    logger.info("Room availability updated successfully.");
  } catch (error) {
    logger.error("Error while updating room availability:", error);
  }
});
