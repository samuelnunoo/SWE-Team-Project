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
