const express = require("express");
const app = express();
require("dotenv").config();
require("./config/connectDB")();
require("./auth/passport");
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./api/index"));

app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/lists", require("./routes/listRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.use(require("./middleware/errorHandler"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
