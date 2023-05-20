const productService = require('./productService');
const connection = require('../connect_DB');

const { ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require('../../constant');

exports.getDetail = async (req, res) => {
    // const productID = req.params['id'];
    // console.log("alo");
    // console.log(productID);
    // const result = await productService.getAProduct(productID);
    // const related = await productService.getRelatedProduct(productID);
    // res.render('products/productDetail', { result: result, related: related });
    const reviews=[
        {
            USER_EMAIL:"ltt@gmail.com",
            PRODUCT_RATING: 4,
            PRODUCT_REVIEW:"Good. Recommend to buy"
        },
        {
            USER_EMAIL:"ngtt@gmail.com",
            PRODUCT_RATING: 5,
            PRODUCT_REVIEW:"nice...i love it som much. Thanks shop"
        },
        {
            USER_EMAIL:"ltt@gmail.com",
            PRODUCT_RATING: 2,
            PRODUCT_REVIEW:"worst product that i have used. "
        }
    ]
    res.render('customer/products/productDetail',{reviews});
}

exports.getAll = async (req, res) => {
    res.render('customer/products/productList');
}

exports.getProductByPage = async (req, res) => {
    const inputPage = Number(req.query.page);
    console.log("page: " + inputPage);
    const listProducts = await productService.getProductsByPage(inputPage);
    console.log(listProducts);
    const totalProducts = await productService.count();
    console.log(totalProducts);
    let pageArray = [];
    const maxPage = Number((totalProducts - (totalProducts % ITEM_PER_PAGE)) / ITEM_PER_PAGE);
    console.log(maxPage);
    if (maxPage >= 3) {
        if (inputPage > 1 && inputPage < maxPage + 1)
            for (let i = inputPage - 1; i <= inputPage + 1; i++) {
                pageArray.push(Number(i));

            }
        else if (inputPage == 1) pageArray = [1, 2, 3];
        else pageArray = [maxPage - 1, maxPage, maxPage + 1];
    }
    else {
        for (let i = 0; i <= maxPage; i++)
            pageArray.push(Number(i + 1));
    }
    console.log(pageArray);
    const pageObject = {
        pagearray: pageArray,
        maxpage: maxPage,
    };
    res.json({ listProducts, pageObject });
}

exports.filterByPrice = async (req, res) => {
    const option = req.params.option;
    const result = await productService.filterByPrice(option);
    res.render('customer/products/productFilter', { result: result });
}

exports.filterByBrand = async (req, res) => {
    const option = req.params.option;
    const result = await productService.filterByBrand(option);
    res.render('customer/products/productFilter', { result: result });
}

exports.filterByCategory = async (req, res) => {
    const option = req.params.option;
    const result = await productService.filterByCategory(option);
    res.render('customer/products/productFilter', { result: result });
}

exports.search = async (req, res) => {
    const keyword = req.body.keyword;
    const result = await productService.search(keyword);
    res.render('customer/products/productFilter', { result: result });
}
