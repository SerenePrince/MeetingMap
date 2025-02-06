const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensure emails are stored in lowercase
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

userSchema.statics.encrypt = async function (password) {
  if (!password) {
    throw new Error("All fields are required.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain uppercase, lowercase, number, and special character."
    );
  }

  const salt = await bcrypt.genSalt(10);
  hash = await bcrypt.hash(password, salt);

  return hash;
};

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password is unchanged

  if (!validator.isStrongPassword(this.password)) {
    throw new Error(
      "Password must contain uppercase, lowercase, number, and special character."
    );
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  role
) {
  if (!firstName || !lastName || !email || !password) {
    throw new Error(
      "All fields (firstName, lastName, email, password) are required."
    );
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("Email already in use.");
  }

  const user = await this.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Both email and password are required.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User not found.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
