const express = require('express');
const router = express.Router();
const sitemapController = require('../controllers/sitemapController');

router.get('/', sitemapController.analyze);

module.exports = router;
