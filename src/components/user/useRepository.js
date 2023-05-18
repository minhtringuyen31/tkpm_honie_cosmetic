const connection = require('../connect_DB');
const START_STATUS = 'exercuting';


exports.getAll = async () => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT * FROM users`
        const [rows] = await poolPromise.query(query);
        return rows;
    }
    catch (e) {
        console.log(e)
        return [];
    }
}
