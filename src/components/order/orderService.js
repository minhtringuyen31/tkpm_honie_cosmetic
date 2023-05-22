const orderRepository = require('./orderRepository');
const cartRepository = require('../cart/cartRepository')
const productService = require('../products/productService')

exports.getAllUserOrder = async (_userEmail) => {
    const orders = await orderRepository.getOrdersByEmail(_userEmail);
    if (orders === null) {
        return [];
    }
    return orders;
}

exports.createOrder = async (user_email, shipping_address, total_price, payment_method) => {
    return await orderRepository.createOrder(user_email, shipping_address, total_price, payment_method)
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

exports.changeStatus= async (id, status) => {
    return await orderRepository.changeStatus(id, status)
}