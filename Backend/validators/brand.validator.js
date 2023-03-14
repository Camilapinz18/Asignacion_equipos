const { check } = require('express-validator')
const { validateResult } = require('../helpers/validations.helper')

const validateCreateBrand = [
  check('name')
    .exists()
    .not()
    .isEmpty()
    .withMessage('A brand name must be provided to continue')
    .isString(),


  (request, response, next) => {
    validateResult(request, response, next)
  }
]

const validateUpdateBrand = [
  check('newName')
    .exists()
    .not()
    .isEmpty()
    .withMessage('A brand name must be provided to continue')
    .isString(),
   

    check('id')
    .exists()
    .not()
    .isEmpty()
    .withMessage('An id must be provided to continue')
    .isString(),


  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = {
  validateCreateBrand,
  validateUpdateBrand
}
