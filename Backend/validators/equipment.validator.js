const { check } = require('express-validator')
const { validateResult } = require('../helpers/validations.helper')

const validateEquipment = [
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

  check('isNewEquipment')
  .exists()
  .withMessage('A status must be provided')
  .isBoolean()
  .withMessage('Status must be a boolean value'),


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

// const validateUpdateEquipment = [
//   check('id')
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage('An id must be provided to continue')
//     .isString(),

//     check('newName')
//     .exists()
//     .withMessage('A name must be provided to continue')
//     .isString()
//     .withMessage('The field only accepts text'),

//     check('newSerial')
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage('A serial name must be provided to continue')
//     .isString()
//     .withMessage('The field only accepts text'),

//     check('newBrand_id')
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage('A brand id must be provided to continue')
//     .isString()
//     .withMessage('The field only accepts text'),

//     check('newReference_id')
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage('A reference id must be provided to continue')
//     .isString()
//     .withMessage('The field only accepts text'),

//     check('newDescription')
//     .exists()
//     .withMessage('A name must be provided to continue')
//     .isString()
//     .withMessage('The field only accepts text'),

//   (request, response, next) => {
//     validateResult(request, response, next)
//   }
// ]

module.exports = {
  validateEquipment
}
