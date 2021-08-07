const express = require("express");
const router = express.Router();

//user controller routing
const userController = require("../controllers/users");

router.post("/createUser", userController.createUser);
router.get("/edit/:id", userController.edit);
router.post("/updateUser", userController.update);
router.get("/delete/:id", userController.delete);
module.exports = router;
