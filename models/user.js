const db = require('../config/db.config');

const Login=(login)=>{
    this.id = login.id;
    this.hash = login.hash;
    this.email = login.email;
}

//get all logins
Login.getLogins = (result)=>{
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

module.exports=Login;