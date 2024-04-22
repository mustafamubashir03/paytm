const { authMiddleware } = require("../middleware.js");
const { JWT_SECRET } = require("../config.js");
const express = require("express");
const router2 = express.Router();
const { User } = require("../db.js");
const { userSchema } = require("../zod.validation");
const { userUpdateSchema } = require("../zod.validation.js");
const jwt = require("jsonwebtoken");
router2.post("/signup", async (req, res) => {
  const userInfo = req.body;
  const { success } = userSchema.safeParse(userInfo);
  if (!success) {
    return res.status(500).json({ message: "Couldn't authenticate..." });
  } else {
    const newUser = await User.create(userInfo).catch((err) =>
      res
        .status(403)
        .json({ message: "Username or Password already taken", err })
    );
    const token = await jwt.sign({ userId: newUser._id }, JWT_SECRET);
    res.json({ msg: `user has been created`, token });
  }
});

router2.post("/signin", async (req, res) => {
  const userInfoSigned = req.body;
  const { success } = userSchema.safeParse(userInfoSigned);
  if (!success) {
    return res.status(500).json({ message: "Couldn't authenticate..." });
  }
  const userFound = await User.findOne({ username: userInfoSigned.username });
  if (!userFound) {
    return res.status(500).json({ message: "User not found" });
  }
  const token = await jwt.sign({ userId: userFound._id }, JWT_SECRET);
  res.json({ msg: "Successfully authenticated", token: token });
});
router2.put("/", authMiddleware, async (req, res) => {
  const userBody = req.body;
  const id = req.userId;
  console.log(id);
  userUpdateSchema.safeParse(userBody);
  if (userBody.password) {
    await User.findByIdAndUpdate({ id }, { password: userBody.password });
  }
  if (userBody.firstName) {
    await User.findByIdAndUpdate({ id }, { firstName: userBody.firstName });
  }
  if (userBody.lastName) {
    await User.findByIdAndUpdate({ id }, { lastName: userBody.lastName });
  }

  res.json({ message: "Updated successfully" });
});

module.exports = { router2 };
