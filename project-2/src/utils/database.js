const mysql = require("mysql2");




const connection = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"Golden2022@",
  database:"manager"
})




module.exports = connection;
