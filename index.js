const express = require("express");
const app = express();
path = require("path");
bodyParser = require("body-parser");
cors = require("cors");
const mongoose = require("mongoose");
const Port = 1000;
require("dotenv").config();
const mongourl = process.env.mongourl;

mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongourl, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("There is problem while connecting database " + err);
  }
);

// All the express routes
const employeeRoutes = require("./Routers/employeeRoutes");

// Conver incoming data to JSON format
app.use(bodyParser.json());

// // Enabled CORS
app.use(cors());

// Routes Configuration
app.use("/employees", employeeRoutes);

app.listen(Port, () => {
  console.log("server start at", Port);
});
