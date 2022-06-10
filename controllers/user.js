//import model
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//user sign up controller
    exports.signup=(req,res) => {
        if (!req.body) {
            res.send({message:'fill in the required'})
        }
        const {id,hash,email}=req.body;
        const salt= bcrypt.genSaltSync(10);
        const hashed= bcrypt.hashSync(hash,salt);
        const encrypedPass= hashed;
        const user = new User(id,encrypedPass,email)
        User.createUser(user,(err,info) => {
            console.log('i am in')
            if (err) {
                res.send(err)
            } else {
                console.log('info: ',info)
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
           } else {
              if (bcrypt.compareSync(hash,data.hash)) {
                  const token =jwt.sign({id:data.id},'1234567890',{expiresIn:'1d'}); 
                  res.send({status:'successful' ,data:{
                      token,
                      hash:data.hash,
                      email:data.email,
                  }});                 
              } else {
                  res.send({status:'erroe' ,message:'incorrect password'});
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