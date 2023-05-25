const express = require('express');
const router = express.Router();
const productController = require('./productController');

const multer = require('multer')
const path = require('path')


const productStorageSettingInfor = multer.diskStorage( //multer disk storage setting
    {
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../../public/img/product/'));
        },
        filename: function (req, file, cb) {
            console.log("file: " + file)
            console.log(req.body)
            if (file.length == 0) {
                console.log("file is empty")
                return;
            }
            console.log("req.product_id: " + req.body.product_id.toString())
            cb(null, req.body.product_id.toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            console.log("created file")
        }
    }
);

// const storageSettingEditService = multer.diskStorage({
//     destination: function(req, file, cb)
//     {
//         cb(null, path.join(__dirname, '../public/image/cleanings/upload/'));
//     },
//     filename: function(req, file, cb)
//     {
//         //file.originalname.split('.')[file.originalname.split('.').length - 1] of 'test.png' === '.png'
//         cb(null, req.user.id.toString(10) + "_s" + req.query.idservice + '_serviceImg' + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
//     }
// });


// multer setting for pictures/avatars upload
//reference: https://stackoverflow.com/questions/38652848/filter-files-on-the-basis-of-extension-using-multer-in-express-js
//note: user can upload file.jpg, file.png, file.svg, file.jpeg for pictures
// const uploadPictureShopInfor = multer({
//     storage: storageSettingShopInfor,
//     fileFilter: function(req, file, callback)
//     {
//         const fileExtension = path.extname(file.originalname);
//         if((fileExtension !== '.png' ) && (fileExtension !== '.svg') && (fileExtension !== '.jpg') && (fileExtension !== '.jpeg'))
//         {
//             return callback(new Error('Only images allowed'));
//         }
//         callback(null, true); 
//     },
//     limits: {
//         fileSize: 1024 * 1024
//     }
// }).fields(
//     [
//         {
//             name: 'shop-img',
//             maxCount: 1
//         },
//         {
//             name: 'momo-qr',
//             maxCount: 1
//         }
//     ]
// );



const uploadProductImage = multer({
    storage: productStorageSettingInfor,
    fileFilter: function (req, file, callback) {
        const fileExtension = path.extname(file.originalname);
        console.log("extention: " + fileExtension)
        if ((fileExtension !== '.png') && (fileExtension !== '.svg') && (fileExtension !== '.jpg') && (fileExtension !== '.jpeg')) {
            console.log("invalid extension")
            return callback(new Error('Only images allowed'));
        }
        console.log("after IF")
        callback(null, true);
        console.log("after callback")
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});


router.get('/', productController.getAll);
router.get('/list', productController.getProductByPage);
router.get('/:id', productController.getDetail);
// router.post('/new', productController.createNewProduct);
router.get('/manage/review', productController.manageReview);
router.get('/manage/review/:productId', productController.getReview);
router.post('/new', uploadProductImage.single('product_image'), productController.createNewProduct)

router.get('/filterByPrice/:option', productController.filterByPrice);
router.get('/filterByBrand/:option', productController.filterByBrand);
router.get('/filterByCategory/:option', productController.filterByCategory);
router.get('/search/:key', productController.search);

//background API/////////////////////////////////////
router.get('/bg_filterByCategory/:option', productController.background_filterByCategory);
router.get('/bg_detail/:id', productController.background_getDetail)
router.post('/bg_edit', uploadProductImage.single("product_image"), productController.bg_editProduct)
router.get('/bg_remove/:id', productController.bg_removeProduct)

module.exports = router;
//