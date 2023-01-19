const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ email });

    if (!userWithEmail || userWithEmail.password !== password) {
      res.status(400);
      throw new Error("Email or password does not match");
    }

    const jwtToken = jwt.sign(
      {
        id: userWithEmail.id,
        email: userWithEmail.email,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Welcome Back", token: jwtToken });
  })
);

module.exports = router;
