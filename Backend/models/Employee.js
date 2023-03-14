const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    identification: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }
})

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee