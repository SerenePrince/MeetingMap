require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./utils/logger");
const { generalLimiter, sensitiveLimiter } = require("./middleware/limiter");
const { corsOption } = require("./middleware/corsOptions");

const roomRoutes = require("./routes/rooms");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/booking");

const app = express();

// Security & Middleware
app.use(helmet());
app.use(generalLimiter);
app.use(cors(corsOption));
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/users", sensitiveLimiter, userRoutes);
app.use("/api/bookings", sensitiveLimiter, bookingRoutes);

module.exports = app;
