const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

//API for customer
// router.get('/', orderController.getAllUserOrder);
router.get('/', orderController.getAllOrder);
router.get('/:statusId', orderController.getOrderByStatus);

router.post('/', orderController.create)

router.get('/detail/:orderId', orderController.getOrderDetail);
router.get('/review/:productId', orderController.showOrderReview);
router.post('/review', orderController.review)
router.get('/order_detail/:orderId', orderController.getOrderDetail);
router.post('/review/:productId', orderController.reviewProduct);


//API for admin
router.get('/admin/all', orderController.getAllOrder);
router.get('/admin/detail/:orderId', orderController.getOrderDetail);

router.get('/test', orderController.test)
router.get('/all', orderController.getAllOrder);
router.post('/update/:id', orderController.changeStatus);

// router.get('/test', orderController.test)



module.exports = router;
