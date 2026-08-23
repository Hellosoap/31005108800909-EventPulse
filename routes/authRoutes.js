const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/auth');
const validator = require('../middleware/validate')
const {loginValidation, registrationValidation} = require('../middleware/validationRules')

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User has registered successfully
 *       400:
 *         description: Email is already registered
 *       422:
 *         description: Unprocessable Entity
 */
router.post('/register', registrationValidation, validator, register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User has logged in successfully.
 *       401:
 *         description: Invalid email or password
 *       422:
 *         description: Unprocessable Entity
 */
router.post('/login', loginValidation, validator, login);

module.exports = router;