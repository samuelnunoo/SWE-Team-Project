const app = require("./server");
const db = require("../Data/db")
const cors = require('cors')
const port = process.env.PORT || 8080


const handle_corr = (req,res,next) => {
  res.set('Access-Control-Allow-Origin','*')
  next()
}
app.use(cors())
app.listen(port, () => {
  console.log("Server has started");
});

db.connect();