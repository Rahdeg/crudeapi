
const db = require("../utils/database");

class Task {
  constructor( user_id, todo) {
    this.user_id = user_id;
    this.todo = todo;
  }

  static createTask(newTask, result) {
    db.query(
      "INSERT INTO todos VALUES (NULL,?,?,DEFAULT,NOW())",
      [ newTask.user_id,newTask.todo],
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(null, err);
          return;
        }
        console.log("created user", { ...newTask });
        result(null, { id: res.insertId, ...newTask });
      }
    );
  }

  static getALL(result) {
    db.query("SELECT * FROM todos", (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log("todos: ", res);
        result(null, res);
      }
    });
  }

  static getALLById(id,result) {
    db.query("SELECT * FROM todos WHERE id = ?", id,(err, res) => {
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

  static getALLByUserId(id,result) {
    db.query("SELECT t.id,t.todo,t.status,u.username,t.created_on FROM users u INNER JOIN todos t ON u.id=t.user_id WHERE user_id=?", id,(err, res) => {
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

  static filterTask(filterBy, result) {
    db.query(
      "SELECT * FROM todos WHERE status = ? ORDER BY created_on DESC",
      [filterBy],
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
     }


  static delete(id, cb){
      db.query(`DELETE FROM todos WHERE id = ?`,id,(err, res)=>{
          if (err){
              return cb(err, null)
          }
          return cb(null, {
              msg:"todo deleted successfully",
              id:id
          })
      })
  }

  static editById(id, todo, result){
    db.query(
      "UPDATE todos SET todo=? WHERE id=?",
      [todo, id],
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
        console.log("task updated");
        result(null, {
          msg:"todo updated successfully",
          id:id,
          todo:todo
      });
      }
    );
  }

  static updateStatus(id, status, result){
    db.query(
      "UPDATE todos SET status=? WHERE id=?",
      [status, id],
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
        console.log("task updated");
        result(null, {
          msg:"todo updated successfully",
          id:id,
          status: status
      });
      }
    );
  }


  }




    
module.exports = Task;
