const express = require('express');
const router = express.Router();
const promotionController = require('./promotionController');

router.get('/', promotionController.getAll);


module.exports = router;
