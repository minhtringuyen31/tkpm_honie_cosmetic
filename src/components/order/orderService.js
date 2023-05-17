const orderRepository = require('./orderRepository');
const productService = require('../products/productService')

exports.getAllOrders = async (_userEmail) => {
    const orders = await orderRepository.getOrdersByEmail(_userEmail);
    if (orders === null) {
        return [];
    }
    return orders;
} 