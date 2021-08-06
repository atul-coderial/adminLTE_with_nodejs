//Loading mysql library
const mysql = require("mysql");

//Configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment",
});

db.connect((error) => {
  if (error) {
    console.log("Error to connect to the database");
    return;
  }
  console.log("Database is connected successfully");
});

module.exports = db;
