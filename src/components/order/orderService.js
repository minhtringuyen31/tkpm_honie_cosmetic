const orderRepository = require('./orderRepository');
const cartRepository = require('../cart/cartRepository')
const productService = require('../products/productService');
const async = require('hbs/lib/async');

exports.getAllUserOrder = async (_userEmail) => {
    const orders = await orderRepository.getOrdersByEmail(_userEmail);
    console.log("User order service: " + orders)
    if (orders === null) {
        return [];
    }
    return orders;
}

exports.createOrder = async (user_email, shipping_address, total_price, payment_method) => {
    return await orderRepository.createOrder(user_email, shipping_address, total_price, payment_method)
}

exports.getOrderByStatus = async (user_email, status) => {
    return await orderRepository.getOrderByStatus(user_email, status)
}

exports.createReview = async (user_email, product_id, comment, rating) => {
    return await orderRepository.createReview(user_email, product_id, comment, rating)
}

exports.getNewestOrder = async (user_email) => {
    return orderRepository.getNewestOrder(user_email)
}

exports.addProductOrder = async (newestOrder) => {
    const currentProductInCart = await cartRepository.getProductInCart(newestOrder.user_email)
    for (let i = 0; i < currentProductInCart.length; i++) {
        await orderRepository.addProductOrder(newestOrder.id, currentProductInCart[i].product_id, currentProductInCart[i].quantity, currentProductInCart[i].price)
        await cartRepository.removeProductInCart(newestOrder.user_email, currentProductInCart[i].product_id)
    }
}



exports.getAllOrder = async () => {
    const orders = await orderRepository.getAllOrder()
    if (orders === null) {
        return [];
    }
    return orders;
}

exports.getOneOrder = async (orderId) => {
    return await orderRepository.getOneOrder(orderId)
}

exports.getAllProductOrder = async (orderId) => {
    return await orderRepository.getAllProductOrder(orderId)
}

exports.updateOrderStatus = async (orderId, status) => {
    return await orderRepository.updateOrderStatus(orderId, status)
}