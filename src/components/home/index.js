const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //throw new Error('Unknown error!');
    console.log(req.user)
    if (req.user != undefined) {
        if (req.user.loginRole == 1) {
            console.log("admin")
            res.render('admin/dashboard/dashboard.hbs', { layout: 'layoutAdmin.hbs' })
        } else {
            console.log("customer")
            res.render('customer/home/index');
        }
    } else {
        res.render('customer/home/index');
    }
});

//  GET order page
router.get('/orderPage', function (req, res, next) {
    res.render('customer/order/order', { layout: false })
});

// GET product detail page
router.get('/productDetail', function (req, res, next) {
    res.render('customer/products/productDetail', { layout: false });
})

module.exports = router;
