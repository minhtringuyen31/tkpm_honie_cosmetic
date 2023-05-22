const express = require('express');
const router = express.Router();
const productController = require('./productController');

router.get('/', productController.getAll);
router.get('/list', productController.getProductByPage);
router.get('/:id', productController.getDetail);
router.post('/new', productController.createNewProduct)

router.get('/filterByPrice/:option', productController.filterByPrice);
router.get('/filterByBrand/:option', productController.filterByBrand);
router.get('/filterByCategory/:option', productController.filterByCategory);
router.post('/search', productController.search);

//background API/////////////////////////////////////
router.get('/bg_filterByCategory/:option', productController.background_filterByCategory);
router.get('/bg_detail/:id', productController.background_getDetail)
router.post('/bg_edit', productController.bg_editProduct)
router.get('/bg_remove/:id', productController.bg_removeProduct)

module.exports = router;
//