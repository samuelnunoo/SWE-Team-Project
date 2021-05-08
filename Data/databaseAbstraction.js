const Node = require("./models/nodeModel");
const TypeCollection = require("./models/typeCollectionModel");
const User = require("./models/userModel");
const { db } = require("./models/userModel");
bcrypt = require("bcryptjs");

exports.createNode = async (userID) => {
  // let usrModifiedQuery = query;
  // usrModifiedQuery.owner = userID;
  // return Node.find(usrModifiedQuery);
};

exports.getNode = async (nodeID, userID) => {
  const query = { _id: nodeID, owner: userID };
  return Node.findOne(usrModifiedQuery);
};

exports.getNodes = async (query, userID, count) => {
  let usrModifiedQuery = query;
  usrModifiedQuery.owner = userID;
  Node.find(usrModifiedQuery)
    .sort('lastUpdate', -1)
    .limit(count)
    .exec((err, nodes) => {
      return new Promise(async (resolve, reject) => {
        if (err) {
          reject(err);
        } else {
          resolve(nodes)
        }
      })
    });
};

exports.getTemplate = async (id) => {
  return new Promise((resolve) => {
    resolve(
      "This function has not been implemented yet. Please mock for unit testing"
    );
  });
};

exports.getTemplates = async (query) => {
  return new Promise((resolve) => {
    resolve(
      "This function has not been implemented yet. Please mock for unit testing"
    );
  });
};

exports.getUserByEmail = async (userEmail) => {
  User.findOne({ email: userEmail}, (err, user) => {
    return new Promise(async (resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(user)
      }
    })
  })
};

exports.createUser = async (userData) => {
  let newUser = new User(userData);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save().then((success, err) => {
    return new Promise(async (resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  })
};
