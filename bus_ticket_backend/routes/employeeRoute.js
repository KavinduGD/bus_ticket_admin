const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const router = express.Router();

//get
router.get("/", getAllEmployees);
//get
router.get("/:id", getEmployeeById);
//post
router.post("/", createEmployee);
//put
router.put("/:id", updateEmployee);
//delete
router.delete("/:id", deleteEmployee);

module.exports = router;
