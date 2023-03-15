const express = require('express')
const router = express.Router()
const equipmentController = require('../controllers/equipment.controller')
const { validateEquipment } = require('../validators/equipment.validator')

router.get('/', equipmentController.getAllEquipments)
router.post('/',validateEquipment,equipmentController.createEquipment)
router.patch('/',validateEquipment,equipmentController.updateEquipment)
router.delete('/', equipmentController.deleteEquipment)

module.exports = router