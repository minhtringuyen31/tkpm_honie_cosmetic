const express = require('express');
const router = express.Router();
const productController = require('./productController');

router.get('/', productController.getAll);
router.get('/list', productController.getProductByPage);
router.get('/:id', productController.getDetail);




module.exports = router;
