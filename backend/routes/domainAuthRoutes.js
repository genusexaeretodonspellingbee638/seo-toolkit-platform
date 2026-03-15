const express = require('express');
const router = express.Router();
const domainAuthController = require('../controllers/domainAuthController');

router.get('/', domainAuthController.check);

module.exports = router;
