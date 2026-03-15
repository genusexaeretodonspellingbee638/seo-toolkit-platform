const express = require('express');
const router = express.Router();
const backlinkController = require('../controllers/backlinkController');

router.get('/', backlinkController.getBacklinks);

module.exports = router;
