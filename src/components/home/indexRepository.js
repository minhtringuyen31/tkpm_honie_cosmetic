const async = require('hbs/lib/async');
const connection = require('../connect_DB');

exports.getCurrentWeekRevenue = async () => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT SUM(total) AS week_revenue FROM orders WHERE YEARWEEK(order_date) = YEARWEEK(CURDATE());`
        const [res] = await poolPromise.query(query);
        console.log(res[0])
        return res[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getCurrentMonthRevenue = async () => {
    try {
        const poolPromise = connection.promise()
        const query = `SELECT SUM(total) AS month_revenue FROM orders WHERE YEAR(order_date) = YEAR(CURDATE()) AND MONTH(order_date) = MONTH(CURDATE());`
        const [res] = await poolPromise.query(query);
        console.log(res[0])
        return res[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getCurrentYearRevenue = async () => {
    try {
        const poolPromise = connection.promise()
        const query = `SELECT SUM(total) AS annual_revenue FROM orders WHERE YEAR(order_date) = YEAR(CURDATE());`
        const [res] = await poolPromise.query(query);
        console.log(res[0])
        return res[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

exports.getBestSellerProduct = async () => {
    try {
        const poolPromise = connection.promise()
        const query = `SELECT p.*, SUM(quantity) AS total_quantity FROM product p JOIN product_order po ON p.PRODUCT_ID = po.product_id GROUP BY product_id ORDER BY total_quantity DESC LIMIT 4;`
        const [res] = await poolPromise.query(query);
        return res;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}