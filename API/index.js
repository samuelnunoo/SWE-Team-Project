const app = require("./server");
const db = require("../Data/db")

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log("Server has started");
});

db.connect();