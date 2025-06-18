const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, username, email, password, userType } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
});
// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received with email:", email);

    // Validate request body
    if (!email || !password) {
      console.log("Email or password missing");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Trim the email to remove leading/trailing whitespace
    const trimmedEmail = email.trim();

    // Find the user by email (case-insensitive)
    console.log("Querying database with email:", trimmedEmail);
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${trimmedEmail}$`, "i") },
    });
    if (!user) {
      console.log("User not found for email:", trimmedEmail);
      return res.status(400).json({ message: "Invalid email" });
    }

    console.log("User found:", user);

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for email:", trimmedEmail);
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log("Login successful for email:", trimmedEmail);

    // Send the successful response with the JWT token and user details
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Error logging in" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password"); // Exclude the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = router;
