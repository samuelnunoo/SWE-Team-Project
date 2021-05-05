const express = require("express");
const app = express();
const authHandlers = require("./controllers/authController");
const nodeHandlers = require("./controllers/nodeController");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.route("/api/auth/signup").post(authHandlers.register);

app.route("/api/auth/signin").post(authHandlers.signIn);

app
  .route("/api/nodes")
  .get(authHandlers.validateToken, nodeHandlers.getNodes)
  .post(authHandlers.validateToken, nodeHandlers.postNode);

app
  .route("/api/nodes/:id")
  .get(authHandlers.validateToken, nodeHandlers.getNode)
  .put(authHandlers.validateToken)
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
