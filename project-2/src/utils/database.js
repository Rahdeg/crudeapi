const mysql = require("mysql2");
require("dotenv/config");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("DATABASE CONNECTED");
});

module.exports = connection;
