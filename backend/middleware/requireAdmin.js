require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only" });
    }

    req.user = user;
    next(); // User is admin, continue with the request
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = requireAdmin;
