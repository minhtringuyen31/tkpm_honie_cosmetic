const async = require('hbs/lib/async');
const db = require('../connect_DB');


exports.getAllPromotion = async () => {
    try {
        const poolPromise = db.promise();
        const [promotion] = await poolPromise.query("SELECT id, name, description, discount,  DATE_FORMAT(start_date, '%Y-%m-%d %H:%i:%s') AS start_date, DATE_FORMAT(end_date, '%Y-%m-%d %H:%i:%s') AS end_date, image FROM promotion ORDER BY id DESC");
        console.log(promotion);
        return promotion;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

exports.getPromotionByID = async (promotionId) => {
    try {
        const poolPromise = db.promise();

        const [promotion] = await poolPromise.query("SELECT * FROM promotion WHERE id = ?", [promotionId]);
        console.log(promotion);
        return promotion[0];
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

exports.createPromotion = async (
    name,
    description,
    discount,
    start_date,
    end_date,
    image
) => {
    try {
        const poolPromise = db.promise();
        const values = [
            name,
            description,
            discount,
            start_date,
            end_date,
            image,
        ];
        const [promotion] = await poolPromise.query("INSERT INTO promotion (name, description, discount, start_date, end_date, image) VALUES (?, ?, ?, ?, ?, ?)", values);
        console.log(promotion);
        return promotion;
    } catch (error) {
        console.error(error);
        return false;
    }
},

    exports.editPromotion = async (
        id,
        name,
        description,
        discount,
        start_date,
        end_date,
        image
    ) => {
        try {
            const poolPromise = db.promise();
            const values = [
                name,
                description,
                discount,
                start_date,
                end_date,
                image,
                id
            ];
            const [promotion] = await poolPromise.query(`UPDATE promotion SET name=?, description=?, discount=?, start_date= ?, end_date= ?, image=? WHERE id=?`, values);
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }

    }
exports.removePromotion = async (promotionId) => {

    try {
        const poolPromise = db.promise();
        await poolPromise.query("DELETE FROM promotion WHERE id=?", [promotionId]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

exports.getAPromotion = async (promotionId) => {
    try {
        const poolPromise = db.promise();
        const [result] = await poolPromise.query("SELECT id, name, description, discount,  DATE_FORMAT(start_date, '%Y-%m-%d %H:%i:%s') AS start_date, DATE_FORMAT(end_date, '%Y-%m-%d %H:%i:%s') AS end_date FROM promotion WHERE id=?", [promotionId]);
        return result[0];
    } catch (error) {
        console.error(error);
        return false;
    }
}


// exports.numberOfPromotions = async () =>
// {
//     try
//     {
//         const poolPromise = db.promise();
//         const [result] = await poolPromise.query("SELECT count(*) FROM promotion")
//         console.log(result)
//         return 0
//     }
//     catch(err)
//     {
//         console.log(err)
//         return -1
//     }
// }