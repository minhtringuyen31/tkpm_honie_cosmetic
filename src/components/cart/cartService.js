const async = require('hbs/lib/async');
const productService = require('../products/productService');
const cartRepository = require('./cartRepository');



exports.cartDetails = async (_userEmail) => {
    // let check = await cartRepository.hasCart(_userEamil);
    // if(check === false) 
    // {
    //     return []; 
    // }
    return await cartRepository.getCartDetail(_userEmail);
}



exports.addToCart = async (_userEmail, _idProduct) => {
    const quantity = await cartRepository.checkExistProduct(_userEmail, _idProduct);
    console.log("quantity:  " + quantity);
    if (parseInt(quantity) <= 0 || quantity === null) {
        await cartRepository.addProductToCart(_userEmail, _idProduct);
    }
    else {
        await cartRepository.updateQuantity(_userEmail, _idProduct, parseInt(quantity) + 1)
    }
}

exports.removeFromCart = async (_userEmail, _idProduct) => {
    const quantity = await cartRepository.checkExistProduct(_userEmail, _idProduct);
    if (quantity === -1 || quantity === null) {
        console.log("NO PRODUCT IN CART");
        return false;
    }
    await cartRepository.removeProductInCart(_userEmail, _idProduct);
    return true;
}


exports.addOrder = async (newestOrder, products) => {
    await cartRepository.addNewOrder(newestOrder);
}

exports.increaseProductQuantity = async (user_email, product_id) =>
{
    return await cartRepository.incrQuantity(user_email, product_id);
}

exports.descreaseProductQuantity = async (user_email, product_id) =>
{
    const quantity = await cartRepository.checkExistProduct(user_email, product_id);
    if (quantity === 1 || quantity === null) {
        return await this.removeFromCart(user_email, product_id)
    }
    else
    {
        return await cartRepository.descQuantity(user_email, product_id);
    }
}