const express = require('express');
const router = express.Router();
const { signupLearner, signin, returnLearners } = require('../controllers/serverLearnerRequestHandlers');

// validators
const { runValidation } = require('../validators');
const { learnerSignupValidator } = require('../validators/requestValidators');

router.post('/addlearner', learnerSignupValidator, runValidation, signupLearner);
router.post('/getlearners', returnLearners); //TODO: Add validation

module.exports = router;
