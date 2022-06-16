const mysql = require("mysql2");
<<<<<<< HEAD
require('dotenv/config');
=======
require("dotenv/config");
>>>>>>> 812d6e12788523a449ec51ac7b9bfac9f445bc77

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
});

// Create Database if it does not exist
exports.createDB = () => {
  connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err, _) => {
    if (err) {
      return console.log(err);
    }
    this.createTables();
    return console.log(`DATABASE ${DB_NAME} created successfully`);
  });
};

const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createTodoTable = `
CREATE TABLE IF NOT EXISTS todos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user INT,
    FOREIGN KEY (user) REFERENCES users(id),
    todo VARCHAR(2000) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

exports.createTables = () => {
  let connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  connection.query(createUserTable, (err, _) => {
    if (err) {
      return console.log(err);
    }
    return console.log("User Table Created Successfully");
  });
  connection.query(createTodoTable, (err, _) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Todo Table Created Successfully");
  });
};

this.createDB();

setTimeout(() => {
  process.exit(0);
}, 2000);
