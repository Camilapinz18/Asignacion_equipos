const mongoose = require('mongoose')

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  serial: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  isNewEquipment: {
    type: Boolean,
    required: true
  },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  reference_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reference',
    required: true
  },
  isAssigned:{
    type:Boolean,
    default:false
  }
})

const Equipment = mongoose.model('Equipment', equipmentSchema)
module.exports = Equipment
