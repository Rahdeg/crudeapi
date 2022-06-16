const Todo = require('../models/todo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transport = require('../nodemailer');


//update task by id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const { id, user } = req.body;
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
        } else res.send(data), {
          "completed": true
        };
      } 
      
    );
  }
  