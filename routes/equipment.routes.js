const express = require('express')
const router = express.Router()
const equipmentController = require('../controllers/equipment.controller')
const { validateCreateEquipment } = require('../validators/equipment.validator')

router.get('/', equipmentController.getAllEquipments)
router.post('/',validateCreateEquipment,equipmentController.createEquipment)
router.patch('/',validateCreateEquipment,equipmentController.updateEquipment)
router.delete('/', equipmentController.deleteEquipment)

module.exports = router