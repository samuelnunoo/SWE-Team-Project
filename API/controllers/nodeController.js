const db = require("../../Data/databaseAbstraction");

exports.getNodes = (req, res) => {
  const token = req.headers.token
  db.getNodes(req.body, req.user.id, (err, nodes) => {
    if (err) {
        res.status(500).send(err)
    }
    res.status(200).json(nodes)
  });
};

exports.getNode = (req, res) => {
    db.getNode(req, req.user.id, (err, nodes) => {
      if (err) {
          res.status(500).send(err)
      }
      res.status(200).json(nodes)
    });
  };

