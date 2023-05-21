const express = require('express');
const router = express.Router();
const promotionController = require('./promotionController');

router.get('/', function (req, res, next) {
    console.log("get-promotion")
    res.render('customer/promotion/promotionList');
});

router.get('/getall',promotionController.getAllPromotion);


router.get('/getpromotion/:id',promotionController.getPromotionByID);

// router.get('/apply/:id', promotionController.applyPromotion)


module.exports = router;
