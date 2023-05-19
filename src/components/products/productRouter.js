const express = require('express');
const router = express.Router();
const productController = require('./productController');

router.get('/', productController.getAll);
router.get('/list', productController.getProductByPage);
router.get('/:id', productController.getDetail);

router.get('/filterByPrice/:option', productController.filterByPrice);
router.get('/filterByBrand/:option', productController.filterByBrand);
router.get('/filterByCategory/:option', productController.filterByCategory);
router.post('/search', productController.search);

module.exports = router;
//