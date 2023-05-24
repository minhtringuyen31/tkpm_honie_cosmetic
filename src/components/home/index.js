const express = require('express');
const indexController = require('./indexController')
const router = express.Router();

/* GET home page. */
router.get('/', indexController.index);

//  GET order page
router.get('/orderPage', function (req, res, next) {
    res.render('customer/order/order', { layout: false })
});

// GET product detail page
router.get('/productDetail', function (req, res, next) {
    res.render('customer/products/productDetail', { layout: false });
})

module.exports = router;
