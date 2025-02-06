const cron = require("node-cron");
const { deleteExpiredBookings } = require("../controllers/bookingController");
const logger = require("../utils/logger");

// Schedule task to run at midnight every day
cron.schedule("0 0 * * *", async () => {
  try {
    logger.info("Running task to delete expired bookings...");
    await deleteExpiredBookings();
  } catch (error) {
    logger.error("Error while deleting expired bookings:", error);
  }
});
