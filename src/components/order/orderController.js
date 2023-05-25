const async = require('hbs/lib/async');
const orderService = require('./orderService');
const productService = require('../products/productService')

exports.getAllUserOrder = async (req, res) => {
    const orders = await orderService.getAllUserOrder(req.user.loginEmail);
    console.log(orders);
    res.render('customer/order/order', { order: orders });
}

exports.create = async (req, res) => {
    console.log(req.body)
    // if (req.body) {
    //     await orderService.createOrder(user_email, shipping_address, total_price, payment_method)
    //     const newestOrder = await orderService.getNewestOrder(user_email)

    //     await orderService.addProductOrder(newestOrder)

    // }
    if (req.user == undefined) {
        res.redirect('/auth/sign');
    }
    else if (req.body) {
        const { user_name, shipping_address, user_phone, user_email, total_price, promotion_id, payment_method } = req.body

        const result = await orderService.createOrder(user_email, user_name, user_phone, shipping_address, total_price, promotion_id, payment_method);
        if (result == true) {
            res.redirect('/order')
        }
        else if (result == false) {
            res.json(result);
        }
    }

}

exports.getOrderByStatus = async (req, res) => {
    const user_email = req.user.loginEmail
    const status = req.params.statusId
    console.log("status: " + status)
    const result = await orderService.getOrderByStatus(user_email, status)

    res.render('customer/order/order', { orders: result })

}


exports.showOrderReview = async (req, res) => {
    const productId = req.params.productId
    const result = await productService.getAProduct(productId)
    if (result) {
        res.redirect('/order/all', { product: result })
    } else {
        res.status(500).json(error);
    }
}

exports.review = async (req, res) => {
    const user_email = req.user.loginEmail
    const product_id = req.body.productId
    const comment = req.body.comment
    const rating = req.body.rating
    const result = await orderService.review(user_email, product_id, comment, rating)
    if (result) {
        res.status(200).json(result)
    } else {
        res.status(500).json(error);
    }
}




exports.getAllOrder = async (req, res) => {
    if (req.user != undefined) {
        if (req.user.loginRole == 1) {
            const result = await orderService.getAllOrder()
            console.log(result)
            res.render('admin/order/orderList', { layout: "layoutAdmin", result })
        } else {
            const user_email = req.user.loginEmail
            const result = await orderService.getAllUserOrder(user_email)
            console.log(result)
            res.render('customer/order/order', { orders: result })
        }
    } else {
        res.redirect('/auth/sign')
    }
}


exports.getOrderDetail = async (req, res) => {
    if (req.user != undefined) {
        if (req.user.loginRole == 1) {
            const orderId = req.params.orderId
            console.log("OrderID: " + orderId)
            const order = await orderService.getOneOrder(orderId)
            console.log(order)

            const product_order = await orderService.getAllProductOrder(orderId)
            console.log(product_order)

            res.render('admin/order/orderDetail', { layout: "layoutAdmin", order: order, product_order: product_order })
        }
        else {
            const orderId = req.params.orderId
            const order = await orderService.getOneOrder(orderId)
            const products = await orderService.getAllProductOrder(orderId)

            res.render('customer/order/order_detail', { order: order, products: products })
        }
    }
}

// exports.updateOrderStatus = async (req, res) => {
//     const orderId = req.query.orderId
//     const status = req.query.status
//     console.log(orderId + status)
//     const result = await orderService.updateOrderStatus(orderId, status)
//     if (result) {
//         console.log("hahaha duoc roi ne");
//         //res.redirect('/order/all')
//     } else {
//         return null
//     }
// }

exports.test = async (req, res) => {
    res.render('admin/order/orderDetail', { layout: "layoutAdmin" })
}



exports.showOrderReview = async (req, res) => {
    const productId = req.params.productId
    console.log("Product ID: " + productId)
    const product = await productService.getAProduct(productId);
    console.log("Product Review: " + product)

    res.render('customer/order/order_review', { product })
}

exports.reviewProduct = async (req, res) => {
    console.log(req.body)   //{ comment: 'good', rating: '4' }
    const product_id = req.params.productId
    const user_email = req.user.loginEmail
    const comment = req.body.comment
    const rating = req.body.rating

    const result = await orderService.createReview(user_email, product_id, comment, rating)
    if (result) {
        res.redirect(`/order`)
    } else {
        return null
    }
}



exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    // const idUser = parseInt(req.body.user_id);
    console.log(req.body);
    const changeStatus = await orderService.changeStatus(id, status);
    //doc database de check ket qua 
    if (changeStatus) {
        res.status(200).send(changeStatus);
    } else {
        res.status(404).send({ status: 0, message: 'Failed' });
    }
}

