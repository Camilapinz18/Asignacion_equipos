const { check } = require('express-validator')
const { validateResult } = require('../helpers/validations.helper')

const validateCreateEmployee = [
    check('identification')
        .exists()
        .withMessage('An identification must be provided to continue')
        .isString()
        .matches(/^[0-9]+$/)
        .withMessage('The identification can only contain numbers')
        .isLength({ min: 5, max: 10 })
        .withMessage('The identification must be between 7 and 10 digits'),

    check('name')
        .exists()
        .not()
        .isEmpty()
        .withMessage('A name must be provided to continue')
        .isString()
        .withMessage('The field only accepts text'),

    check('surname')
        .exists()
        .not()
        .isEmpty()
        .withMessage('A surname name must be provided to continue')
        .isString()
        .withMessage('The field only accepts text'),

    check('address')
        .exists()
        .not()
        .isEmpty()
        .withMessage('An address name must be provided to continue')
        .isString()
        .withMessage('The field only accepts text'),

    check('phone')
        .exists()
        .withMessage('A phone number must be provided to continue')
        .isString()
        .matches(/^[0-9]+$/)
        .withMessage('The phone can only contain numbers')
        .isLength({ min: 7, max: 10 })
        .withMessage('The phone number must be between 7 and 10 digits'),

    check('email')
        .exists()
        .withMessage('An email must be provided to continue')
        .isEmail()
        .withMessage('Invalid email'),


    (request, response, next) => {
        validateResult(request, response, next)
    }
]

const validateUpdateEmployee = [
    check('identification')
        .exists()
        .withMessage('An identification must be provided to continue')
        .isString()
        .matches(/^[0-9]+$/)
        .withMessage('The identification can only contain numbers')
        .isLength({ min: 5, max: 10 })
        .withMessage('The identification must be between 7 and 10 digits'),

    check('newName')
        .exists()
        .withMessage('A name must be provided to continue')
        .isString()
        .withMessage('The field only accepts text'),

    check('newSurname')
        .exists()
        .withMessage('A surname name must be provided to continue')
        .isString()
        .withMessage('The field only accepts text'),

    check('newAddress')
        .exists()
        .withMessage('An address name must be provided to continue')
        .isString()
        .withMessage('The field only accepts text'),

    check('newPhone')
        .exists()
        .withMessage('A phone number must be provided to continue')
        .isString()
        .matches(/^[0-9]+$/)
        .withMessage('The phone can only contain numbers')
        .isLength({ min: 7, max: 10 })
        .withMessage('sThe phone number must be between 7 and 10 digits'),
        
    check('newEmail')
        .exists()
        .withMessage('An email must be provided to continue')
        .isEmail()
        .withMessage('Invalid email'),

    (request, response, next) => {
        validateResult(request, response, next)
    }
]

module.exports = {
    validateCreateEmployee,
    validateUpdateEmployee
}
