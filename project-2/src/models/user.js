const db = require("../utils/database");

class User {
  constructor( username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static create(newUser, result) {
    db.query(
      "INSERT INTO users VALUES (NULL,?,?,?,NOW())",
      [newUser.username, newUser.email, newUser.password],
      (err, res) => {
        if (err) {
          console.log("error", err);
          result(null, err);
          return;
        }
        console.log("created user", { ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  }

  static findById(id, results) {
    db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, res) => {
        if (err) {
            console.log("error ", err);
            results(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            results(null, res[0]);
            return;
        }
        // if not found
        results({ kind: "not_found"}, null);
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

  static updateById(id, user, result) {
    db.query(
      "UPDATE users SET  username = ?, email= ?, password = ? WHERE id = ?",
      [ user.username,user.email, user.password, id],
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


  static findByEmail(email, result) {
    db.query("SELECT * FROM users WHERE email = ?", email, (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      //   if the user is found
      if (res.length > 0) {
        const foundUser = res[0];
        result(null, foundUser);
        return;
      }

      //   If the user is not found
      result({ kind: "not_found" }, null);
    });
  }



  
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

  //   This will remove the password field from being displayed
  //   in the data result at the frontend for security reasons.
  static filterOutPasswordField(data) {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !key.includes("password"))
    );

    return filteredData;
  }
}

module.exports = User;
