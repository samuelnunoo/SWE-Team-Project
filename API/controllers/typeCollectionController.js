const db = require("../../Data/databaseAbstraction");
const  NUM_DEFAULT_TEMPLATES = 20

exports.getTypeCollections = (req, res) => {
  const maxItems = parseInt(req.query.max) || NUM_DEFAULT_TEMPLATES;
  db.getTypeCollections(req.body, maxItems)
    .then((nodes) => {
      res.status(200).json(nodes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getTypeCollection = (req, res) => {
  db.getTypeCollection(req.params.id)
    .then((typeCollection) => {
      res.status(200).json(typeCollection);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};