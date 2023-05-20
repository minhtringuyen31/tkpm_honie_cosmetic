const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

//API for customer
// router.get('/', orderController.getAllUserOrder);
router.get('/', orderController.getAllOrder);
router.post('/', orderController.create)
router.get('/:orderId', orderController.getOrderByStatus)
// router.get('/allOrder', orderController.getAll);

router.get('/detail/:orderId', orderController.getOrderDetail);
router.get('/review/:productId', orderController.showOrderReview);
router.post('/review', orderController.review)


//API for admin
router.get('/admin/all', orderController.getAllOrder);
router.get('/admin/detail/:orderId', orderController.getOrderDetail);
router.post('/update/:id', orderController.updateOrderStatus)
router.get('/test', orderController.test)

module.exports = router;
