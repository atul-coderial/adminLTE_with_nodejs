//Loading library of epxress
const express = require("express");
//Assining Port
const port = 8000;
//path
const path = require("path");
//Express Ejs layouts library
const expressLayout = require("express-ejs-layouts");

//use express funcationality
const app = express();

//static path of assets
app.use(express.static(path.join(__dirname, "public")));

//setup ejs view engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Routing the application
app.use("/", require("./routes"));

//setup server
app.listen(port, function (err) {
  if (err) {
    console.log("Error to running the server");
  }
  console.log(`Server is running successfully on ${port}`);
});
