const express = require("express");
const passport = require("passport");
const isUserAuthenticated = require("../middleware/authHandler");

const router = express.Router();

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
    session: false,
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in");
  }
);

router.get("/test", isUserAuthenticated, (req, res) => {
  res.status(200).json("User is authenticated");
});

module.exports = router;
