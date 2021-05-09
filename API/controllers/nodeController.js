const db = require("../../Data/databaseAbstraction");
const  NUM_DEFAULT_NODES = 50

exports.getNodes = (req, res) => {
  const maxItems = parseInt(req.query.max) || NUM_DEFAULT_NODES;
  const query = req.query.type ? { type: req.query.type} : {}
  
  db.getNodes(query, req.user.id, maxItems)
    .then((nodes) => {
      res.status(200).json(nodes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getNode = (req, res) => {

  db.getNode(req.params.id, req.user.id)
    .then((node) => {
      if (node != null) {
        res.status(200).json(node);
      } else {
        res.status(404).send({"message": "Error: node not found"});
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

exports.postNode = (req, res) => {
  db.createNode(req.body, req.user.id)
    .then((node) => {
      res.status(201).json(node)
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