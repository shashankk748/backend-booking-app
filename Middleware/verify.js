const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../Models/user");

const Verify = async (req, res, next) => {
  try {
    const token = req.headers["x-access-key"];

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, "your-secret-key");

    if (decodedToken) {
      console.log("Valid Token");
      const userId = decodedToken.userId;

      const user = await User.findOne({ _id: userId });

      if (user) {
        console.log("User Found");
      } else {
        console.log("User Not Found");
      }
    } else {
      console.log("Invalid Token");
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Invalid Token" });
  }
  next();
};

module.exports = Verify;
