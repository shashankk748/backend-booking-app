const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
});

const Passenger = mongoose.model("Passenger", passengerSchema);

module.exports = Passenger;
