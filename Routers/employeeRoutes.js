// Importing important packages
const express = require("express");

// Using express and routes
const app = express();
const employeeRoute = express.Router();

// Employee module which is required and imported
let employeeModel = require("../Model/employee");

// To Get List Of Employees
employeeRoute.route("/").get(async function (req, res) {
  try {
    const examples = await employeeModel.find();
    res.json(examples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// To Add New Employee
employeeRoute.route("/addEmployee").post(function (req, res) {
  let employee = new employeeModel(req.body);
  employee
    .save()
    .then((game) => {
      res.status(200).json({ employee: "Employee Added Successfully" });
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

// To Get Employee Details By Employee ID
employeeRoute.route("/editEmployee/:id").get(async function (req, res) {
  let id = req.params.id;
  try {
    const examples = await employeeModel.findById(id);
    res.json(examples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// To Update The Employee Details
employeeRoute.route("/updateEmployee/:id").put(async function (req, res) {
  const { id } = req.params;
  const { username, lastName, email, phone } = req.body;

  try {
    const updatedUser = await employeeModel.findByIdAndUpdate(
      id,
      { username, lastName, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// To Delete The Employee
employeeRoute.route("/deleteEmployee/:id").delete(async function (req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await employeeModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = employeeRoute;
