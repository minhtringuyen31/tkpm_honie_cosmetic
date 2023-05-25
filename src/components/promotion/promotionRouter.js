const express = require('express');
const router = express.Router();
const promotionController = require('./promotionController');


const multer = require('multer')
const path = require('path')


const promotionStorageSettingInfor1 = multer.diskStorage( //multer disk storage setting
{
    destination: function(req, file, cb)
    {
        cb(null, path.join(__dirname, '../../public/img/promotion/'));
    },
    filename: function(req, file, cb)
    {
        console.log("file: " +file)
        console.log(req.body)
        if(file.length == 0)
        {
            console.log("file is empty")
            return;
        }
        console.log("req.promotion_id: " + req.body.promotion_id.toString())
        cb(null, req.body.promotion_id.toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        console.log("created file")
    }
}
);

const promotionStorageSettingInfor2 = multer.diskStorage( //multer disk storage setting
{
    destination: function(req, file, cb)
    {
        cb(null, path.join(__dirname, '../../public/img/promotion/'));
    },
    filename: function(req, file, cb)
    {
        console.log("file: " +file)
        console.log(req.body)
        if(file.length == 0)
        {
            console.log("file is empty")
            return;
        }
        cb(null, "promotion_" + req.body.edit_promotion_id.toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        console.log("created file")
    }
}
);


const uploadPromotionImage1 = multer({
    storage: promotionStorageSettingInfor1,
    fileFilter: function(req, file, callback)
    {
        const fileExtension = path.extname(file.originalname);
        console.log("extention: " + fileExtension)
        if((fileExtension !== '.png' ) && (fileExtension !== '.svg') && (fileExtension !== '.jpg') && (fileExtension !== '.jpeg'))
        {
            console.log("invalid extension")
            return callback(new Error('Only images allowed'));
        }
        console.log("after IF")
        callback(null, true);
        console.log("after callback")
    },
    limits: {
        fileSize: 1024 * 1024*2
    }
});

const uploadPromotionImage2 = multer({
    storage: promotionStorageSettingInfor2,
    fileFilter: function(req, file, callback)
    {
        const fileExtension = path.extname(file.originalname);
        console.log("extention: " + fileExtension)
        if((fileExtension !== '.png' ) && (fileExtension !== '.svg') && (fileExtension !== '.jpg') && (fileExtension !== '.jpeg'))
        {
            console.log("invalid extension")
            return callback(new Error('Only images allowed'));
        }
        console.log("after IF")
        callback(null, true);
        console.log("after callback")
    },
    limits: {
        fileSize: 1024 * 1024*2
    }
});



router.get('/getall', promotionController.getAllPromotion);
router.get('/bg_detail/:id', promotionController.background_getDetail)
// router.get('/', function (req, res, next) {
//     res.render('customer/promotion/promotionList');
// });
router.get('/', promotionController.showPromotionList)
router.get('/getpromotion/:id', promotionController.getPromotionByID);
router.post('/new',promotionController.createPromotion)
router.post('/edit', uploadPromotionImage2.single("edit_promotion_image"), promotionController.editPromotion)
router.get('/remove/:id', promotionController.removePromotion)

module.exports = router;
