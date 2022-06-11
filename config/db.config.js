//import mysql
const mysql= require('mysql2');
require('dotenv/config')
const {DB_DATABASE,DB_HOST, DB_USER, DB_PASSWORD} = process.env;
//connecting with database info
const connection= mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE,
})

connection.connect((err)=>{
    if (err) {
        throw err
    }
    console.log('DATABASE CONNECTED')
})

module.exports= connection;