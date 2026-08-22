const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/auth');
const validator = require('../middleware/validate')
const {loginValidation, registrationValidation} = require('../middleware/validationRules')

router.post('/register', registrationValidation, validator, register);
router.post('/login', loginValidation, validator, login);

module.exports = router;