const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/userController");
const BookingController = require("../Controllers/bookingController");
const BookingDisplay = require("../Controllers/bookingDisplay");
const Verify = require("../Middleware/verify");
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/booking", Verify, BookingController.createBooking);
router.post("/cancel", BookingController.cancelBooking);
router.get("/status", BookingDisplay.getBookingsByStatusAndDate);

module.exports = router;
