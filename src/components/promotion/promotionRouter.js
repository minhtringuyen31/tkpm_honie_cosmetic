const express = require('express');
const router = express.Router();
const promotionController = require('./promotionController');


router.get('/getall', promotionController.getAllPromotion);
router.get('/bg_detail/:id', promotionController.background_getDetail)
// router.get('/', function (req, res, next) {
//     res.render('customer/promotion/promotionList');
// });
router.get('/', promotionController.showPromotionList)
router.get('/getpromotion/:id', promotionController.getPromotionByID);
router.post('/new', promotionController.createPromotion)
router.post('/edit', promotionController.editPromotion)
router.get('/remove/:id', promotionController.removePromotion)

module.exports = router;
