const db= require('../utils/database');

class User{
    constructor(id,username,email,password,created_on){
        this.id=id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_on = created_on;
    }

    static create(newUser,result){
    db.query('INSERT INTO users VALUES (NULL,?,?,?,NOW())',[newUser.username,newUser.email,newUser.password],(err,res)=>{
        if(err){
            console.log('error', err);
            result(null,err);
            return;
        }
        console.log('created user',{...newUser});
        result(null, {id:res.insertId, ...newUser});
    });
    }




}

module.exports = User;