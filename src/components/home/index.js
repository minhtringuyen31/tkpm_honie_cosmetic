const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //throw new Error('Unknown error!');
    res.render('home/index');
});

//  GET order page
router.get('/orderPage', function (req, res, next) {
    res.render('order/order', { layout: false })
});

// GET product detail page
router.get('/productDetail', function (req, res, next) {
    res.render('products/productDetail', { layout: false });
})

module.exports = router;
