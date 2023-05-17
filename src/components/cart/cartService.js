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