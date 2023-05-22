const Paginator = require('paginator');

const productRepository = require('./productRepository');
const { ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require('../../constant');

exports.getAProduct = async (productID) => {
    const result = await productRepository.getAProduct(productID);
    return result;
}

exports.getRelatedProduct = async (productID) => {
    const result = await productRepository.getRelatedProduct(productID);
    return result;
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

exports.createNewProduct = async (reqBody) =>
{
    let result = await productRepository.createProductBasically(reqBody.product_id, reqBody.product_name, reqBody.product_price, reqBody.product_category, reqBody.product_brand, reqBody.product_description, reqBody.product_number);
    return result;
}

exports.editProduct = async (reqBody) =>
{
    const result = await productRepository.editProduct(reqBody.product_id, reqBody.product_name, reqBody.product_price, reqBody.product_category, reqBody.product_brand, reqBody.product_description, reqBody.product_number);
    return result;
}

exports.removeProduct = async (productId) =>
{
    const result = await productRepository.removeProduct(productId)
    return result
}