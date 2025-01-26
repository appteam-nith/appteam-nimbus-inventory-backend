const mongoose = require("mongoose");

const specialRequestSchema = new mongoose.Schema(
  {
    club: {
      type: String,
      required: true, // Club making the specialRequest
    },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Club coordinator who made the specialRequest
      required: true,
    },
    ask: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SpecialRequest", specialRequestSchema);
