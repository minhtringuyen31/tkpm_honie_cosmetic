const Paginator = require('paginator');

const productRepository = require('./productRepository');
const { ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require('../../constant');
const async = require('hbs/lib/async');
const fs = require("fs")
const path = require("path")

validExtension_ofPictures = 
{
    _jpeg: "jpeg",
    _jpg: "jpg",
    _png: "png",
    _svg: "svg"
}
const uploadPath = path.join(__dirname, '../../public/img/product/');


exports.getAllProduct = async () => {
    const result = await productRepository.getAllProduct();
    return result;
}

exports.getAProduct = async (productID) => {
    const result = await productRepository.getAProduct(productID);
    return result;
}

exports.getRelatedProduct = async (productID) => {
    const result = await productRepository.getRelatedProduct(productID);
    return result;
}

exports.getReview = async (productId) => {
    return await productRepository.getReview(productId)
}


exports.getProductsByPage = async (page) => {
    const result = await productRepository.getProductsByPage(page);
    return result;
}

exports.count = async (page) => {
    const result = await productRepository.count();
    return result;
}

exports.filterByPrice = async (option) => {
    const result = await productRepository.filterByPrice(option);
    return result;
}

exports.filterByBrand = async (option) => {
    const result = await productRepository.filterByBrand(option);
    return result;
}

exports.filterByCategory = async (option) => {
    const result = await productRepository.filterByCategory(option);
    return result;
}

exports.search = async (keyword) => {
    const result = await productRepository.search(keyword);
    return result;
}

exports.createNewProduct = async (reqBody) => {
    let product_image = getImagePathByProductId(reqBody.product_id)
    console.log("product_image: " + product_image)
    let result = await productRepository.createProduct(reqBody.product_id, reqBody.product_name, reqBody.product_price, reqBody.product_category, reqBody.product_brand, reqBody.product_description, reqBody.product_number, product_image);
    return result;
}

exports.editProduct = async (reqBody) => {
    let product_image = getImagePathByProductId(reqBody.product_id)
    const result = await productRepository.editProduct(reqBody.product_id, reqBody.product_name, reqBody.product_price, reqBody.product_category, reqBody.product_brand, reqBody.product_description, reqBody.product_number, product_image);
    return result;
}

exports.removeProduct = async (productId) => {
    const result = await productRepository.removeProduct(productId)
    return result
}



function getImagePathByProductId(product_id)
{
    console.log(uploadPath)
    let productImg_path = null
    if(fs.existsSync(uploadPath+product_id+"."+validExtension_ofPictures._jpeg) === true)
    {
        productImg_path = uploadPath+product_id+"."+validExtension_ofPictures._jpeg;
    }
    else if(fs.existsSync(uploadPath+product_id+"."+validExtension_ofPictures._jpg) === true)
    {
        productImg_path = uploadPath+product_id+"."+validExtension_ofPictures._jpg;
    }
    else if(fs.existsSync(uploadPath+product_id+"."+validExtension_ofPictures._png) === true)
    {
        productImg_path = uploadPath+product_id+"."+validExtension_ofPictures._png;
    }
    else if(fs.existsSync(uploadPath+product_id+"."+validExtension_ofPictures._svg) === true)
    {
        productImg_path = uploadPath+product_id+"."+validExtension_ofPictures._svg;
    }

    //fit the absolute path -> (public) /image/...
    if(productImg_path != null)
    {
        let start = productImg_path.indexOf('product');
        start = productImg_path.indexOf('\\', start);
        productImg_path = productImg_path.substring(start+1);

        while(productImg_path.includes('\\'))
        {
            productImg_path = productImg_path.replace('\\','/');
        }
    }

    return productImg_path;
}