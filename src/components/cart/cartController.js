const cartService = require('./cartService');


exports.showCart = (req, res) => {
    if (!req.user) {
        res.redirect('/auth/sign');
    }
    else {
        res.render('cart/cart');
    }
}

exports.cartDetail = async (req, res) => {
    const userEmail = req.user.loginEmail;
    console.log("cartDetail " + userEmail);
    const products = await cartService.cartDetails(userEmail);
    // res.json({ detail: products });
    console.log(products);
    const total = products.reduce((accumulator, object) => {
        return accumulator + parseFloat(object.total);
    }, 0);
    console.log(total);
    res.render('cart/cart', { detail: products, total: total });
}