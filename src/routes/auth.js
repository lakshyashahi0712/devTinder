const express = require("express");
const authRouter = express.Router();
const { User } = require("../models/user");
const { validateSignUpData } = require("../utils/validate");
const bcrypt = require("bcrypt");

// ---------------- SIGNUP ----------------
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: passwordHash });
    const savedUser = await user.save();

    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: "User added successfully", data: savedUser });

  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// ---------------- LOGIN ----------------
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: "Login successful", user });

  } catch (err) {
    res.status(400).send("Error logging in the user: " + err.message);
  }
});

// ---------------- LOGOUT ----------------
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now())
  });
  res.send("Logout successfully");
});

module.exports = authRouter;
