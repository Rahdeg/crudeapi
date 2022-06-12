//import model
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transport = require('../nodemailer')


// Create and Save a new User
exports.signup = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const { id, email, password } = req.body;
    const salt= bcrypt.genSaltSync(10);
    const hashed= bcrypt.hashSync(password,salt);
    const encrypedPass= hashed;
    const user = new User(id, email, encrypedPass);
     //email confirmation message
     const options = {
      from: 'crudeguys@outlook.com',
      to: email,
      subject: 'Account created successfully',
      text: 'Thank you for creating an account with us, we are here to satisfy your needs.',
  };
  
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred."
        });
      else res.status(200).send(data);
      transport.sendMail(options,(err, data)=>{
        if (err) {
          console.log(err)

        } else {
          console.log(data)
        }
      });
    });
  };
  
  // Retrieve all users from the database
  exports.findAll = (req, res) => {
  
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting users."
        });
      else res.send(data);
    });
  };
  
  // Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
  
  
// Update a User identified by the id in the request
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
};
  
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.delete(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// signin user controller
exports.signin=(req,res)=>{
    if (!req.body) {
       res.send({message: 'fill in required fields'});
     }
       const {password,email} = req.body;
       User.findByEmail(email,(err,data)=>{
           if (err) {
               console.log(err)
               res.send(err)
               return;
           } if (data) {
               if (bcrypt.compareSync(password,data.password)) {
                const token= jwt.sign({id:data.id},"123456789",{expiresIn:'1d'})
                   res.send({
                       status: 'ok',
                       data:{
                           token,
                           email: data.email,
                           password: data.password
                       }
                   })
               } else {
                   res.send(err)
               }
           }
       })
    
}
