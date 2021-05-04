const User = require("../../Data/models/userModel");
jwt = require("jsonwebtoken");
bcrypt = require("bcryptjs");

const secret = "TypeIO"

// Register a new user
exports.register = (req, res) => {
  let newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    user.hash_password = undefined;
    res.status(201).json(user);
  });
};

// User Sign function
exports.signIn = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        res
          .status(401)
          .json({ message: "Authentication failed. User not found." });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res
            .status(401)
            .json({ message: "Authentication failed. Wrong password." });
        } else {
          res.json({
            token: jwt.sign(
              { email: user.email, firstName: user.firstName, lastName: user.lastName, id: user._id },
              secret
            ),
          });
        }
      }
    }
  );
};

exports.validateToken = (req, res, next) => {
  const token = req.headers.token

  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        res.sendStatus(403).json({ message: err.message });
      }

      req.user = user;
      next();
    })
  } else {
    res.sendStatus(401).json({ message: "No auth token in header" });
  }
}