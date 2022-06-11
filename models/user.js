const db = require('../config/db.config');

class User{
    constructor(id, email) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    static create(newUser, result) {
        db.query(`INSERT INTO users VALUES(?, ?)`, [newUser.id, newUser.emai, newUser.password], (err, res) =>{
            if(err){
                console.log("error ", err);
                result(err, null);
                return;
            }
            console.log("created user", { ...newUser});
            result(null, {id: res.insertId, ...newUser});
        });
    }

    static findById(id, results) {
        db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.log("error ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }
            // if not found
            result({ kind: "not_found"}, null);
        });
    }
    //GET ALL
    static getAll(result) {
        db.query("SELECT * FROM users", (err, res) => {
            if (err){
                console.log("ERROR ", err);
                result(null, err);
                return;
            }
            console.log("users: ", res);
            result(null, res)
        })
    }
    //UPDATE BY ID
    static updateById(id, user, result) {
        db.query(
          "UPDATE users SET id = ?, email = ?, password = ? WHERE id = ?",
          [user.id, user.email, user.password, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
    
            if (res.affectedRows == 0) {
              // not found
              result({ kind: "not_found" }, null);
              return;
            }
    
            console.log("updated user: ", { ...user });
            result(null, { ...user });
          }
        );
    }
    // DELETE USER
    static delete(id, result) {
        db.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
    
          if (res.affectedRows == 0) {
            // not found
            result({ kind: "not_found" }, null);
            return;
          }
    
          console.log("deleted user with id: ", id);
          result(null, res);
        });
    }
    
}

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