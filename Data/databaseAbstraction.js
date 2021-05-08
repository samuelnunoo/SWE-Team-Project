const User = require("./models/userModel");
const Node = require("./models/nodeModel");
const TypeCollection = require("./models/typeCollectionModel");
const { db } = require("./models/userModel");
var ObjectId = require("mongoose").Types.ObjectId;
bcrypt = require("bcryptjs");

exports.createUser = async (userData) => {
  let newUser = new User(userData);
  newUser.hash_password = bcrypt.hashSync(userData.password, 10);
  return newUser.save();
};

exports.getUserByEmail = async (userEmail) => {
  return User.findOne({ email: userEmail });
};

exports.getNodes = async (query, userID, count) => {
  let usrModifiedQuery = query;
  usrModifiedQuery.owner = userID;
  return Node.find(usrModifiedQuery)
    .sort([["lastUpdate", -1]])
    .limit(count);
};

exports.getNode = async (nodeID, userID) => {
  const query = { _id: nodeID, owner: userID };
  return Node.findOne(query);
};

exports.createNode = async (data, userID) => {
  let nodeData = data;
  nodeData.owner = userID;
  let newNode = new Node(nodeData);
  return newNode.save();
};

exports.updateNode = async (data, nodeID, userID) => {
  return Node.updateOne(
    { _id: nodeID, owner: userID }, data,
    { upsert: true, setDefaultsOnInsert: true }
  );
  // .then((success, err) => {
  //   return new Promise((resolve, reject) => {
  //     if (err) {
  //       reject(Error("Couldn't update or create a node: ${err}"));
  //     } else {
  //       resolve(success);
  //     }
  //   });
  // });
};

exports.deleteNode = async (nodeID, userID) => {
  return Node.deleteOne({ _id: nodeID, owner: userID });
  // , (err) => {
  //   return new Promise((resolve, reject) => {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       resolve({ message: `Successfully deleted Node: ${nodeID}` });
  //     }
  //   });
  // });
};

exports.getTypeCollections = async (query, count) => {
  return TypeCollection.find(query).sort(["lastUpdate", -1]).limit(count);
};

exports.getTypeCollection = async (id) => {
  const query = { _id: id };
  return TypeCollection.findOne(query);
};

exports.deleteUser = async (userID) => {
  Node.deleteMany({ owner: new ObjectId(userID) }).then((success) => {
    return User.deleteOne({ _id: userID })
  }).catch((err) => {
    return Promise.reject({message: "Error: Unable to delete nodes"})
  })
};
