const express = require("express");
const router = express.Router();

//routing home
router.use("/", require("./home"));

module.exports = router;
