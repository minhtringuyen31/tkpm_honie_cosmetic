const db = require('../connect_DB');


exports.getAll = async () => {
    try {
        const poolPromise = db.promise();
        const query = `SELECT * FROM promotion`
        const [result] = await poolPromise.query(query);
        return result;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}