const express = require('express');
const router = express.Router();
const robotsController = require('../controllers/robotsController');

router.get('/', robotsController.analyze);

module.exports = router;
