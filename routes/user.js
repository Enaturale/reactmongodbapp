const express = require('express');

const router = express.Router();

const {createUser, userSignIn} = require('../controller/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middleware/Validation/user');

//router for user Signup
router.post(
      '/create-user',
      validateUserSignUp,
      userValidation,
      createUser);

//router for signin
router.post('/sign-in',validateUserSignIn, userValidation, userSignIn);


module.exports = router