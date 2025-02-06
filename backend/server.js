require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./utils/logger");
const createAdmin = require("./utils/initAdmin");
require("./tasks/bookingCleanup"); // Import expired bookings deletion cron
require("./tasks/roomAvailability"); // Import room availability update cron
const PORT = process.env.PORT || 4000;
// MongoDB Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      logger.info("Connected to Database");
      logger.info(`Listening on port ${PORT}`);
      createAdmin(); // Ensure admin exists on startup
    });
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error);
  });
