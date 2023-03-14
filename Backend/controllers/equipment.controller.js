const Brand = require('../models/Brand')
const Equipment = require('../models/Equipment')
const Reference = require('../models/Reference')

const getAllEquipments = async (req, res) => {
  try {
    const allEquipments = await Equipment.find({})
      .populate('brand_id')
      .populate('reference_id')
    console.log('allEquipments', allEquipments.length)

    if (allEquipments.length > 0) {
      res.status(200).send(allEquipments)
    } else {
      res.status(204).json({ msg: 'There are no registered equipments' })
    }
  } catch (error) {
    console.log('getallEquipments Error:', error)
  }
}

const createEquipment = async (req, res) => {
  const serial = req.body.serial.trim()
  const brand_id = req.body.brand_id.trim()
  const reference_id = req.body.reference_id.trim()

  try {
    const equipmentExists = await Equipment.findOne({ serial: serial })

    if (equipmentExists) {
      res.status(409).send({ msg: 'The equipment already exists' })
    } else {
      try {
        const brandExists = await Brand.findById(brand_id)
        console.log('brandExists', brandExists)

        const referenceExists = await Reference.findById(reference_id)
        console.log('referenceExists', referenceExists)

        if (brandExists && referenceExists) {
          const newEquipment = new Equipment({
            name: req.body.name.toLowerCase().trim(),
            serial: serial,
            description: req.body.description,
            isNewEquipment: req.body.isNewEquipment,
            brand_id: brandExists._id,
            reference_id: referenceExists._id
          })
          const savedEquipment = await newEquipment.save()

          await Equipment.populate(savedEquipment, {
            path: 'brand_id reference_id'
          })

          res
            .status(200)
            .send({ msg: 'Equipment successfully added ', savedEquipment })
        }
      } catch (error) {
        console.log('createEquipment Error:', error)
      }
    }
  } catch (error) {
    console.log('createEquipment Error:', error)
  }
}

const updateEquipment = async (req, res) => {
  const { name, serial, description, isNewEquipment, brand_id, reference_id } =
    req.body

  const id = req.body.id.trim()
  console.log('brandExists>>>>>>>>>>>>>', id)

  try {
    const equipmentExists = await Equipment.findById(id)

    if (!equipmentExists) {
      res.status(404).send({ msg: 'Equipment not found' })
    } else {
      try {
        const brandExists = await Brand.findById(brand_id)
        const referenceExists = await Reference.findById(reference_id)
        console.log('referenceExists', referenceExists)

        if (brandExists && referenceExists) {
          const equipmentUpdated = await Equipment.findOneAndUpdate(
            { _id: id },
            {
              name: name,
              serial: serial,
              description: description,
              isNewEquipment: isNewEquipment,
              brand_id: brandExists._id,
              reference_id: referenceExists._id
            },
            { new: true }
          )
          res
            .status(200)
            .send({ msg: 'Equipment updated successfully', equipmentUpdated })
        }
      } catch (error) {
        console.log('updateEquipment Error:', error)
        res.status(404).send({ msg: 'Brand or reference not found' })
      }
    }
  } catch (error) {
    console.log('updateEquipment Error:', error)
    res.status(500).send({ msg: 'Error updating the equipment. Invalid id' })
  }
}

const deleteEquipment = async (req, res) => {
  const { id } = req.body

  try {
    const equipmentToDelete = await Equipment.deleteOne({ _id: id })

    if (equipmentToDelete.deletedCount === 0) {
      res.status(404).send({ msg: 'Equipment not found' })
    } else {
      res.status(200).send({ msg: 'Equipment successfully deleted' })
    }
  } catch (error) {
    console.log('deleteEquipment Error:', error)
  }
}

module.exports = {
  getAllEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment
}
