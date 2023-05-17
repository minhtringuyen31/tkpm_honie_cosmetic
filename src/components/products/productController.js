const productService = require('./productService');
const connection = require('../connect_DB');

const { ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require('../../constant');

exports.getDetail = async (req, res) => {
    const productID = req.params['id'];
    console.log("alo");
    console.log(productID);
    const result = await productService.getAProduct(productID);
    const related = await productService.getRelatedProduct(productID);
    res.render('products/productDetail', { result: result, related: related });
}

exports.getAll = async (req, res) => {
    res.render('products/productList');
}