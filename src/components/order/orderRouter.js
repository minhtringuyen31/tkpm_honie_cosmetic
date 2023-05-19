const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

//API for customer
// router.get('/', orderController.getAllUserOrder);
router.get('/', orderController.showOrders);
router.post('/', orderController.create)
// router.get('/allOrder', orderController.getAll);
router.get('/detail', orderController.showOrderDetail);
router.get('/review', orderController.showOrderReview);


//API for admin
router.get('/all', orderController.getAllOrder);
router.get('/detail/:orderId', orderController.getOrderDetail);
router.post('/update', orderController.updateOrderStatus)

// router.get('/test', orderController.test)



module.exports = router;
