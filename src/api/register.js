const express = require("express");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      res.status(400);
      throw new Error("User with this email already exists");
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    res.status(201).json(user);
  })
);

module.exports = router;
