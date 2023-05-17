const express = require('express');
const router = express.Router();
const cartController = require('./cartController');

router.get('/', cartController.showCart);
router.get('/cart-detail', cartController.cartDetail);


module.exports = router;
