const db = require("../utils/database");

class Task {
  constructor(id, user, todo, status, created_on) {
    this.id = id;
    this.user_id = user_id;
    this.todo = todo;
    this.status = status;
    this.created_on = created_on;
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

  static filterTask(filterBy, result) {
    db.query(
      "SELECT * FROM todos WHERE status = ? ORDER BY created_on DESC",
      filterBy,
      (err, res) => {
        if (err) {
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
}

module.exports = Task;
