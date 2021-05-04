const jwt = require("jsonwebtoken");

const secretForTesting = "TypeIO";

exports.getDBResultTestCase = async () => {
  return new Promise((resolve) => {
    resolve({
      node: "It works!",
    });
  });
};

exports.getDBResultSuccess1 = async () => {
  return new Promise((resolve) => {
    resolve({
      _id: "XXXXXXXXXXXXXXXXXXXXXXXX",
      title: "Test Document",
      type: "Document",
      children: [],
      owner: "111111111111111111111111",
      parent: null,
      content: [],
    });
  });
};

exports.getInvalidToken = () => {
  return jwt.sign(
    {
      id: "12345678",
      firstname: "Jane",
      lastname: "Doe",
      email: "janedoe@example.com",
    },
    "incorrect-secret"
  );
};

exports.getValidTokenIncorrectUser = () => {
  return jwt.sign(
    {
      id: "87654321",
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
    },
    secretForTesting
  );
};

exports.getValidToken = () => {
  return jwt.sign(
    {
      id: "12345678",
      firstname: "Jane",
      lastname: "Doe",
      email: "janedoe@example.com",
    },
    secretForTesting
  );
};
