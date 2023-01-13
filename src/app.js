const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db")();

const port = process.env.PORT || 8000;
app.listen(port);
