const config = require("../Data/config.json");
const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.dbpw,
    database: config.db
});