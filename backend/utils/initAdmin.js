require("dotenv").config();
const User = require("../models/userModel");
const logger = require("./logger");

const createAdmin = async () => {
  try {
    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      await User.signup(
        "Admin",
        "Account",
        process.env.ADMIN_EMAIL,
        process.env.ADMIN_PASSWORD,
        "admin"
      );

      logger.info("Admin account created successfully.");
    } else {
      logger.info("Admin account already exists.");
    }
  } catch (error) {
    logger.error("Error creating admin account:", error);
  }
};

module.exports = createAdmin;
