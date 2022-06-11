//import database
const db = require('../config/db.config');


//user constructor
class User {
    constructor(username, email, password){
        this.username = username,
        this.email = email,
        this.password = password 
    }


//create a new user model
static  createUser(newUser,result){
    db.query('INSERT INTO users VALUES(NULL,?,?,?,NOW())',
    [newUser.username, newUser.email,newUser.password],(err,res)=>{
        if (err) {
            console.log('error: ', err);
            result(null,err);
            
        } else {
            console.log('user created successfully');
        result(null,{...newUser})
        }
    })
}

//sign in user model
static checkEmail(email,result){
    db.query('SELECT * FROM login WHERE email=?',email,(err,data)=>{
        if (err) {
            console.log(err)
            result(null,err)
        } else {
            console.log('login successful')
            result(null,data)
        }
    })
}

//get all user model
static getLogins(result){
    db.query('SELECT * FROM login',(err,data)=>{
        if (err) {
            console.log('error fetching data',err);
            result(null,err);
        }else{
            console.log('Data fetched successfuly');
            result(null,data);
        }
    })
}

//get by id model
static getLoginsById(id,result){
    db.query('SELECT * FROM login WHERE id= ?',id,(err,res)=>{
        if (err) {
            console.log('Error fetching login',err)
                result(null,err);
        } else {
           console.log('Data fetched successfuly');
           result(null,res);
        }
    })
}

//update user model
static updateById(id,user,result){
    db.query('UPDATE login SET id=?,hash=?,email=? WHERE id=?',
    [user.id,user.hash,user.email,id],(err,data)=>{
            if (err) {
               console.log('error', err)
               result(null, err)
            } else {
                console.log("updated user: ", { ...user });
                result(null, { ...user });
            }
    })
}
//delete user model
static deleteUserById(id,result) {
    db.query('DELETE FROM login WHERE id = ?',id,(err,data) =>{
        if (err) {
            console.log("error",err)
            result(null, err);
        } else {
            console.log("user deleted successfully")
            result(null,data)
        }
    })
}

}

module.exports=User;
