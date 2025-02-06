const rateLimit = require("express-rate-limit");

// General API rate limiter (2000 requests per hour)
const generalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2000,
  message: "Too many requests, please try again later.",
  headers: true, // Send rate limit headers in response
  handler: (req, res, next) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res
      .status(429)
      .json({ error: "Too many requests, please try again later." });
  },
});

// Sensitive actions rate limiter (200 requests per hour)
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 200,
  message: "Too many requests, please try again later.",
  headers: true,
  handler: (req, res, next) => {
    console.warn(`Sensitive rate limit exceeded for IP: ${req.ip}`);
    res
      .status(429)
      .json({ error: "Too many requests, please try again later." });
  },
});

module.exports = { generalLimiter, sensitiveLimiter };
