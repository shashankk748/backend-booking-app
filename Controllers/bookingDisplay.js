const Booking = require("../Models/booking");
const jwt = require("jsonwebtoken");

const getBookingsByStatusAndDate = async (req, res, next) => {
  try {
    const token = req.headers["x-access-key"];
    const decodedToken = jwt.verify(token, "your-secret-key");

    const userId = decodedToken.userId;
    const { status } = req.query;
    if (!status) {
      res.json({ message: "Enter the status" });
    }
    const currentDate = new Date();

    let query = { userId };

    if (status === ("cancelled" || "Cancelled")) {
      query.status = "cancelled";
    } else if (status === ("booked" || "Booked")) {
      query.status = "Booked";
      query.journeyDate = { $gte: currentDate };
    }

    const bookings = await Booking.find(query);

    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

module.exports = { getBookingsByStatusAndDate };
