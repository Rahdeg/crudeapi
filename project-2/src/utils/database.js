const mysql = require("mysql2");




const connection = mysql.createPool({
  host:"us-cdbr-east-05..net",
  user:"",
  password:"84325fa4",
  database:""
})




module.exports = connection;
