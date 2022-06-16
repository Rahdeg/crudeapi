const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../../nodemailer')

exports.register = (req,res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    const {id,username,email,password,created_on} = req.body;
    const salt= bcrypt.genSaltSync(10);
    const hashed= bcrypt.hashSync(password,salt);
    const encrypedPass= hashed;
    const user = new User(id,username, email, encrypedPass,created_on);

    const options = {
        from: 'walett95@gmail.com',
        to: [email,'rahdegonline@gmail.com'],
        subject: 'Account created successfully',
        text: 'Thank you for creating an account with us, we are here to satisfy your needs.',
    };

    User.create (user,(err, data)=>{
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred'
            })
            return;
        }
        res.status(200).send(data);
        transporter.sendMail(options,(err,data) => {
           if (err) {
               console.log(err);
           } else {
               console.log('email sent :', data.response)
           }
        });
    })


}