const Employee = require('../models/Employee')

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find({})
    console.log('allEmployees', allEmployees.length)

    if (allEmployees.length > 0) {
      res.status(200).send(allEmployees)
    } else {
      res.status(204).json({ msg: 'There are no registered employees' })
    }
  } catch (error) {
    console.log('getAllEmployees Error:', error)
  }
}

const createEmployee = async (req, res) => {

  const identification = req.body.identification.trim();

  try {
    const userExists = await Employee.findOne({ identification: identification })

    if (userExists) {
      res.status(409).send({ msg: 'The employee already exists' })
    } else {
      const newEmployee = new Employee({
        identification: identification,
        name: req.body.name.toLowerCase().trim(),
        surname: req.body.surname.toLowerCase().trim(),
        address: req.body.address.toLowerCase().trim(),
        phone: req.body.phone.trim(),
        email: req.body.email.trim(),
      })
      const savedEmployee = await newEmployee.save()
      res.status(200).send({ msg: 'Employee successfully added ', savedEmployee })
    }
  } catch (error) {
    console.log('createEmployee Error:', error)
  }
}

const updateEmployee = async (req, res) => {
  const { newName, newSurname, newAddress, newEmail, newPhone, identification } = req.body

  try {
    const employeeExists = await Employee.findOne({ identification: identification })

    if (!employeeExists) {
      res.status(404).send({ msg: 'Employee not found' })
    } else {
      const employeeUpdated = await Employee.findOneAndUpdate({ identification: identification }, { name: newName, surname: newSurname }, { new: true })
      res.status(200).send({ msg: 'Employee updated successfully', employeeUpdated })
    }
  } catch (error) {
    console.log('updateEmployee Error:', error)
    res.status(500).send({ msg: 'Error updating the Employee' })
  }
}

const deleteEmployee = async (req, res) => {
  const { identification } = req.body

  try {
    const result = await Employee.deleteOne({ identification: identification })

    if (result.deletedCount === 0) {
      res.status(404).send({ msg: 'Employee not found' })
    } else {
      res.status(200).send({ msg: 'Employee successfully deleted' })
    }
  } catch (error) {
    console.log('deleteEmployee Error:', error)
  }
}

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
