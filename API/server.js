const express = require("express");
const app = express();
const authHandlers = require("./controllers/authController");
const nodeHandlers = require("./controllers/nodeController");
const typeCollectionHandlers = require("./controllers/typeCollectionController");

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
  .put(authHandlers.validateToken, nodeHandlers.putNode)
  .delete(authHandlers.validateToken, nodeHandlers.deleteNode);

app
  .route("/api/typeCollections")
  .get(typeCollectionHandlers.getTypeCollections)

app
  .route("/api/typeCollections/:id")
  .get(typeCollectionHandlers.getTypeCollection)

app.route("/api/account")
  .delete(authHandlers.validateToken, authHandlers.deleteAccount)
  
module.exports = app;
