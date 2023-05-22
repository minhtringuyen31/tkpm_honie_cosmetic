const db = require('../connect_DB');

const { ITEM_PER_PAGE } = require('../../constant');
const async = require('hbs/lib/async');

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

exports.filterByPrice = async (option) => {
    try {
        let queryString = "SELECT * FROM PRODUCT WHERE "
        let _price = "";
        switch (parseInt(option)) {
            case 1: {
                _price = "PRODUCT.PRODUCT_PRICE < 30";
                break;
            }
            case 2: {
                _price = "PRODUCT.PRODUCT_PRICE BETWEEN 30 AND 60";
                break;
            }
            case 3: {
                _price = "PRODUCT.PRODUCT_PRICE BETWEEN 60 AND 90";
                break;
            }
            case 4: {
                _price = "PRODUCT.PRODUCT_PRICE BETWEEN 90 AND 120";
                break;
            }
            case 5: {
                _price = "PRODUCT.PRODUCT_PRICE >120";
                break;
            }
        }
        queryString = queryString + _price;
        const poolPromise = db.promise();
        const result = await poolPromise.query(queryString);
        console.log(result[0]);
        return result[0];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

exports.filterByBrand = async (option) => {
    try {
        let queryString = "SELECT * FROM PRODUCT WHERE "
        let _brand = "";
        switch (parseInt(option)) {
            case 1: {
                _brand = "PRODUCT.PRODUCT_BRAND LIKE 'AVON'";
                break;
            }
            case 2: {
                _brand = "PRODUCT.PRODUCT_BRAND LIKE 'ILIA'";
                break;
            }
            case 3: {
                _brand = "PRODUCT.PRODUCT_BRAND LIKE 'MAC'";
                break;
            }
            case 4: {
                _brand = "PRODUCT.PRODUCT_BRAND LIKE 'CLINIQUE'";
                break;
            }
            case 5: {
                _brand = "PRODUCT.PRODUCT_BRAND LIKE 'LANDCOME PARIS";
                break;
            }
        }
        queryString = queryString + _brand;
        const poolPromise = db.promise();
        const result = await poolPromise.query(queryString);
        console.log(result[0]);
        return result[0];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

exports.filterByCategory = async (option) => {
    try {
        let queryString = "SELECT * FROM PRODUCT WHERE "
        let _category = "";
        switch (parseInt(option)) {
            case 1: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'EYESHADOW'";
                break;
            }
            case 2: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'BLOCK LIPSTICK'";
                break;
            }
            case 3: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'MASCARA'";
                break;
            }
            case 4: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'PERFUME'";
                break;
            }
            case 5: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'POWDER";
                break;
            }
            case 6: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'PRIMER";
                break;
            }
            case 7: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'SERUM";
                break;
            }
            case 8: {
                _category = "PRODUCT.PRODUCT_CATEGORY LIKE 'SKINCARE";
                break;
            }
        }
        queryString = queryString + _category;
        const poolPromise = db.promise();
        const result = await poolPromise.query(queryString);
        console.log(result[0]);
        return result[0];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

exports.search = async (keyword) => {
    try {
        const poolPromise = db.promise();
        const result = await poolPromise.query("SELECT * FROM PRODUCT WHERE PRODUCT.PRODUCT_NAME LIKE ? OR PRODUCT.PRODUCT_BRAND LIKE ? OR PRODUCT.PRODUCT_CATEGORY LIKE ?", [keyword, keyword, keyword]);
        console.log(result[0]);
        return result[0];
    }
    catch (e) {
        console.log(e);
        return [];
    }
}       

exports.createProductBasically = async (productId, productName, productPrice, productCategory, productBrand, productDescription, productNumber) =>
{
    try
    {
        const poolPromise = db.promise();
        let query = "INSERT INTO product (PRODUCT_ID, PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_CATEGORY, PRODUCT_BRAND, PRODUCT_DESCRIPTION, NUMBER_OF) " +
        "VALUES(?,?,?,?,?,?,?)"
        const changedRows = await poolPromise.query(query, [productId, productName, productPrice, productCategory, productBrand, productDescription, productNumber]);
        return changedRows;
    }
    catch(err)
    {
        console.log(err)
        return 0;
    }
}

exports.editProduct = async (productId, newProductName, newProductPrice, newProductCategory, newProductBrand, newProductDescription, productNumber) =>
{
    try
    {
        const query = "UPDATE product SET product.PRODUCT_NAME = ?, product.PRODUCT_PRICE = ?, product.PRODUCT_CATEGORY = ?, product.PRODUCT_BRAND = ?, product.PRODUCT_DESCRIPTION = ?, product.NUMBER_OF = ? WHERE product.PRODUCT_ID = ?"
        const poolPromise = db.promise()
        const changedRows = await poolPromise.query(query,[newProductName, newProductPrice, newProductCategory, newProductBrand, newProductDescription, productNumber, productId]);
        return changedRows
    }
    catch(err)
    {
        console.log(err)
        return 0;
    }
}

exports.removeProduct = async (productId) =>
{
    try
    {
        const query = "DELETE FROM product WHERE product.PRODUCT_ID = ?"
        const poolPromise = db.promise()
        const changedRows = await poolPromise.query(query, [productId]);
        return changedRows
    }
    catch(err)
    {
        console.log(err)
        return 0;
    }
}