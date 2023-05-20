const express = require('express');
const router = express.Router();
const promotionController = require('./promotionController');


router.get('/getall',promotionController.getAllPromotion);
router.get('/', function (req, res, next) {
    res.render('customer/promotion/promotionList');
});

router.get('/getpromotion/:id',promotionController.getPromotionByID);


module.exports = router;
