const announcementsController = require('../controllers/announcementsController')
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const {createAnnouncementValidation} = require('../middleware/validationRules')
const validator = require('../middleware/validate')
const express = require('express')
const router = express.Router()

/**
 * @openapi
 * /api/announcements:
 *   post:
 *     summary: Create a new announcement
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [eventId, text]
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: MongoDB ObjectId of the target event
 *               text:
 *                 type: string
 *                 description: Content/body of the announcement
 *     responses:
 *       201:
 *         description: Successful Operation
 *       401:
 *         description: You must be logged in to access this route
 *       403:
 *         description: You do not have permission to perform this action
 *       404:
 *         description: The event you were trying to make an announcement for was not found
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: Internal server error
 */
router.post('/', requireAuth, requireRole('admin'),createAnnouncementValidation, validator, announcementsController.Announce);

/**
 * @openapi
 * /api/announcements/{eventId}:
 *   get:
 *     summary: Get all announcements for a specific event
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the event
 *     responses:
 *       200:
 *         description: Successful Operation
 *       400:
 *         description: Error, Invalid ID
 *       404:
 *         description: The event you were trying to find messages for was not found
 *       500:
 *         description: Internal server error
 */
router.get('/:eventId', announcementsController.getAnnouncements);

module.exports = router;