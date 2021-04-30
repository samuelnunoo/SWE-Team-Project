const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/testobject/", (req, res) => {
  // const { id } = req.params;
  // const { id } = req.query;
  // const { content } = req.body;
  const post = {
  //   id: id,
  //   content: content,
    title: "asdf",
  };
  res.status(200).send(post);
});

module.exports = app