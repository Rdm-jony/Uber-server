const { body } = require('express-validator');

exports.registerValidation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('fullName.firstName')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters'),

    body('fullName.lastName')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters'),
];

exports.loginValidation = [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]
