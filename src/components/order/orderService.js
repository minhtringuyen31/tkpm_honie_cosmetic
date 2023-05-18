const orderRepository = require('./orderRepository');
const productService = require('../products/productService')

exports.getAllUserOrder = async (_userEmail) => {
    const orders = await orderRepository.getOrdersByEmail(_userEmail);
    if (orders === null) {
        return [];
    }
    return orders;
}

exports.getAll = async () => {
    const orders = await orderRepository.getAll()
    if (orders === null) {
        return [];
    }
    return orders;
}