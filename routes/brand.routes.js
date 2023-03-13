const express = require('express')
const router = express.Router()
const brandController = require('../controllers/brand.controller')
const { validateCreateBrand } = require('../validators/brand.validator')

router.get('/', brandController.getAllBrands)
router.post('/', validateCreateBrand,brandController.createBrand)
router.patch('/', brandController.updateBrand)
// router.post('/verify', checkAuth, validateLogin, authController.verifyAccount)

module.exports = router