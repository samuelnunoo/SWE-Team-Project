const express = require("express");
const app = express();
const path = require("path");

// allows detection of url params
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  res.send("<p> Hello World </p>");
});

//@note Check why it is not blocking
app.listen(port, () => {
  console.log("Example app listening at localhost:3000");
});
