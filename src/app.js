require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");

// create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());

// apply routes
app.use(router);

module.exports = app;
