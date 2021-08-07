const express = require("express");
const router = express.Router();

//routing home
router.use("/", require("./home"));
//routing users
router.use("/", require("./users"));

module.exports = router;
