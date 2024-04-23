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
  const id = req.userId;
  console.log(id);
  const userBody = req.body;
  const { success } = userUpdateSchema.safeParse(userBody);
  if (!success) {
    return res.status(403).json({ message: "Invalid input" });
  }
  const foundDoc = await User.findById(id);
  if (!foundDoc) {
    res.status(403).json({ message: "User not found" });
  }
  if (userBody.firstName) {
    foundDoc.firstName = userBody.firstName;
  }
  if (userBody.lastName) {
    foundDoc.lastName = userBody.lastName;
  }
  if (userBody.password) {
    foundDoc.password = userBody.password;
  }
  foundDoc.save();


  res.json({ message: "Updated successfully" });
});


router2.get("/bulk",async(req,res)=>{
  const filter = req.query.filter || "";
  const regex = new RegExp (filter,"i");
  const query = {$or:[{firstName:{$regex: regex}},{lastName:{$regex: regex}}]};
  const usersFound = await User.find(query);
  res.json({user: usersFound.map(user =>({username:user.username, firstName:user.firstName, lastName:user.lastName}))});
})




module.exports = { router2 };
