const db = require("../../Data/databaseAbstraction");
const  NUM_DEFAULT_NODES = 50

exports.getNodes = (req, res) => {
  const maxItems = parseInt(req.query.max) || NUM_DEFAULT_NODES;
  db.getNodes(req.body, req.user.id, maxItems)
    .then((nodes) => {
      res.status(200).json(nodes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.getNode = (req, res) => {
  db.getNode(req.params.id, req.user.id)
    .then((nodes) => {
      res.status(200).json(nodes);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.postNode = (req, res) => {
  db.createNode(req.body, req.user.id)
    .then((node) => {
      res.status(200).json(node)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
};

exports.putNode = (req, res) => {
  db.updateNode(req.body, req.params.id, req.user.id)
    .then((resp) => {
      res.status(200).json(resp)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
}

exports.deleteNode = (req, res) => {
  db.deleteNode(req.params.id, req.user.id)
    .then((result) => {
      res
      .status(200)
      .json(result)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
}