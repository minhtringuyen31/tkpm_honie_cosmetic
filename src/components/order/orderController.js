const orderService = require('./orderService');

exports.getAllUserOrder = async (req, res) => {
    const orders = await orderService.getAllUserOrder(req.user.loginEmail);
    console.log(orders);
    res.render('order/order', { order: orders });
    // res.render('order/order');
}

exports.create = async (req, res) => {
    console.log(req.body)
    const { user_name, shipping_address, user_phone, user_email, total_price, payment_method } = req.body
    if (req.body) {
        await orderService.createOrder(user_email, shipping_address, total_price, payment_method)
        const newestOrder = await orderService.getNewestOrder(user_email)

        await orderService.addProductOrder(newestOrder)

    }
}

/////
// getOrderList(user_email){
//     // orderlist = query llay toan bo oder cua nguoi do
//     //  
// }




exports.getAllOrder = async (req, res) => {
    if (req.user.loginRole == 1) {
        const result = await orderService.getAllOrder()
        console.log(result)
        res.render('admin/order/orderList', { layout: "layoutAdmin", result })
    } else {
        res.redirect('/index')
    }
}


exports.getOrderDetail = async (req, res) => {
    const orderId = req.params.orderId
    console.log("OrderID: " + orderId)
    const order = await orderService.getOneOrder(orderId)
    console.log(order)

    const product_order = await orderService.getAllProductOrder(orderId)
    console.log(product_order)

    res.render('admin/order/orderDetail', { layout: "layoutAdmin", order: order, product_order: product_order })
}

exports.updateOrderStatus = async (req, res) => {
    const orderId = req.query.orderId
    const status = req.query.status
    console.log(orderId + status)
    const result = await orderService.updateOrderStatus(orderId, status)
    if (result) {
        res.redirect('/order/all')
    } else {
        return null
    }
}

exports.test = async (req, res) => {
    res.render('admin/order/orderDetail', { layout: "layoutAdmin" })
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

