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

exports.createOrder = async (user_email, user_name, user_phone,  shipping_address, total_price, promotion_id, payment_method_id) => {
    try {
        const poolPromise = connection.promise();
        // const query = `INSERT INTO orders (user_email, shipping_address, total, payment_method_id) VALUES (?,?,?,?)`
        // const value = [user_email, shipping_address, total_price, payment_method]

        //CREATE PROCEDURE create_new_order (IN input_user_email VARCHAR(45), IN input_user_name VARCHAR(45), IN input_user_phone VARCHAR(45), 
        //IN input_shipping_address VARCHAR(90),
        //IN input_total_price DOUBLE, IN input_promotion_id INT, IN input_payment_method_id INT)
        const query = 'CALL create_new_order(?,?,?,?,?,?,?)'
        const params = [user_email, user_name, user_phone, shipping_address, total_price, promotion_id, payment_method_id]
        const result = await poolPromise.query(query, params);
        // const [res] = await poolPromise.query(query, value);
        console.log(result[0][0][0]);
        return result[0][0][0].RESULT;
    }
    catch (e) {
        console.log(e);
        return false;
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

// exports.updateOrderStatus = async (orderId, status) => {
//     try {
//         const poolPromise = connection.promise();
//         const query = `UPDATE orders SET status = ? WHERE id = ?`
//         const value = [status, orderId]
//         const [res] = await poolPromise.query(query, [orderId]);
//         console.log(res);
//         //res.[0];
//         return res;
//     }
//     catch (e) {
//         console.log(e);
//         return null;
//     }
// }

exports.changeStatus = async(id, status)=> {
    
    try {
        const poolPromise = connection.promise();
        const query = `UPDATE orders SET status=? WHERE id=?`;
        const values = [status, id];
      const [result] =  await poolPromise.query(query, values);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }