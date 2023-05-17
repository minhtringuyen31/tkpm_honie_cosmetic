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


exports.addToCart = async (req, res) => {
    const idProduct = req.params.idProduct;
    console.log("userEmail: " + req.user.loginEmail);
    console.log("idProduct: " + req.params.idProduct);
    await cartService.addToCart(req.user.loginEmail, idProduct);
    res.redirect('/product');
}

exports.removeFromCart = async (req, res) => {
    if (!req.user) {
        return;
    }
    const idProduct = req.params.idProduct;
    console.log("remove ID: " + idProduct);
    await cartService.removeFromCart(req.user.loginEmail, idProduct);
    res.redirect('/cart/cart-detail');
}

exports.showCheckout = async (req, res) => {
    // if (req.params.)
    if (!req.user) {
        res.redirect('/auth/login');
    }
    else {

        const userEmail = req.user.loginEmail;
        console.log("cartDetail " + userEmail);
        const products = await cartService.cartDetails(userEmail);
        console.log(products);

        const total = products.reduce((accumulator, object) => {
            return accumulator + parseFloat(object.total);
        }, 0);
        console.log(total);
        const orderInfor = {
            orderName: req.user.loginName,
            orderAddress: req.user.loginAddress,
            orderPhone: req.user.loginPhone,
            orderEmail: req.user.loginEmail,
            totalPrice: total
        }
        res.render('cart/checkout', { orderInfor: orderInfor, product: products });
    }
}

