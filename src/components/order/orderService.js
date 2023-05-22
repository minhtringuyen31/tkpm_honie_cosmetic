const orderRepository = require('./orderRepository');
const cartRepository = require('../cart/cartRepository')
const productService = require('../products/productService')
const myConstant = require('../../constant/index')

exports.getAllUserOrder = async (_userEmail) => {
    const orders = await orderRepository.getOrdersByEmail(_userEmail);
    if (orders === null) {
        return [];
    }
    return orders;
}


function convertToPaymentMethodId(payment_method)
{
    let PMI = myConstant.PAY_BY_CASH;
    if(payment_method.includes("momo"))
    {
        PMI = myConstant.PAY_BY_MOMO;
    }
    else if(payment_method.includes("zalopay"))
    {
        PMI = myConstant.PAY_BY_ZALOPAY;
    }
    return PMI;
}

exports.createOrder = async (user_email, user_name, user_phone, shipping_address, total_price, promotion_id, payment_method) => {
    if(user_email.length == 0 || user_email == null)
    {
        return false;
    }
    if(user_phone.length == 0 || user_phone == null)
    {
        return false;
    }
    if(shipping_address.length == 0 || shipping_address == null)
    {
        return false;
    }
    if(payment_method.length == 0 || payment_method == null)
    {
        return false;
    }
    if(promotion_id.length == 0)
    {
        promotion_id = null;
    }
    
    const payment_method_id = convertToPaymentMethodId(payment_method);
    console.log("inside order Service: PASS");
    return await orderRepository.createOrder(user_email, user_name, user_phone, shipping_address, total_price, promotion_id, payment_method_id)
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