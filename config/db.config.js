
const mysql= require('mysql');


const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sidehustle',
})

connection.connect((err)=>{
    if (err) {
        throw err
    }
    console.log('DATABASE CONNECTED')
})

module.exports= connection;