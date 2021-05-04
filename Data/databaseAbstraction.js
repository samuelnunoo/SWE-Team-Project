const Node = require("./models/nodeModel")
const TypeCollection = require("./models/typeCollectionModel")
const User = require("./models/userModel");
const { db } = require("./models/userModel");

exports.createNode = async (userID) => {
  let usrModifiedQuery = query;
  usrModifiedQuery.owner = userID;
  return Node.find(usrModifiedQuery);
};

exports.getNode = async (nodeID, userID) => {
  const query = { _id: nodeID, owner: userID }
  return Node.find(usrModifiedQuery);
};

exports.getNodes = async (query, userID, handler) => {
  let usrModifiedQuery = query;
  usrModifiedQuery.owner = userID;
  return Node.find(usrModifiedQuery, handler);
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

exports.getUser = async (query) => {
  return new Promise((resolve) => {
    resolve(
      "This function has not been implemented yet. Please mock for unit testing"
    );
  });
};

exports.createUser = async (data) => {
  return new Promise((resolve) => {
    resolve(
      "This function has not been implemented yet. Please mock for unit testing"
    );
  });
};
