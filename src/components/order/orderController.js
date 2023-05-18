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

