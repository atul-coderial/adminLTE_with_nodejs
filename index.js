//Loading library of epxress
const express = require("express");
//calling databse
const db = require("./config/mysql_db");
//Assining Port
const port = 8000;
//path
const path = require("path");
//Express Ejs layouts library
const expressLayout = require("express-ejs-layouts");
//Loading library of cookie-parser
const cookieParser = require("cookie-parser");
//Express Session
const session = require("express-session");

//use express funcationality
const app = express();

//call the cookie-parser to use
app.use(cookieParser());
//URL encoded to the req post
app.use(express.urlencoded({ extended: false }));

//static path of assets
app.use(express.static(path.join(__dirname, "public")));

//setup ejs view engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//session is created
app.use(
  session({
    name: "Test",
    secret: "ItF9pHVLaR4mLwgWi43XuCNGFgebVnBV",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 50,
    },
  })
);

//Routing the application
app.use("/", require("./routes"));

//setup server
app.listen(port, function (err) {
  if (err) {
    console.log("Error to running the server");
  }
  console.log(`Server is running successfully on ${port}`);
});
