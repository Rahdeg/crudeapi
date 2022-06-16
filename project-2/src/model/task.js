//import database
const db = require('../utils/database');

class Task{
    constructor(id, user, Task) {
      this.id = id;
      this.user = user;
      this.todo = todo;
    }
    //update task by id
    static updateById(id, user, result){
      db.query(
        "UPDATE task SET id = ?, user = ?, Task = ? WHERE id = ?",
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
          console.log("task updated: ", { ...Task });
          result(null, { ...Task });
        }
      );
    }
  
  }

module.exports = Task;
