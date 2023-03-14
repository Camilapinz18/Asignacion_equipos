const { check } = require('express-validator')
const { validateResult } = require('../helpers/validations.helper')

const validateCreateEquipment = [
  check('name')
    .exists()
    .not()
    .isEmpty()
    .withMessage('A name must be provided to continue')
    .isString(),

    check('serial')
    .exists()
    .not()
    .isEmpty()
    .withMessage('A serial must be provided to continue')
    .isString(),

    check('description')
    .exists()
    .not()
    .isEmpty()
    .withMessage('A description must be provided to continue')
    .isString(),

    check('brand_id')
    .exists()
    .not()
    .isEmpty()
    .withMessage('A brand must be provided to continue')
    .isString(),

    check('reference_id')
    .exists()
    .not()
    .isEmpty()
    .withMessage('A reference must be provided to continue')
    .isString(),


  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = {
  validateCreateEquipment
}
