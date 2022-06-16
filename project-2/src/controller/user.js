//import model
const User = require('../models/user');
const Todo = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transport = require('../nodemailer');



// Update a User by the id 
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const { id, email, password } = req.body;
  const salt= bcrypt.genSaltSync(10);
  const hashed= bcrypt.hashSync(password,salt);
  const encrypedPass= hashed;
  User.updateById(
    Number(req.params.id),
    new User(id, email, encrypedPass),
    (err, data) => {
       if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}

//update task by id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const { id, user } = req.body;
  const salt= bcrypt.genSaltSync(10);
  Todo.updateById(
    Number(req.params.id),
    new Todo(id, user),
    (err, data) => {
       if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Todo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
}

