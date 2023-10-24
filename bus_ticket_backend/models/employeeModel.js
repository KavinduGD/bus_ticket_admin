const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
    unique: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
    unique: true,
  },
  employeePassword: {
    type: String,
    required: true,
  },
  employeeRole: {
    type: String,
    required: true,
    enum: ["driver", "conductor", "inspector", "transportManager"],
  },
  employeeContact: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
