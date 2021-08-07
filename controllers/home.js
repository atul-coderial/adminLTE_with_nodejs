//Loading library of mysql
const mysql = require("mysql");
//Calling database config
const db = require("../config/mysql_db");
//Rendring home ejs
module.exports.home = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/admin");
  }
  const queryFindU = "SELECT * FROM `admin` WHERE `id` = ?";
  const queryF = mysql.format(queryFindU, [req.cookies.user_id]);
  db.query(queryF, function (err, data) {
    if (err) throw err;
    const queryFindR = "SELECT COUNT(*) AS TOTAL FROM `users`";
    const queryForR = mysql.format(queryFindR);
    db.query(queryForR, function (err, val) {
      const string = JSON.stringify(val);
      const records = JSON.parse(string);
      if (err) {
        console.log("Error to count the rows");
        return;
      }
      return res.render("home", {
        title: "AdminLTE",
        adminU: data,
        records: records,
      });
    });
  });
};

//add_new user
module.exports.addUser = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/adminsignIn");
  }
  const queryFindU = "SELECT * FROM `admin` WHERE `id` = ?";
  const queryF = mysql.format(queryFindU, [req.cookies.user_id]);
  db.query(queryF, function (err, data) {
    return res.render("add_user", {
      title: "Add New User",
      adminU: data,
    });
  });
};

//User List
module.exports.userList = function (req, res) {
  if (!req.cookies.user_id) {
    return res.redirect("/adminsignIn");
  }
  const queryFindU = "SELECT * FROM `admin` WHERE `id` = ?";
  const queryF = mysql.format(queryFindU, [req.cookies.user_id]);
  db.query(queryF, function (err, val) {
    const queryFindUser = "SELECT * FROM `users` ORDER BY `id` DESC";
    const userFormate = mysql.format(queryFindUser);
    db.query(userFormate, function (err, data) {
      const string = JSON.stringify(data);
      const records = JSON.parse(string);
      console.log("users", records);
      if (err) throw err;
      return res.render("users", {
        title: "User List",
        records: records,
        adminU: val,
      });
    });
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
module.exports.createAdmin = function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const terms = req.body.terms;

  const findQuery = "SELECT `email` FROM `admin` WHERE `email` = ?";
  const queryFormate = mysql.format(findQuery, [email]);
  db.query(queryFormate, function (err, data) {
    if (data.length === 0) {
      //check password
      if (password != confirm_password) {
        console.log("Password is not matched with confirmed_password");
        return res.redirect("back");
      }
      //Create new admin
      const queryInsert =
        "INSERT INTO `admin` (`name`, `email`, `password`, `terms`) VALUES (?, ?, ?, ?)";
      const queryFormat = mysql.format(queryInsert, [
        name,
        email,
        password,
        terms,
      ]);
      db.query(queryFormat, function (err) {
        if (err) {
          console.log("Error to create a new admin");
          return;
        }
        console.log("New Admin account is created");
        return res.redirect("/adminsignIn");
      });
    } else {
      console.log("Email alread exist", data);
      return res.redirect("back");
    }
  });
};

//Create a Admin session
module.exports.createAdminSession = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const queryFind =
    "SELECT * FROM `admin` WHERE (`email` = ? AND `password` = ?)";
  const queryFormate = mysql.format(queryFind, [email, password]);
  db.query(queryFormate, function (error, data) {
    if (error) throw error;
    if (data) {
      const string = JSON.stringify(data);
      const records = JSON.parse(string);
      records.forEach((element) => {
        id = element.id;
        //handle session cookie
        res.cookie("user_id", id);
      });
      return res.redirect("/");
    }
  });
};

//destroy session
module.exports.destroy = function (req, res) {
  res.clearCookie("user_id");
  return res.redirect("/adminsignIn");
};
