const orderService = require('./orderService');

exports.showOrders = async (req, res) => {
    const orders = await orderService.getAllOrders(req.user.loginEmail);
    console.log(orders);
    res.render('order/order', { order: orders });
    // res.render('order/order');
}
