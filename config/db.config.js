const mysql= require('mysql2');
//connecting with database info
const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sunday40@',
    database:'sh',
})

connection.connect((err)=>{
    if (err) {
        throw err
    }
    console.log('DATABASE ACTIVATED')
})

module.exports= connection;