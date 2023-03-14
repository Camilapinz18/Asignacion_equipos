const mongoose = require('mongoose')

const referenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

const Reference = mongoose.model('Reference', referenceSchema)
module.exports = Reference