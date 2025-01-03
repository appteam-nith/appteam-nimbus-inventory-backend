const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication and registration
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user and send OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [core, club]
 *               club:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent to your email for verification
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/users/verify-otp:
 *   post:
 *     summary: Verify OTP and complete registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered and verified successfully
 *       400:
 *         description: OTP not found or expired
 *       500:
 *         description: Internal server error
 */
router.post('/verify-otp', authController.verifyOtp);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login for all users
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', authController.logout);

/**
 * @swagger
 * /api/users/validate:
 *   get:
 *     summary: Validate token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Invalid or expired token
 */
router.get('/validate', authController.validateToken);

module.exports = router;