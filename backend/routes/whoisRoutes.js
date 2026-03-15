const express = require('express');
const router = express.Router();
const whoisController = require('../controllers/whoisController');

router.get('/', whoisController.lookup);

module.exports = router;
