const express = require("express");
const morgan = require("morgan");
const car = require("./routes");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1", car);

module.exports = app;
