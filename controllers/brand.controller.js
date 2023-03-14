const Brand = require('../models/Brand')

const getAllBrands = async (req, res) => {
  try {
    const allBrands = await Brand.find({})
    console.log('allBrands', allBrands.length)

    if (allBrands.length > 0) {
      res.status(200).send(allBrands)
    } else {
      res.status(204).json({ msg: 'There are no registered brands' })
    }
  } catch (error) {
    console.log('getAllBrands Error:', error)
  }
}

const createBrand = async (req, res) => {
  const { name } = req.body
  const brand = name.toLowerCase().trim()

  try {
    const brandExists = await Brand.findOne({ name: brand })

    if (brandExists) {
      res.status(409).send({ msg: 'The brand already exists' })
    } else {
      const newBrand = new Brand({ name: brand })
      const savedBrand = await newBrand.save()
      res.status(200).send({ msg: 'Brand successfully added ', savedBrand })
    }
  } catch (error) {
    console.log('createBrand Error:', error)
  }
}

const updateBrand = async (req, res) => {
  const { newName, id } = req.body

  try {
    const brandExists = await Brand.findById(id)

    if (!brandExists) {
      res.status(404).send({ msg: 'Brand not found' })
    } else {
      const brandUpdated = await Brand.findByIdAndUpdate(id, { name: newName }, { new: true })
      res.status(200).send({ msg: 'Brand updated successfully', brand: brandUpdated })
    }
  } catch (error) {
    console.log('updateBrand Error:', error)
    res.status(500).send({ msg: 'Error updating the brand' })
  }
}

const deleteBrand = async (req, res) => {
  const { id } = req.body

  try {
    const result = await Brand.deleteOne({ _id: id })

    if (result.deletedCount === 0) {
      res.status(404).send({ msg: 'Brand not found' })
    } else {
      res.status(200).send({ msg: 'Brand successfully deleted' })
    }
  } catch (error) {
    console.log('deleteBrand Error:', error)
  }
}

module.exports = {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand
}
