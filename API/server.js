const express = require("express");
const app = express();
const db = require('../Data/databaseAbstraction')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/testobject/:id", async (req, res) => {
  const { id } = req.params;
  // const { id } = req.query;
  const { content } = req.body;

  db.getNode(id).then((node) => {
    const post = {
      id: id,
      // content: content,
      title: "asdf",
      message: content.message,
      dbResult: node,
    };
    res.status(200).send(post);
  })
});

module.exports = app;
