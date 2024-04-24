const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const {
      Fname,
      Lname,
      age,
      email,
      mobile_no,
      City,
      State,
      Country,
      password,
    } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const user = new User({
      Fname,
      Lname,
      age,
      email,
      mobile_no,
      City,
      State,
      Country,
      password: hashedPass,
    });

    await user.save();

    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred!" });
  }
};

const login = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ email: username });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const accessToken = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign(
        { userId: user._id },
        "refresh-secret-key",
        {
          expiresIn: "48h",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        accessToken,
        refreshToken,
      });
    } else {
      return res.status(401).json({ message: "Password does not match" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, "refreshsecretValue", function (err, decode) {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      let token = jwt.sign({ userId: decode.userId }, "secretValue", {
        expiresIn: "60s",
      });
      res.status(200).json({ message: "Token refreshed", token });
    }
  });
};

module.exports = { signup, login, refreshToken };
