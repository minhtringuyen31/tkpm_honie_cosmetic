const db = require('../connect_DB');

const { ITEM_PER_PAGE } = require('../../constant');

exports.getAProduct = async (productID) => {
    console.log("here");
    try {
        console.log("here" + productID);
        const poolPromise = db.promise();
        const result = await poolPromise.query('SELECT * FROM PRODUCT WHERE PRODUCT.PRODUCT_ID = ?', [productID]);
        // console.log(result[0]);
        return result[0][0];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

exports.getProductsByPage = async (page) => {
    try {
        const poolPromise = db.promise();
        const result = await poolPromise.query(`SELECT * FROM PRODUCT LIMIT ${ITEM_PER_PAGE} offset ${(page - 1) * ITEM_PER_PAGE}`);
        return result[0];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

exports.count = async () => {
    try {
        const poolPromise = db.promise();
        const result = await poolPromise.query(`SELECT COUNT(*) as count FROM PRODUCT`);
        console.log(result[0]);
        return result[0][0].count;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

exports.getRelatedProduct = async (productID) => {
    console.log("here");
    try {
        console.log("here" + productID);
        const poolPromise = db.promise();
        const result = await poolPromise.query('SELECT PD2.* FROM PRODUCT PD1, PRODUCT PD2 WHERE PD1.PRODUCT_ID = ? AND PD1.PRODUCT_CATEGORY = PD2.PRODUCT_CATEGORY', [productID]);
        console.log(result[0][0]);
        return result[0][0];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
