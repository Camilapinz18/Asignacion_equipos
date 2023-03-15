const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  equipment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
})

const Assignment = mongoose.model('Assignment', assignmentSchema)
module.exports = Assignment
