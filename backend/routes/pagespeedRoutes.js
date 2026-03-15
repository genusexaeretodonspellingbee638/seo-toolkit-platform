const express = require('express');
const router = express.Router();
const pagespeedController = require('../controllers/pagespeedController');

router.get('/', pagespeedController.analyze);

module.exports = router;
