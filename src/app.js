const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/lists", require("./routes/listRoutes"));

app.use(require("./middleware/errorHandler"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
