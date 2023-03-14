const express = require('express')
const router = express.Router()
const brandController = require('../controllers/brand.controller')
const { validateCreateBrand,validateUpdateBrand } = require('../validators/brand.validator')

router.get('/', brandController.getAllBrands)
router.post('/', validateCreateBrand,brandController.createBrand)
router.patch('/', validateUpdateBrand,brandController.updateBrand)
router.delete('/', brandController.deleteBrand)

module.exports = router