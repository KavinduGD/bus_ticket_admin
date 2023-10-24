const Employee = require("../models/employeeModel");

//getAllEmployees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.send(employees);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//getEmployeeById
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//createEmployee
const createEmployee = async (req, res) => {
  console.log("asasa");
  try {
    const employee = new Employee({
      employeeID: req.body.employeeID,
      employeeName: req.body.employeeName,
      employeeEmail: req.body.employeeEmail,
      employeePassword: `${req.body.employeeID}123`,
      employeeRole: req.body.employeeRole,
      employeeContact: req.body.employeeContact,
    });
    const createdEmployee = await employee.save();
    res.status(201).send(createdEmployee);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// updateEmployee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      employee.employeeID = req.body.employeeID;
      employee.employeeName = req.body.employeeName;
      employee.employeeEmail = req.body.employeeEmail;
      employee.employeePassword = `${req.body.employeeID}123`;
      employee.employeeRole = req.body.employeeRole;
      employee.employeeContact = req.body.employeeContact;
      const updatedEmployee = await employee.save();
      res.send(updatedEmployee);
    }
  } catch (error) {
    res.status(404).send({ message: "Employee Not Found" });
  }
};

//deleteEmployee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.findByIdAndDelete(req.params.id);
      res.send({ message: "Employee Deleted" });
    }
  } catch (error) {
    res.status(404).send({ message: "Employee Not Found" });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
