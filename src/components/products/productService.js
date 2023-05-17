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