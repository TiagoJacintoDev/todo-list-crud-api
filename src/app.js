const express = require("express");
const app = express();
require("dotenv").config();
require("./config/connectDB")();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/lists", authHandler, require("./routes/listRoutes"));
app.use("/api/tasks", authHandler, require("./routes/taskRoutes"));

app.use(require("./middleware/errorHandler"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
