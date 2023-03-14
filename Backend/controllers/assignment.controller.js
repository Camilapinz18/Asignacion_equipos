const Assignment = require('../models/Assignment')
const Employee = require('../models/Employee')
const Equipment = require('../models/Equipment')

const getAllAssignments = async (req, res) => {
  try {
    const allAssignments = await Assignment.find({}).populate('employee_id').populate('equipment_id')
    console.log('allAssignments', allAssignments.length)

    if (allAssignments.length > 0) {
      res.status(200).send(allAssignments)
    } else {
      res.status(204).json({ msg: 'There are no assignments yet' })
    }
  } catch (error) {
    console.log('getallAssignments Error:', error)
  }
}

const createAssignment = async (req, res) => {
  const { notes } = req.body
  const employee_id = req.body.employee_id.trim()
  const equipment_id = req.body.equipment_id.trim()

  try {
    const equipmentExists = await Equipment.findById(equipment_id)

    if (equipmentExists) {
      if (equipmentExists.isAssigned === false) {
        const employeeExists = await Employee.findById(employee_id)
        if (employeeExists) {
          console.log('ACA>>>>>>', employeeExists, equipmentExists)

          const newAssignment = new Assignment({
            employee_id: employeeExists._id,
            equipment_id: equipmentExists._id,
            date: new Date(),
            notes: notes
          })

          equipmentExists.isAssigned = true
          await equipmentExists.save()
          const savedAssignment = await newAssignment.save()

          await Assignment.populate(savedAssignment, {
            path: 'employee_id equipment_id'
          })

          res.status(200).send({ msg: 'Assignment created', savedAssignment })
        }
      }else{
        res.status(400).send({ msg: 'The equipment is already assigned' })
      }
    }
  } catch (error) {
    console.log('createBrand Error:', error)
    res.status(400).send({ msg: 'Equipment or employee not found' })
  }
}

module.exports = {
  getAllAssignments,
  createAssignment
}
