const db = require("../utils/database");

class User {
  constructor(id, username, email, password, created_on) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created_on = created_on;
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
