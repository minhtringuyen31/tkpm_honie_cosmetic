const express = require('express');
const router = express.Router();
const cartController = require('./cartController');

router.get('/', cartController.showCart);
router.get('/cart-detail', cartController.cartDetail);

router.get('/add-to-cart/:idProduct', cartController.addToCart);
router.get('/remove/:idProduct', cartController.removeFromCart);


module.exports = router;
