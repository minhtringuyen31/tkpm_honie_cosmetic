const express = require('express');
const router = express.Router();
const cartController = require('./cartController');

router.get('/', cartController.showCart);
router.get('/cart-detail', cartController.cartDetail);

router.get('/add-to-cart/:idProduct', cartController.addToCart);
// router.get('/remove/:idProduct', cartController.removeFromCart);


router.get('/checkout', cartController.showCheckout);
router.post('/checkout', cartController.addOrder);

router.post('/remove-from-cart', cartController.removeFromCart);
router.post('/increase-quantity', cartController.incrQuantity);
router.post('/decrease-quantity', cartController.descQuantity);


module.exports = router;
