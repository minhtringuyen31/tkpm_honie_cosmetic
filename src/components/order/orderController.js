const async = require('hbs/lib/async');
const orderService = require('./orderService');
const productService = require('../products/productService');

exports.getAllUserOrder = async (req, res) => {
    //const orders = await orderService.getAllUserOrder(req.user.loginEmail);
    //console.log(orders);
    
    const orders=[
        {
            id:"1",
            total:123456,
            promotion_id:"THFGKK",
            payment_method_name:"ZaloPay",
            order_date:"25-12-2022",
            shipping_address:"HCM"
    
        },
        {
            id:"2",
            total:987654,
            promotion_id:"THFGKK",
            payment_method_name:"ZaloPay",
            order_date:"25-12-2022",
            shipping_address:"HCM"
    
        }
    ]

    res.render('customer/order/order',{orders})
}

exports.create = async (req, res) => {
    console.log(req.body)
    // if (req.body) {
    //     await orderService.createOrder(user_email, shipping_address, total_price, payment_method)
    //     const newestOrder = await orderService.getNewestOrder(user_email)

    //     await orderService.addProductOrder(newestOrder)

    // }
    if(req.user == undefined)
    {
        res.redirect('/auth/sign');
    }
    else if(req.body)
    {
        const { user_name, shipping_address, user_phone, user_email, total_price, promotion_id, payment_method } = req.body
        
        const result = await orderService.createOrder(user_email, user_name, user_phone, shipping_address, total_price, promotion_id, payment_method);
        if(result == true)
        {
            res.status(200).json(result).redirect('/order')
        }
        else if(result == false)
        {
            res.json(result);
        }
    }

}

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
exports.getOrderByStatus = async (req, res) => {
    const statusId = req.params.orderId
     //const orders = await orderService.getAllUserOrderByStatus(req.user.loginEmail,statusId);
    const orders=[
        {
            id:"1",
            total:123456,
            promotion_id:"THFGKK",
            payment_method_name:"ZaloPay",
            order_date:"25-12-2022",
            shipping_address:"Dong Nai"
    
        },
        {
            id:"2",
            total:987654,
            promotion_id:"THFGKK",
            payment_method_name:"ZaloPay",
            order_date:"25-12-2022",
            shipping_address:"My Tho"
    
        }
    ]
    
    res.render('customer/order/order', { orders })
}
exports.showOrderDetail = async (req, res) => {
    const orderId = req.params.orderId
    //const order = await orderService.getOrder(orderId);
    //const products = await orderService.getOrderDetail(orderId);
    
    const order=
        {
            id:"1",
            total:123456,
            promotion_id:"THFGKK",
            payment_method_name:"ZaloPay",
            order_date:"25-12-2022",
            shipping_address:"HCM",
            receiver_name:"John",
            phone_number:"0987123456"
    
        }
    
    const products=[
        {
            id:23,
            PRODUCT_NAME:"Hadalabo cleaner",
            quantity:5,
            price:1000000,
            PRODUCT_IMAGE:"PE01-2.png"
        },
        {
            id:12,
            PRODUCT_NAME:"Vichy cleaner",
            quantity:3,
            price:1000000,
            PRODUCT_IMAGE:"PE01-2.png"
        },
        {
            id:10,
            PRODUCT_NAME:"Lapoche Rosay cleaner",
            quantity:5,
            price:2000000,
            PRODUCT_IMAGE:"PE01-2.png"
        },
    ]

    res.render('customer/order/order_detail',{order,products})
}

exports.showOrderReview = async (req, res) => {
    const productId = req.params.productId
    //const product = await productService.getAProduct(productId);
    const product=
        {
            id:12,
            PRODUCT_NAME:"Hadalabo cleaner",
            PRODUCT_BRAND:"Hadalabo",
            price:1000000,
            PRODUCT_IMAGE:"PE01-2.png"
        }

    res.render('customer/order/order_review', { product })
}

exports.reviewProduct= async (req, res) => {
    console.log(req.body)   //{ comment: 'good', rating: '4' }
    const orderId = req.params.orderId
    const {comment, rating} = req.body
    
    
    // const result = await orderService.updateOrderStatus(orderId, req.user.loginEmail, comment, rating)
    // if (result) {
    //     res.redirect(`/order/order_detail${orderId}`)
    // } else {
    //     return null
    // }    
}



exports.changeStatus= async(req, res) =>{

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

