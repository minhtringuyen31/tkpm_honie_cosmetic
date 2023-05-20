const async = require('hbs/lib/async');
const connection = require('../connect_DB');



exports.getOrdersByEmail = async (userEmail) => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT * FROM orders WHERE orders.user_email = ?`
        const [res] = await poolPromise.query(query, [userEmail]);
        return res[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.createOrder = async (user_email, shipping_address, total_price, payment_method) => {
    try {
        const poolPromise = connection.promise();
        const query = `INSERT INTO orders (user_email, shipping_address, total, payment_method_id) VALUES (?,?,?,?)`
        const value = [user_email, shipping_address, total_price, payment_method]
        const [res] = await poolPromise.query(query, value);

        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getOrderByStatus = async (status) => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT * FROM orders WHERE status = ?`
        const [res] = await poolPromise.query(query, [value]);

        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.reviewProduct = async (user_email, product_id, comment, rating) => {
    try {
        const poolPromise = connection.promise();
        const query = `INSERT INTO rating (user_email, product_id, rating, comment) VALUES (?,?,?,?)`
        const value = [user_email, product_id, rating, comment]
        const [res] = await poolPromise.query(query, [value]);
        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getNewestOrder = async (user_email) => {
    try {
        const poolPromise = connection.promise()
        const query = `SELECT * FROM orders WHERE user_email = ? ORDER BY order_date DESC LIMIT 1;`
        const [res] = await poolPromise.query(query, [user_email]);
        return res
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.ddProductOrder = async (orderId, productId, quantity, price) => {
    try {
        const poolPromise = connection.promise();
        const query = `INSERT INTO product_order (order_id, product_id, quantity, price) VALUES (?,?,?,?)`
        const value = [orderId, productId, quantity, price]
        const [res] = await poolPromise.query(query, value);
        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getAllOrder = async () => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT * FROM orders`
        const [res] = await poolPromise.query(query);
        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getOneOrder = async (orderId) => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT * FROM orders WHERE orders.id = ?`
        const [res] = await poolPromise.query(query, [orderId]);
        return res[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getAllProductOrder = async (orderId) => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT * FROM product_order JOIN product ON product_order.product_id = product.product_id WHERE product_order.id = ?`
        const [res] = await poolPromise.query(query, [orderId]);
        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.updateOrderStatus = async (orderId, status) => {
    try {
        const poolPromise = connection.promise();
        const query = `UPDATE orders SET status = ? WHERE id = ?`
        const value = [status, orderId]
        const [res] = await poolPromise.query(query, [orderId]);
        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}