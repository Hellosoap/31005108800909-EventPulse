const eventControllers = require('../controllers/eventController')
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');
const validator = require('../middleware/validate')
const {createEventValidation, updateEventValidation} = require('../middleware/validationRules')
const express = require('express')
const router = express.Router()

/**
 * @openapi
 * /api/events:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID to filter events
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: City name to filter events
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events starting from this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events up to this date
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword matching title or description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, registrations]
 *           default: date
 *         description: Field to sort results by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sorting direction
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */

router.get('/', eventControllers.getAll);

/**
 * @openapi
 * /api/events/{id}:
 *   get:
 *     summary: Retrieve a single specific event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event MongoDB ID
 *     responses:
 *       200:
 *         description: Successful Operation + the specific event
 *       400:
 *         description: Error, Invalid ID
 *       404:
 *         description: Event not found
 */
router.get('/:id', eventControllers.getOne);


/**
 * @openapi
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, category, date, venue, city, capacity]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: Category MongoDB ObjectId
 *               date:
 *                 type: string
 *                 format: date-time
 *               venue:
 *                 type: string
 *               city:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successful Operation.
 *       401:
 *         description: You must be logged in to access this route
 *       403:
 *         description: You do not have permission to do this action.
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: Internal server error
 */
router.post('/', requireAuth, requireRole('admin'), createEventValidation, validator, eventControllers.create);


/**
 * @openapi
 * /api/events/{id}:
 *   patch:
 *     summary: Update an existing event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 description: Category MongoDB ObjectId
 *               date:
 *                 type: string
 *                 format: date-time
 *               venue:
 *                 type: string
 *               city:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful Operation
 *       401:
 *         description: You must be logged in to access this route
 *       403:
 *         description: You do not have permission to do this action
 *       404:
 *         description: The event you were trying to update was not found.
 *       422:
 *         description: Unprocessable Entity
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', requireAuth, requireRole('admin'), updateEventValidation, validator, eventControllers.update);


/**
 * @openapi
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the event to delete
 *     responses:
 *       200:
 *         description: Successful Operation.
 *       400:
 *         description: Error, Invalid ID
 *       401:
 *         description: You must be logged in to access this route
 *       403:
 *         description: You do not have permission to do this action
 *       404:
 *         description: The event you were trying to delete was not found.
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', requireAuth, requireRole('admin'), eventControllers.delete);

module.exports = router;