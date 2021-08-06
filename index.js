//Loading library of epxress
const express = require("express");
//Assining Port
const port = 8000;

//use express funcationality
const app = express();

//setup server
app.listen(port, function (err) {
  if (err) {
    console.log("Error to running the server");
  }
  console.log(`Server is running successfully on ${port}`);
});
