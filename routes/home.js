const express = require("express");
const router = express.Router();

//routing home controller
const homeController = require("../controllers/home");

router.get("/", homeController.home);
router.get("/add_user", homeController.addUser);
router.get("/userList", homeController.userList);
router.get("/admin", homeController.adminReg);
router.get("/adminsignIn", homeController.adminSign);
router.post("/adminSignUp", homeController.createAdmin);
module.exports = router;
