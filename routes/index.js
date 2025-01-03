const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/index');

router.get('/sample', sampleController.getSampleData);

module.exports = router;
