const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

//API for customer
router.get('/', orderController.getAllUserOrder);


//API for admin
router.get('/', orderController.showOrders);
router.get('/all', orderController.getAll);
router.get('/detail', orderController.showOrderDetail);
router.get('/review', orderController.showOrderReview);

module.exports = router;
