const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controllers/serverAuthRequestHandlers');

// validators
const { runValidation } = require('../validators');
const { userSignupValidator, userSigninValidator } = require('../validators/requestValidators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);

module.exports = router;
