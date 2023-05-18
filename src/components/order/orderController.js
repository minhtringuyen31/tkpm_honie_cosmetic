const orderService = require('./orderService');

exports.showOrders = async (req, res) => {
    //const orders = await orderService.getAllOrders(req.user.loginEmail);
    //console.log(orders);
    //res.render('order/order', { order: orders });
    // res.render('order/order');
    res.render('order/order')
}

exports.showOrderDetail = async (req, res) => {
    //const orders = await orderService.getAllOrders(req.user.loginEmail);
    //console.log(orders);
    //res.render('order/order', { order: orders });
    // res.render('order/order');
    res.render('order/order_detail')
}   

exports.showOrderReview = async (req, res) => {
    //const orders = await orderService.getAllOrders(req.user.loginEmail);
    //console.log(orders);
    //res.render('order/order', { order: orders });
    // res.render('order/order');
    res.render('order/order_review')
}   

