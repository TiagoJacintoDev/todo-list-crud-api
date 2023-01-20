const express = require("express");
const app = express();
require("dotenv").config();
require("./config/connectDB")();
require("./auth/passport");
require("./auth/passportGoogleSSO");
const passport = require("passport");
const cookieSession = require("cookie-session");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("./api/index"));

app.use(passport.authenticate("jwt", { session: false }));
app.use("/api/lists", require("./routes/listRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./middleware/errorHandler"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
