const { check, validationResult } = require('express-validator')

exports.validateUserSignUp = [
    check('name').trim().not().isEmpty().withMessage("Name is required!").not().isString().withMessage("Must be a valid name").isLength({ min: 3, max: 20 }).
        withMessage("Name must be within 3 to 20 characters!"),

    check('email').normalizeEmail().isEmail().withMessage("Inavlaid Email"),

    check('password').trim().not().isEmpty().withMessage('Password cannot be empty').isLength({ min: 8, max: 10 }).
        withMessage("Password must be within 8 to 10 characters long!"),

    check('confirmpassword').trim().not().isEmpty().withMessage('Confirm Password cannot be empty').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Both Password must be same!')
        }
        return true;
    })
]
// check('name').trim().not().isEmpty().isLength(), 

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error })
}