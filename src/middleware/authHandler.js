const asyncHandler = require("express-async-handler");

module.exports = asyncHandler((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401);
    throw new Error("You must login first");
  }
});
