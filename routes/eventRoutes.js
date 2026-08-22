const eventControllers = require('../controllers/eventController')
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const validator = require('../middleware/validate')
const {createEventValidation, updateEventValidation} = require('../middleware/validationRules')
const express = require('express')
const router = express.Router()

router.get('/', eventControllers.getAll);
router.get('/:id', eventControllers.getOne);

router.post('/', requireAuth, requireRole('admin'), createEventValidation, validator, eventControllers.create);
router.patch('/:id', requireAuth, requireRole('admin'), updateEventValidation, validator, eventControllers.update);
router.delete('/:id', requireAuth, requireRole('admin'), eventControllers.delete);

module.exports = router;