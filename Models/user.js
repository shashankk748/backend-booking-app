const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    Fname: String,
    Lname: String,
    age: Number,
    gender: String,
    email: String,
    mobile_no: String,
    City: String,
    State: String,
    Country: String,
    password: String,
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
