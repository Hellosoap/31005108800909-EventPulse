const registerControllers = require('../controllers/registerControllers')
const requireAuth = require('../middleware/requireAuth');
const validator = require('../middleware/validate')
const {eventRegistrationValidation} = require('../middleware/validationRules')
const express = require('express')
const router = express.Router()

router.post('/', requireAuth, eventRegistrationValidation, validator, registerControllers.registerForAnEvent);
router.get('/my', requireAuth, registerControllers.getAllUserRegistrations);
router.delete('/:id', requireAuth, registerControllers.cancelRegistration);

module.exports = router;