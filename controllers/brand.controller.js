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

const updateBrand=async(req, res)=>{

  // console.log("update")
  // const {brand}=req.body

  // try{

  // }catch(error){
  //   console.log("updateBrand Error:",error)
  // }


}

module.exports = {
  getAllBrands,
  createBrand,
  updateBrand
}
