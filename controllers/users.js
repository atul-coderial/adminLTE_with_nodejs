//Loading library of mysql
const mysql = require("mysql");
//Calling database config
const db = require("../config/mysql_db");

//create user
module.exports.createUser = function (req, res) {
  //Input parameters
  const name = req.body.name;
  const email = req.body.email;
  const bloodgrp = req.body.bloodgrp;
  const phone = req.body.phone;

  const queryInsert =
    "INSERT INTO `users` (`name`, `email`, `bloodgrp`, `phone`) VALUES (?, ?, ?, ?)";
  const queryFormate = mysql.format(queryInsert, [
    name,
    email,
    bloodgrp,
    phone,
  ]);
  db.query(queryFormate, function (err) {
    if (err) {
      console.log("Error to add new user", err);
      return res.redirect("back");
    }
    console.log("New User Added In");
    return res.redirect("/userList");
  });
};

//edit user
module.exports.edit = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/adminsignIn");
  }
  const queryFindU = "SELECT * FROM `admin` WHERE `id` = ?";
  const queryF = mysql.format(queryFindU, [req.cookies.user_id]);
  db.query(queryF, function (err, val) {
    const id = req.params.id;
    const querFindData = "SELECT * FROM `users` WHERE `id` = ?";
    const queryFormate = mysql.format(querFindData, [id]);
    db.query(queryFormate, function (err, data) {
      if (err) throw err;
      const string = JSON.stringify(data);
      const records = JSON.parse(string);
      return res.render("edit", {
        title: "Update data",
        records: records,
        adminU: val,
      });
    });
  });
};

//update user data
module.exports.update = function (req, res) {
  //parameters
  const name = req.body.name;
  const email = req.body.email;
  const bloodgrp = req.body.bloodgrp;
  const phone = req.body.phone;

  const queryUpdate =
    "UPDATE `users` SET `name`=?, `email`=?, `bloodgrp`=?, `phone`=?";
  const queryUFormate = mysql.format(queryUpdate, [
    name,
    email,
    bloodgrp,
    phone,
  ]);
  db.query(queryUFormate, function (error) {
    if (error) {
      console.log("Error to update users info");
      return;
    }

    console.log("User Info updated successfully");
    return res.redirect("/userList");
  });
};

//Delete users from the List
module.exports.delete = function (req, res) {
  const id = req.params.id;
  const queryDelete = "DELETE FROM `users` WHERE `id`=?";
  const queryFormateDelete = mysql.format(queryDelete, [id]);
  db.query(queryFormateDelete, function (err) {
    if (err) throw err;
    return res.redirect("/userList");
  });
};
