const mysql = require('mysql2');
var connection = null;

//create connection to database 
connectTo_DB = () => {
    console.log("Connecting to Cosmetic DB");
    connection = mysql.createPool({
        host: 'localhost', user: 'root', password: 'root', database: 'dbcosmetic'
    });
    console.log("Connected to Cosmetic DB");
};

connectTo_DB();

module.exports = connection;