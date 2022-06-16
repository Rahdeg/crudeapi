const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../../nodemailer");

exports.register = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { id, username, email, password, created_on } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);
  const encrypedPass = hashed;
  const user = new User(id, username, email, encrypedPass, created_on);

  const options = {
    from: "walett95@gmail.com",
    to: [email, "rahdegonline@gmail.com"],
    subject: "Account created successfully",
    text: "Thank you for creating an account with us, we are here to satisfy your needs.",
  };

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
      return;
    }
    res.status(200).send(data);
    transporter.sendMail(options, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email sent :", data.response);
      }
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      status: false,
      message: "Both email and password are required.",
    });
  }

  User.findByEmail(email, (err, data) => {
    // Handle the error cases
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          status: false,
          message: `User with email (${email}) does not exist.`,
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Some error occurred, please try again",
        });
      }
    }

    // Handle when the user exist
    if (data) {
      //   Compare the typed password with the user's password hash
      if (bcrypt.compareSync(password, data.password)) {
        // Create a token for the user
        const token = jwt.sign({ id: data.id }, "1234567890", {
          expiresIn: "1d",
        });

        // Filter out the [password] field from the data
        data = User.filterOutPasswordField(data);

        return res.status(200).send({
          status: true,
          token: token,
          data: { ...data },
        });
      }

      // Handle when the password is incorrect
      return res.status(401).send({
        status: false,
        message: "Incorrect password.",
      });
    }
  });
};
