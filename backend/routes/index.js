const express = require("express");
const { router2 } = require("./user.js");
const {router3} = require("./account.js");
const route1 = express.Router();


route1.use("/user", router2);
route1.use("/account",router3);

module.exports = route1;
