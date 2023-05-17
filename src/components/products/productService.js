const Paginator = require('paginator');

const productRepository = require('./productRepository');
const { ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require('../../constant');

exports.getAProduct = async (productID) => {
    const result = await productRepository.getAProduct(productID);
    return result;
}