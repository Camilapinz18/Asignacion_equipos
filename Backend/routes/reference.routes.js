const express = require('express')
const router = express.Router()
const referenceController = require('../controllers/reference.controller')
const { validateCreateBrand,validateUpdateBrand } = require('../validators/brand.validator')

router.get('/', referenceController.getAllReferences)
router.post('/', validateCreateBrand,referenceController.createReference)
router.patch('/', validateUpdateBrand,referenceController.updateReference)
router.delete('/', referenceController.deleteReference)

module.exports = router