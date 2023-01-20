const express = require("express");
const register = require("./register");
const login = require("./login");
const loginWithGoogle = require("./loginWithGoogle");
const router = express.Router();

router.use(register);
router.use(login);
router.use(loginWithGoogle);

module.exports = router;
