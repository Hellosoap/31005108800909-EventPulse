const registerControllers = require('../controllers/registerControllers')
const requireAuth = require('../middleware/requireAuth');
const validator = require('../middleware/validate')
const {eventRegistrationValidation} = require('../middleware/validationRules')
const express = require('express')
const router = express.Router()

/**
 * @openapi
 * /api/registrations:
 *   post:
 *     summary: Register the authenticated user for an event
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [event]
 *             properties:
 *               event:
 *                 type: string
 *                 description: MongoDB ObjectId of the event to register for
 *     responses:
 *       201:
 *         description: Attendee has registered successfully.
 *       400:
 *         description: This event is full. - You already registered for this event.
 *       401:
 *         description: You must be logged in to access this route
 *       404:
 *         description: The event you were trying to register for was not found.
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: Internal server error
 */
router.post('/', requireAuth, eventRegistrationValidation, validator, registerControllers.registerForAnEvent);


/**
 * @openapi
 * /api/registrations/my:
 *   get:
 *     summary: Retrieve all event registrations for the logged-in user
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful Operation
 *       401:
 *         description: You must be logged in to access this route
 *       500:
 *         description: Internal server error
 */
router.get('/my', requireAuth, registerControllers.getAllUserRegistrations);


/**
 * @openapi
 * /api/registrations/{id}:
 *   delete:
 *     summary: Cancel an event registration
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the registration to cancel
 *     responses:
 *       200:
 *         description: Registration cancelled successfully
 *       400:
 *         description: Error, Invalid ID
 *       401:
 *         description: You must be logged in to access this route
 *       403:
 *         description: You can only cancel your own registration.
 *       404:
 *         description: The registration you were trying to cancel was not found.
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', requireAuth, registerControllers.cancelRegistration);

module.exports = router;