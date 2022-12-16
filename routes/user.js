const express = require('express');

const router = express.Router();

const {createUser} = require('../controller/user');
const { validateUserSignUp, userValidation } = require('../middleware/Validation/user');

router.post(
      '/create-user',
      validateUserSignUp,
      userValidation,
      createUser)

module.exports = router