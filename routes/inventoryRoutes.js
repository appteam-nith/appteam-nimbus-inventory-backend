const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: API for managing inventory
 */

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Add a new inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Inventory item added
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, authorize('core'), inventoryController.addInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update an inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the inventory item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Inventory updated
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, authorize('core'), inventoryController.updateInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Delete an inventory item
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the inventory item
 *     responses:
 *       200:
 *         description: Inventory deleted
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, authorize('core'), inventoryController.deleteInventory);

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of inventory items
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, inventoryController.getAllInventory);

module.exports = router;