const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee.controller')
const { validateCreateEmployee,validateUpdateEmployee } = require('../validators/employee.validator')

router.get('/', employeeController.getAllEmployees)
router.post('/', validateCreateEmployee,employeeController.createEmployee)
router.patch('/',validateUpdateEmployee,employeeController.updateEmployee)
router.delete('/', employeeController.deleteEmployee)

module.exports = router