const express = require('express')
const router = express.Router()
const assignmentController = require('../controllers/assignment.controller')

router.post('/',assignmentController.createAssignment)
router.get('/',assignmentController.getAllAssignments)

module.exports = router