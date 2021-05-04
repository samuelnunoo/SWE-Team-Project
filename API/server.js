const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const db = require("../Data/databaseAbstraction");
const authHandlers = require("./controllers/authController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app
  .route("/api/nodes/:id")
  .get(authHandlers.validateToken, (req, res) => {
    res.sendStatus(200)
  })
  .put(authHandlers.validateToken)
  .delete(authHandlers.validateToken);

app
  .route("/api/nodes")
  .get(authHandlers.validateToken)
  .post(authHandlers.validateToken)
  .delete(authHandlers.validateToken);
















// ------ a test endpoint for reference ------
// app.get("/api/testobject/:id", async (req, res) => {
//   const { id } = req.params;
//   // const { id } = req.query;
//   const { content } = req.body;

//   db.getNode(id).then((node) => {
//     const post = {
//       id: id,
//       // content: content,
//       title: "asdf",
//       message: content.message,
//       dbResult: node,
//     };
//     res.status(200).send(post);
//   });
// });


module.exports = app;
