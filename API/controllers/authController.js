const User = require("../../Data/models/userModel");
const db = require("../../Data/databaseAbstraction");
jwt = require("jsonwebtoken");
bcrypt = require("bcryptjs");

const secret = "TypeIO";

function generateWebToken(user) {
  return jwt.sign(
    {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    },
    secret
  ) 
}

// Register a new user
exports.register = async (req, res) => {
  let user = req.body;
  db.createUser(user)
    .then((success, err) => {
      if (err) {
        res.status(409).send({ message: err });
      } else {
        res.status(201).send({message: "Signup successful"});
      }
    })
    .catch((err) => {
      res.status(409).send({ message: err });
    });
};

// Sign in existing user
exports.signIn = (req, res) => {
  db.getUserByEmail(req.body.email)
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .send({ message: "Authentication failed. User not found." });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res
            .status(401)
            .send({ message: "Authentication failed. Incorrect password." });
        } else {
          res.status(200).json({ token: generateWebToken(user)});
        }  
      }
    })
    .catch((err) => {
      // console.log(err)
      res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
    });
};

exports.validateToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.sendStatus(403).json({ message: err.message });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401).json({ message: "No auth token in header" });
  }
};
