const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  travelClass: {
    type: String,
    required: true,
  },

  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
    },
  ],
  status: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
