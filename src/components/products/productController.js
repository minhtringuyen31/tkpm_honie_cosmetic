const productService = require('./productService');
const connection = require('../connect_DB');

const { ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require('../../constant');
const async = require('hbs/lib/async');

exports.getDetail = async (req, res) => {
    const productID = req.params['id'];
    console.log("alo");
    console.log(productID);
    const result = await productService.getAProduct(productID);
    const related = await productService.getRelatedProduct(productID);
    res.render('products/productDetail', { result: result, related: related });
}

exports.getAll = async (req, res) => {
    console.log("req.user (product: getAll) : ");
    console.log(req.user);
    if(req.user != undefined)
    {
        if(req.user.loginRole == 0) //customer
        {
            res.render('customer/products/productList');
        }
        else if(req.user.loginRole == 1)
        {
            res.render('admin/products/productList_Admin', {layout: 'layoutAdmin.hbs'});
        }
        else
        {
            next();
        }
    }
    else
    {
        res.redirect('auth/sign');
    }
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


exports.createNewProduct = async (req, res, next) =>
{
    console.log("create product")
    // console.log(req)
    if(req.user == undefined)
    {
        next();
    }
    if(req.user.loginRole != 1)
    {
        next();
    }

    console.log(req.body);

    var result = await productService.createNewProduct(req.body)
    res.json(result)
}

exports.background_filterByCategory = async (req, res, next) =>
{
    if(req.user == undefined)
    {
        next();
    }
    var option = req.params.option;
    console.log("bg_filterByCatrgory");
    console.log(option +"\n\n");

    var result = await productService.filterByCategory(option);

    res.json(result);
}

exports.background_getDetail = async (req, res, next) =>
{
    if(req.user == undefined)
    {
        next();
    }
    if(req.user.loginRole != 1)
    {
        next();
    }

    const productId = req.params.id
    console.log("bg_detail: " + productId)
    const result = await productService.getAProduct(productId);
    console.log(result)
    res.json(result)
}

exports.bg_editProduct = async (req, res, next) =>
{
    if(req.user == undefined)
    {
        next();
    }
    if(req.user.loginRole != 1)
    {
        next();
    }
    console.log(req.body)
    const result = await productService.editProduct(req.body)
    res.json(result)
} 

exports.bg_removeProduct = async (req, res, next) =>
{
    if(req.user == undefined)
    {
        next();
    }
    if(req.user.loginRole != 1)
    {
        next();
    }
    const productId = req.params.id
    console.log("productID: " + productId)
    const result = await productService.removeProduct(productId)
    res.json(result)
}