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


exports.getProductInCart = async (user_email) => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT pc.product_id, pc.quantity, p.PRODUCT_PRICE*pc.QUANTITY AS "price" FROM product_cart as pc on product as p on pc.product_id = p.product_id WHERE pc.user_email = ?`
        const [res] = await poolPromise.query(query, [user_email])
        return res
    } catch (e) {
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


exports.addProductToCart = async (userEmail, idProduct) => {
    console.log('add product to cart');
    try {
        console.log("add to cart repo");
        const poolPromise = connection.promise();
        await poolPromise.query('INSERT INTO PRODUCT_CART (USER_EMAIL, PRODUCT_ID, QUANTITY) VALUES (?,?,1)', [userEmail, idProduct], function (err) {
            if (err) {
                return false;
            }
        });
        return true;
    }
    catch (e) {
        return false;
    }
}

exports.updateQuantity = async (userEmail, idProduct, newQuantity) => {
    try {
        console.log('update quan');
        const poolPromise = connection.promise();
        await poolPromise.query('UPDATE PRODUCT_CART SET PRODUCT_CART.QUANTITY = ? WHERE PRODUCT_CART.USER_EMAIL = ? AND PRODUCT_CART.PRODUCT_ID = ?', [newQuantity, userEmail, idProduct], function (err) {
            if (err) {
                return false;
            }
        })
        return true;
    }
    catch (e) {
        return false;

    }
}

exports.removeProductInCart = async (userEmail, idProduct) => {
    try {
        const poolPromise = connection.promise();
        await poolPromise.query('DELETE FROM PRODUCT_CART WHERE PRODUCT_CART.USER_EMAIL = ? AND PRODUCT_CART.PRODUCT_ID = ?', [userEmail, idProduct], function (err) {
            if (err) {
                return false;
            }
        });
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}


exports.addNewOrder = async (newOrder) => {
    try {
        const poolPromise = connection.promise();
        await poolPromise.query('INSERT INTO LIST_ORDER (USER_EMAIL, ORDER_DATE, PAYMENT_METHOD, ADDRESS_SHIPPING, TOTAL) VALUES (?,?,?,?,?)', [newOrder.USER_EMAIL, newOrder.ORDER_DATE, newOrder.PAYMENT_METHOD, newOrder.ADDRESS_SHIPPING, newOrder.TOTAL], function (err) {
            if (err) {
                return false;
            }
        });
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }

}

exports.incrQuantity= async (userEmail, idProduct)=> {
    try {
        console.log('increase quantity');
        const poolPromise = connection.promise();
        await poolPromise.query('UPDATE PRODUCT_CART \
                                SET PRODUCT_CART.QUANTITY = PRODUCT_CART.QUANTITY + 1 \
                                WHERE PRODUCT_CART.USER_EMAIL = ? AND PRODUCT_CART.PRODUCT_ID = ?', [userEmail, idProduct], function (err) {
            if (err) {
                return false;
            }
        })
        return true;
    }
    catch (e) {
        return false;

    }
}

exports.descQuantity= async (userEmail, idProduct)=> {
    try {
        console.log('increase quantity');
        const poolPromise = connection.promise();
        await poolPromise.query('UPDATE PRODUCT_CART \
                                SET PRODUCT_CART.QUANTITY = IF(PRODUCT_CART.QUANTITY - 1 > 0,PRODUCT_CART.QUANTITY - 1, 1) \
                                WHERE PRODUCT_CART.USER_EMAIL = ? AND PRODUCT_CART.PRODUCT_ID = ?', [userEmail, idProduct], function (err) {
            if (err) {
                return false;
            }
        })
        return true;
    }
    catch (e) {
        return false;

    }
}
