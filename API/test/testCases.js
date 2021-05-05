const jwt = require("jsonwebtoken");
const User = require("../../Data/models/userModel");

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

exports.getDummySignupData = () => {
  return {
    email: "janedoe@example.com",
    password: "Password!1",
    firstName: "Jane",
    lastName: "Doe",
  };
};

exports.getDummyLoginData = () => {
  return {
    email: "janedoe@example.com",
    password: "Password!1",
  };
};

exports.mockPromiseReject = async () => {
  return Promise.reject();
};

exports.mockPromiseResolve = async () => {
  return Promise.resolve();
};

exports.findUserMockPromiseResolve = async () => {
  return Promise.resolve(
    new User({
      email: "janedoe@example.com",
      hash_password: "xxxxxxxxxx",
      firstName: "Jane",
      lastName: "Doe",
    })
  );
};

exports.mockGetNumNodes = async (query, userID, count) => {
  return Promise.resolve(
    new Array(count).fill({
      title: `Document in group of ${count}`,
      type: "Document",
      owner: userID,
      content: {},
    })
  );
};

exports.getMockNodeData = () => {
  return {
    title: "Node Title",
    type: "Document",
    content: {},
  }
}

exports.mockCreateNode = async (data, userID) => {
  let node = data;
  node.owner = userID;
  node._id = "1234567890FOO"
  return Promise.resolve(
    node
  )
}

exports.mockCreateNodeFail = async (data, userID) => {
  return Promise.reject()
}

exports.mockGetNode = async (id, userID) => {
  return Promise.resolve({
    _id: id,
    owner: userID,
    title: "Node Title",
    type: "Document",
    content: {},
  })
}

exports.mockGetNodeFail = async (id, userID) => {
  return Promise.reject()
}

exports.getTestNodeID = () => {
  return "test-node-id-1234567890"
}