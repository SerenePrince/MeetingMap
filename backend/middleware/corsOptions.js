require("dotenv").config();

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Ensure this is properly formatted
  methods: "GET,POST,PUT,DELETE",
};

module.exports = corsOptions;
