const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: API for managing requests
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new request
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     inventoryId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Request created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorize('club'), requestController.createRequest);

/**
 * @swagger
 * /api/requests/my-requests:
 *   get:
 *     summary: Get all requests of the logged-in club
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of requests
 *       500:
 *         description: Internal server error
 */
router.get('/my-requests', authenticate, authorize('club'), requestController.getMyRequests);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests (core only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all requests
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, authorize('core'), requestController.getAllRequests);

/**
 * @swagger
 * /api/requests/club/{clubName}:
 *   get:
 *     summary: Get all requests of a specific club (core only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clubName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the club
 *     responses:
 *       200:
 *         description: List of requests
 *       500:
 *         description: Internal server error
 */
router.get('/club/:clubName', authenticate, authorize('core'), requestController.getRequestsByClub);

/**
 * @swagger
 * /api/requests/item/{itemId}:
 *   get:
 *     summary: Get all requests for a specific item (core only)
 *     tags: [Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the item
 *     responses:
 *       200:
 *         description: List of requests
 *       500:
 *         description: Internal server error
 */
router.get('/item/:itemId', authenticate, authorize('core'), requestController.getRequestsByItem);

module.exports = router;