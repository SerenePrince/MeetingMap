const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures room names are unique
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"], // Prevents negative/zero capacity
      max: [500, "Capacity cannot exceed 500"], // Arbitrary upper limit for sanity
    },
    amenities: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.every(
            (item) => typeof item === "string" && item.trim().length > 0
          );
        },
        message: "All amenities must be non-empty strings.",
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
