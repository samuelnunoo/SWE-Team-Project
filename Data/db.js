const mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
var uri = "mongodb://localhost:" + process.env.PORT || "3000" + "/TypeIO";

// Declare a variable named option and assign optional settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect MongoDB Atlas using mongoose connect method
mongoose
  .connect(uri, options)
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });
