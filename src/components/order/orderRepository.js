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

exports.getAll = async () => {
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