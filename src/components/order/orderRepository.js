const connection = require('../connect_DB');



exports.getOrdersByEmail = async (userEmail) => {
    try {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT * \
        FROM LIST_ORDER WHERE LIST_ORDER.USER_EMAIL = ?', [userEmail]);
        return res[0];
    }
    catch (e) {
        console.log(e);
        return null;
    }
}