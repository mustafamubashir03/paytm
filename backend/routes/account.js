const express = require("express");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");
const { UserAccount } = require("../db");
const { transferSchema } = require("../zod.validation");
const router3 = express.Router();

router3.get("/balance", authMiddleware, async (req, res) => {
  const id = req.userId;
  const accountFound = await UserAccount.findOne({ referenceId: id });
  if (!accountFound) {
    return res.status(503).json({ message: "You haven't signed up" });
  }
  res.json({ balance: accountFound.balance });
});

router3.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  const { success } =  transferSchema.safeParse(req.body);
  if (!success) {
    await session.abortTransaction();
    res.status(400).json({ message: "Invalid inputs provided" });
  }
  const { to, amount } = req.body;
  const id = req.userId;
  const accountFound = await UserAccount.findOne({ referenceId: id }).session(
    session
  );
  const userBalance = accountFound.balance;
  if (userBalance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }
  const recieverFound = await UserAccount.findOne({ referenceId: to }).session(
    session
  );
  if (!recieverFound) {
    await session.abortTransaction();
    return res.status(403).json({ message: "Reciever not found" });
  }
  await UserAccount.updateOne(
    { referenceId: id },
    { $inc: { balance: -amount } }
  ).session(session);
  await UserAccount.updateOne(
    { referenceId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();
  res.json({ message: "Transfer successful" });
});
module.exports = { router3 };
