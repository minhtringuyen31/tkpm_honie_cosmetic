const express = require('express');
const router = express.Router();
const orderController = require('./orderController');


router.get('/', orderController.showOrders);
router.get('/detail', orderController.showOrderDetail);
router.get('/review', orderController.showOrderReview);

module.exports = router;
