
const mysql= require('mysql2');


const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Diamond2022@',
    database:'sidehustle',
})

connection.connect((err)=>{
    if (err) {
        throw err
    }
    console.log('DATABASE CONNECTED')
})

module.exports= connection;