const orderService = require('./orderService');

exports.getAllUserOrder = async (req, res) => {
    const orders = await orderService.getAllUserOrder(req.user.loginEmail);
    console.log(orders);
    res.render('order/order', { order: orders });
    // res.render('order/order');
}

exports.getAll = async (req, res) => {
    if (req.user.loginRole == 1) {
        const result = await orderService.getAll()
        console.log(result)
        res.render('order/admin/orderList', { layout: "layoutAdmin", result })
    } else {
        res.redirect('/index')
    }
}

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

