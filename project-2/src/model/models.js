//import database
const db = require('../config/db.config');

class User{
    constructor(id, email,password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    //update user by id
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
}

class Todo{
  constructor(id, user, todo) {
    this.id = id;
    this.user = user;
    this.todo = todo;
  }
  //update task by id
  static updateById(id, user, result){
    db.query(
      "UPDATE task SET id = ?, user = ?, todo = ? WHERE id = ?",
      [todo.id, todo.user, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          //not found
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("task updated: ", { ...todo });
        result(null, { ...todo });
      }
    );
  }

}

module.exports = User;
module.exports = Todo;
