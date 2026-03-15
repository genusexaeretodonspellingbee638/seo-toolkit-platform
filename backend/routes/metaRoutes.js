const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

router.get('/', metaController.analyze);

module.exports = router;
