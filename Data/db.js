const mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
var uri = "mongodb://localhost:27017/TypeIO";

// Declare a variable named option and assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// Connect MongoDB Atlas using mongoose connect method
exports.connect = () => { mongoose
  .connect(uri, options)
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });
}

