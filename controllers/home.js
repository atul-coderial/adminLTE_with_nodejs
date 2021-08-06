//Loading library of mysql
const mysql = require("mysql");
//Calling database config
const db = require("../config/mysql_db");
//Rendring home ejs
module.exports.home = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/admin");
  }
  return res.render("home", {
    title: "AdminLTE",
  });
};

//add_new user
module.exports.addUser = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/adminsignIn");
  }
  return res.render("add_user", {
    title: "Add New User",
  });
};

//User List
module.exports.userList = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/adminsignIn");
  }

  return res.render("users", {
    title: "User List",
  });
};

//Admin Register
module.exports.adminReg = function (req, res) {
  if (req.cookies.user_id) {
    return res.redirect("/");
  }
  return res.render("admin_signUp", {
    title: "Admin | Registration",
  });
};

//Admin SignIn
module.exports.adminSign = function (req, res) {
  if (req.cookies.user_id) {
    return res.redirect("/");
  }
  return res.render("admin_signIn", {
    title: "Admin | SignIn",
  });
};

//Create Admin account
module.exports.createAdmin = function (req, res) {};
