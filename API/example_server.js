const express = require("express")
const cors = require('cors')


const app = express()
app.use(cors())
const port = 8000

app.get('/', (req,res) => {
    res.send("<p> Hello World </p>")
})

//@note Check why it is not blocking 
app.listen(port)
console.log("Listening on localhost:8000")