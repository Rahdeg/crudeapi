//import model
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//user sign up controller
    exports.signup=(req,res) => {
        if (!req.body) {
            res.send({message:'fill in the required'})
        }
        const {username, email, password}=req.body;
        const salt= bcrypt.genSaltSync(10);
        const hashed= bcrypt.hashSync(password,salt);
        const hashedPass= hashed;
        const user = new User(username,email,hashedPass)
        User.createUser(user,(err,info) => {
            if (err) {
                res.send(err)
            } else {
                res.send(info)
            }
        })
    }

// signin user controller
exports.signin=(req,res)=>{
    if (!req.body) {
       res.send({message: 'fill in required fields'});
     }
       const {hash,email} = req.body;
       User.checkEmail(email,(err,data)=>{
           if (err) {
               console.log(err)
               res.send(err)
               return;
           } if (data) {
               if (bcrypt.compareSync(hash,data[0].hash)) {
                const token= jwt.sign({id:data.id},"123456789",{expiresIn:'1d'})
                   res.send({
                       status: 'ok',
                       data:{
                           token,
                           email: data[0].email,
                           hash: data[0].hash
                       }
                   })
               } else {
                   res.send(err)
               }
           }
       })
    
}


//update user controller
exports.updateUser=(req,res)=>{
    if (!req.body) {
        res.send({messages:'fill emty space'})
    }
    const{id,hash,email}=req.body;
    const user= new User(id,hash,email);
    User.updateById(Number(req.params.id),user,(err,data)=>{
        if (err) {
            res.send('user id not found')
        } else {
            res.send(data)
        }
    })
}

//get user controller
exports.getAll=(req,res)=>{
    User.getLogins((err,data)=>{
        if (err) {
            res.status(400).send({
                error: err.message || 'Some error occurred'
            });
        } else {
            res.status(200).send(data)
        }
    })
}

//get by id constructor
exports.getAllById=(req,res)=>{
    const {id}=req.params
    User.getLoginsById(id,(err, info)=>{
        console.log('i am here')
        if (err) {
            res.send(err)  ;
        } else {
            console.log('info: ',info);
            res.send(info)
        }
    })
}

//delete user controller
exports.deleteUser=(req,res)=>{
    User.deleteUserById(Number(req.params.id),(err,data)=>{
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
}
