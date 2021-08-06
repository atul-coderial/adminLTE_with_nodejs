//Rendring home ejs
module.exports.home = function (req, res) {
  return res.render("home", {
    title: "AdminLTE",
  });
};

//add_new user
module.exports.addUser = function (req, res) {
  return res.render("add_user", {
    title: "Add New User",
  });
};

//User List
module.exports.userList = function (req, res) {
  return res.render("users", {
    title: "User List",
  });
};

//Admin Register
module.exports.adminReg = function (req, res) {
  return res.render("admin_signUp", {
    title: "Admin | Registration",
  });
};

//Admin SignIn
module.exports.adminSign = function (req, res) {
  return res.render("admin_signIn", {
    title: "Admin | SignIn",
  });
};
