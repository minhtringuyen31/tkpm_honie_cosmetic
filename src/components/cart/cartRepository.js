const connection = require('../connect_DB');
const START_STATUS = 'exercuting';


exports.getCartDetail = async (userEmail) => {
    try {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT PRODUCT.PRODUCT_ID, PRODUCT.PRODUCT_NAME , PRODUCT.PRODUCT_PRICE, QUANTITY, PRODUCT.PRODUCT_IMAGE, PRODUCT.PRODUCT_PRICE*QUANTITY AS "total"\
        FROM USERS JOIN PRODUCT_CART ON (USERS.USER_EMAIL = ? AND USERS.USER_EMAIL = PRODUCT_CART.USER_EMAIL)\
        JOIN PRODUCT ON (PRODUCT_CART.PRODUCT_ID = PRODUCT.PRODUCT_ID)', [userEmail]);
        console.log("cartDetail: " + res[0]);
        return res[0];
    }
    catch (e) {
        console.log(e)
        return [];
    }
}


exports.checkExistProduct = async (userEmail, idProduct) => {
    try {
        const poolPromise = connection.promise();
        const res = await poolPromise.query('SELECT PC.QUANTITY FROM PRODUCT_CART AS PC WHERE PC.USER_EMAIL = ? AND PC.PRODUCT_ID = ? LIMIT 1', [userEmail, idProduct], function (err) {
            if (err) {
                return null;
            }
        });
        // if (res[0].length > 0) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
        console.log(res);
        return res[0][0].QUANTITY;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

