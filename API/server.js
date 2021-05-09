const express = require("express");
const app = express();
const authHandlers = require("./controllers/authController");
const nodeHandlers = require("./controllers/nodeController");
const typeCollectionHandlers = require("./controllers/typeCollectionController");
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

/*app.options('/api/auth/signup', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

*/
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
