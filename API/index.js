const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

let port = '3000'

app.listen(port, () => {
    console.log("Connection on port 3000");
});