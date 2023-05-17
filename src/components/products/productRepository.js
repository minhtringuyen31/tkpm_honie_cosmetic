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
