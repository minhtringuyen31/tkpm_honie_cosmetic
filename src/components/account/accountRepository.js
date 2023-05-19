const connection = require('../connect_DB');
const START_STATUS = 'exercuting';


exports.getAll = async () => {
    try {
        const poolPromise = connection.promise();
        const query = `SELECT * FROM users`
        const [rows] = await DB.pool().query(query);
        return rows[0];
    }
    catch (e) {
        console.log(e)
        return [];
    }
}