const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const makeConnection = () => {
    connection.connect();
    console.log("Connected to database", process.env.DB_NAME);
}

const closeConnection = () => {
    connection.end();
    console.log("Closed connection to database");
}

const getConnection = () => {
    return connection;
}

module.exports = {
    makeConnection,
    closeConnection,
    getConnection
}