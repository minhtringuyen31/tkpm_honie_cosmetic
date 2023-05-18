const express = require('express');
const router = express.Router();
const orderController = require('./orderController');

//API for customer
router.get('/', orderController.getAllUserOrder);


//API for admin
router.get('/all', orderController.getAll);

module.exports = router;
