// create, login use contoller functions to handle the requests with this snippet from server/controllers/user.controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const con = require("../config/db.config.js");

// Create a new user
exports.create = (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Create a User
  const user = {
    email: email,
    password: hashedPassword,
  };

  // generate token
  const token = jwt.sign(
    { id: user.id, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400, // expires in 24 hours
    }
  );

  // check if user already exists
  con.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    } else {
      if (data.length > 0) {
        return res.status(409).send({
          message: "User already exists",
        });
      }
    }
  });

  // Save User in the database
  con.query("INSERT INTO users SET ?", user, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    } else {
      return res.send({ data, token });
    }
  });
};

// Login a user
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  con.query("SELECT * FROM users WHERE email = ?", [email], (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while logging in.",
      });
    } else {
      if (data.length > 0) {
        const isValid = bcrypt.compareSync(password, data[0].password);
        if (isValid) {
          const token = jwt.sign(
            { id: data[0].id, email: data[0].email },
            process.env.JWT_SECRET,
            {
              expiresIn: 86400, // expires in 24 hours
            }
          );
          return res.send({ token });
        } else {
          return res.status(401).send({
            message: "Invalid email or password",
          });
        }
      } else {
        return res.status(401).send({
          message: "Invalid email or password",
        });
      }
    }
  });
};
