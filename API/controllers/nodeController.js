const db = require("../../Data/databaseAbstraction");

exports.getNodes = (req, res) => {
  const maxItems = parseInt(req.query.max) || 50
  db.getNodes(req.body, req.user.id, maxItems).then((nodes) => {
    res.status(200).json(nodes)
  }).catch((err) => {
    console.log(err)
    res.status(500).send(err)
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

