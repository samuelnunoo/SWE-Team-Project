const User = require("./models/userModel");
const Node = require("./models/nodeModel");
const TypeCollection = require("./models/typeCollectionModel");
const { db } = require("./models/userModel");
bcrypt = require("bcryptjs");

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
  });
};

exports.getUserByEmail = async (userEmail) => {
  User.findOne({ email: userEmail }, (err, user) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

exports.getNodes = async (query, userID, count) => {
  let usrModifiedQuery = query;
  usrModifiedQuery.owner = userID;
  Node.find(usrModifiedQuery)
    .sort("lastUpdate", -1)
    .limit(count)
    .exec((err, nodes) => {
      return new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        } else {
          resolve(nodes);
        }
      });
    });
};

exports.getNode = async (nodeID, userID) => {
  const query = { _id: nodeID, owner: userID };
  Node.findOne(query, (err, node) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(node);
      }
    });
  });
};

exports.createNode = async (data, userID) => {
  let nodeData = data;
  nodeData.owner = userID;
  let newNode = new Node(nodeData);
  newNode.save().then((success, err) => {
    return new Promise(async (resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  });
};

exports.updateNode = async (data, nodeID, userID) => {
  let nodeData = data;
  nodeData.owner = userID;
  nodeData._id = null;
  let newNode = new Node(nodeData);
  newNode
    .update(
      { _id: nodeID, owner: userID },
      { upsert: true, setDefaultsOnInsert: true }
    )
    .then((success, err) => {
      return new Promise((resolve, reject) => {
        if (err) {
          reject(Error("Couldn't update or create a node: ${err}"));
        } else {
          resolve(success);
        }
      });
    });
};

exports.deleteNode = async (nodeID, userID) => {
  Node.deleteOne({ _id: nodeID, owner: userID }, (err) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve({ message: `Successfully deleted Node: ${nodeID}` });
      }
    });
  });
};

exports.getTypeCollections = async (query, count) => {
  TypeCollection.find(query)
    .sort("lastUpdate", -1)
    .limit(count)
    .exec((err, typeCollections) => {
      return new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        } else {
          resolve(typeCollections);
        }
      });
    });
};

exports.getTypeCollection = async (id) => {
  const query = { _id: id };
  TypeCollection.findOne(query, (err, node) => {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        resolve(node);
      }
    });
  });
};
