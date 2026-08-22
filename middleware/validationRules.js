const {body, param} = require('express-validator');

exports.registrationValidation = [
    body('name')
    .trim()
    .notEmpty().withMessage('Please, enter the name.'),

    body('email')
    .trim()
    .notEmpty().withMessage('Please, enter the email.')
    .isEmail().withMessage('Please, enter the email in the right format.'),

    body('password')
    .isLength({min:6}).withMessage('The password must be at least 6 characters.')
];

exports.loginValidation = [
    body('email')
    .trim()
    .notEmpty().withMessage('Please, enter the email.')
    .isEmail().withMessage('Please, enter the email in the right format.'),

    body('password')
    .notEmpty().withMessage('Please, enter the password.'),
];

exports.createEventValidation = [
    body('title')
    .trim()
    .notEmpty().withMessage('Please, enter the title.'),

    body('description')
    .trim()
    .notEmpty().withMessage('Please, enter the description.'),

    body('category')
    .notEmpty().withMessage('Please, enter the category ID.')
    .isMongoId().withMessage('The category must be a valid Mongo ID.'),

    body('date')
    .notEmpty().withMessage('Please, enter the date of the event.')
    .isISO8601().withMessage('Please, enter a valid date.')
    .isAfter(new Date().toISOString()).withMessage('Please, enter a date that is in the future.')
    .toDate(),

    body('city')
    .trim()
    .notEmpty().withMessage('Please, enter the city.'),

    body('venue')
    .trim()
    .notEmpty().withMessage('Please, enter the venue.'),

    body('capacity')
    .notEmpty().withMessage('Please, enter capacity of the event.')
    .isInt({min: 1}).withMessage('Capacity must be a positive number.')
];

exports.updateEventValidation = [
    param('id')
    .isMongoId().withMessage('The event ID you were trying to update was invalid.'),

    body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Please, enter the title.'),

    body('description')
    .optional()
    .trim()
    .notEmpty().withMessage('Please, enter the description.'),

    body('category')
    .optional()
    .isMongoId().withMessage('The category must be a valid Mongo ID.'),

    body('date')
    .optional()
    .isISO8601().withMessage('Please, enter a valid date.')
    .isAfter(new Date().toISOString()).withMessage('Please, enter a date that is in the future.')
    .toDate(),

    body('city')
    .optional()
    .trim()
    .notEmpty().withMessage('Please, enter the city.'),
    
    body('venue')
    .optional()
    .trim()
    .notEmpty().withMessage('Please, enter the venue.'),

    body('capacity')
    .optional()
    .isInt({min: 1}).withMessage('Capacity must be a positive number.')
];

exports.eventRegistrationValidation = [
    body('event')
    .notEmpty().withMessage('Please, enter the event ID.')
    .isMongoId().withMessage('The eventId must be a valid Mongo ID.')
];