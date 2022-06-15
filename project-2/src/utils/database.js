const mysql = require('mysql2');
require('dotenv/config');
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

db = mysql.createConnection({
    host: DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME
});

exports.db=db.connect((err)={
    if(err){
        console.log(err);
    }
});