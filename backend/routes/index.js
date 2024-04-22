const express = require("express");
const { router2 } = require("./user.js");
const route1 = express.Router();


route1.use("/user", router2);

module.exports = route1;
