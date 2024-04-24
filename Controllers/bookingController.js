const Booking = require("../Models/booking");
const jwt = require("jsonwebtoken");
const Passenger = require("../Models/passenger");

const createBooking = async (req, res, next) => {
  try {
    const { from, to, journeyDate, travelClass, passengers } = req.body;
    const token = req.headers["x-access-key"];
    const decodedToken = jwt.verify(token, "your-secret-key");

    const userId = decodedToken.userId;

    const passengerIds = [];

    const parsedJourneyDate = new Date(journeyDate);

    const booking = new Booking({
      userId,
      from,
      to,
      journeyDate: parsedJourneyDate, // Store journeyDate as a Date
      travelClass,
      passengers: [],
      status: "Booked",
    });

    await booking.save();

    //saving each passenger
    for (const passenger of passengers) {
      const newPassenger = {
        ...passenger,
        bookingId: booking._id,
      };
      const savedPassenger = await Passenger.create(newPassenger);
      passengerIds.push(savedPassenger._id);
    }

    await Booking.findByIdAndUpdate(
      booking._id,
      { $set: { passengers: passengerIds } },
      { new: true }
    );

    res.json({ message: "Booking created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const id = req.body.bookingId;
    const booking = await Booking.findOne({ _id: id });
    if (!booking) {
      return res.status(404).json({ message: "No Booking found" });
    }

    await Booking.findOneAndUpdate(
      { _id: id },
      { $set: { status: "cancelled" } }
    );
    res.json({ message: "Booking Cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not Cancel, Please Try again" });
  }
};

module.exports = { createBooking, cancelBooking };
