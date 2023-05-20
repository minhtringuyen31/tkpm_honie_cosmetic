const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

//API for customer
router.get('/:statusId', orderController.getOrderByStatus);
router.get('/', orderController.getAllUserOrder);

router.post('/', orderController.create)
// router.get('/allOrder', orderController.getAll);
router.get('/order_detail/:orderId', orderController.showOrderDetail);
router.get('/review/:orderId', orderController.showOrderReview);
router.post('/review/:orderId', orderController.reviewProduct);


//API for admin
router.get('/all', orderController.getAllOrder);
router.get('/detail/:orderId', orderController.getOrderDetail);
router.post('/update/:id', orderController.updateOrderStatus)

// router.get('/test', orderController.test)



module.exports = router;
