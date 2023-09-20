const express = require("express");
const morgan = require("morgan");
const car = require("../routes/routes");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/api/v1", (req, res) => {
  res.status(200).json({ message: "Ping Successfully" });
});

app.use("/api/v1/cars", car);

module.exports = app;
