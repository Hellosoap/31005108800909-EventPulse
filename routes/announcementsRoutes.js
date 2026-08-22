const announcementsController = require('../controllers/announcementsController')
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const express = require('express')
const router = express.Router()

router.post('/', requireAuth, requireRole('admin'), announcementsController.Announce);
router.get('/:eventId', announcementsController.getAnnouncements);

module.exports = router;